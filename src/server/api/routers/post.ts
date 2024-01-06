import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ content: z.string(), author: z.string() }))
    .mutation(async ({ ctx, input: { content, author } }) => {
      return ctx.db.post.create({
        data: {
          content,
          author,
        },
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),

  getALl: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findMany();
  }),
});
