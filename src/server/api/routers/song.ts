import { Prisma } from "generated/prisma";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const songRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.song.findMany({
      select: { title: true, artist: true },
      orderBy: { createdAt: "asc" },
    });
  }),

  create: publicProcedure
    .input(z.object({ title: z.string().min(1), artist: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.song.create({
          data: input,
        });
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
          throw new Error("Cannot create song. Song with the same title and artist already exists");
        } else {
          throw new Error("Unkown error occured when saving song to DB");
        }
      }
    }),
});
