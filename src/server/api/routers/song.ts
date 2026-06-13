import { Prisma } from "generated/prisma";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const songRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const songs = await ctx.db.song.findMany({
      select: { title: true, artist: true, coverArt: true },
      orderBy: { createdAt: "asc" },
    });

    return songs.map((song) => {
      return { ...song, coverArt: song.coverArt?.toString() ?? null };
    });
  }),

  create: publicProcedure
    .input(z.object({ title: z.string().min(1), artist: z.string().min(1), coverArt: z.string().nullable() }))
    .mutation(async ({ ctx, input }) => {
      console.warn("🚀 coverArt string = ", input.coverArt);

      const base64 = input.coverArt?.replace(/^data:image\/[a-zA-Z+]+;base64,/, "") ?? null;

      const buffer = base64 && Buffer.from(base64, "base64");

      try {
        await ctx.db.song.create({
          data: {
            title: input.title,
            artist: input.artist,
            coverArt: buffer === "" ? null : buffer,
          },
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
