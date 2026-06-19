import { z } from "zod";

import { Prisma, ProductType } from "generated/prisma";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const productRouter = createTRPCRouter({
  /** Returns all current products in the database */
  getAll: publicProcedure.query(async ({ ctx }) => {
    const products = await ctx.db.product.findMany({
      select: {
        id: true,
        title: true,
        artist: true,
        productType: true,
        imageBytes: true,
        imageMimeType: true,
      },
      orderBy: [{ createdAt: "asc" }, { title: "asc" }],
    });

    return products.map((product, i) => {
      const base64 = product.imageBytes && Buffer.from(product.imageBytes).toString("base64");
      const image =
        base64 && product.imageMimeType ? { base64, mimeType: product.imageMimeType } : null;
      return {
        id: product.id,
        title: product.title,
        artist: product.artist,
        productType: product.productType,
        image,
        defaultOrder: i, // used to sort the products in the order they were created
      };
    });
  }),
  /** Creates a new product. Returns both the new id and the defaultOrder (which is the current number of products in the database, used for sorting by creation order)
   *  Throws if a product with the same title and artist already exists!
   */
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        artist: z.string().min(1),
        productType: z.nativeEnum(ProductType),
        image: z.object({ mimeType: z.string(), base64: z.string() }).nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const imageBytes = input.image && Buffer.from(input.image.base64, "base64");

      try {
        const { id } = await ctx.db.product.create({
          data: {
            title: input.title,
            artist: input.artist,
            productType: input.productType,
            imageBytes,
            imageMimeType: input.image?.mimeType,
          },
        });

        const productCount = await ctx.db.product.count(); // used for defaultOrder sorting

        return { id, defaultOrder: productCount };
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
          throw new Error(
            "Cannot create product. Product with the same title and artist already exists",
          );
        } else {
          throw new Error("Unknown error occurred when saving product to DB");
        }
      }
    }),

  /** Deletes the image if image is null, otherwise updates the image */
  updateImage: publicProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        image: z.object({ mimeType: z.string(), base64: z.string() }).nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const imageBytes = input.image && Buffer.from(input.image.base64, "base64");

      try {
        await ctx.db.product.update({
          where: { id: input.id },
          data: {
            imageBytes,
            imageMimeType: input.image?.mimeType,
          },
        });
      } catch {
        throw new Error("Unknown error occurred when updating product in DB");
      }
    }),
  /** Deletes a product by its ID */
  deleteRow: publicProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.product.delete({
          where: { id: input.id },
        });
      } catch {
        throw new Error("Unknown error occurred when deleting product from DB");
      }
    }),
});
