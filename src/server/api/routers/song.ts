import { Prisma } from "generated/prisma";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const songRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const songs = await ctx.db.song.findMany({
      select: { id: true, title: true, artist: true, imageBytes: true, imageMimeType: true },
      orderBy: [{ createdAt: "asc" }, { title: "asc" }], // TODO: order by 2 things
    });

    return songs.map((song) => {
      const base64 = song.imageBytes && Buffer.from(song.imageBytes).toString("base64");
      const image = base64 && song.imageMimeType ? { base64, mimeType: song.imageMimeType } : null;
      return {
        id: song.id,
        title: song.title,
        artist: song.artist,
        image,
      };
    });
  }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        artist: z.string().min(1),
        image: z.object({ mimeType: z.string(), base64: z.string() }).nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const imageBytes = input.image && Buffer.from(input.image.base64, "base64");

      try {
        const { id } = await ctx.db.song.create({
          data: {
            title: input.title,
            artist: input.artist,
            imageBytes,
            imageMimeType: input.image?.mimeType,
          },
        });
        return id;
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
          throw new Error("Cannot create song. Song with the same title and artist already exists");
        } else {
          throw new Error("Unkown error occured when saving song to DB");
        }
      }
    }),

  // deletes the image if image is null, otherwise updates the image
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
        await ctx.db.song.update({
          where: { id: input.id },
          data: {
            imageBytes,
            imageMimeType: input.image?.mimeType,
          },
        });
      } catch (e) {
        throw new Error("Unkown error occured when updating song to DB");
      }
    }),
});
