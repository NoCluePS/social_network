import { clerkClient } from "@clerk/nextjs";
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

  getALl: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.post.findMany({
      take: 100,
    });

    const users = await clerkClient.users.getUserList({
      userId: posts.map((post) => post.author as string),
      limit: 100,
    });

    return posts.map(({ author, ...post }) => ({
      ...post,
      pfp:
        users.find((user) => user.id === author)!.imageUrl ??
        "https://cdn.vectorstock.com/i/preview-1x/86/82/profile-picture-with-a-crown-placeholder-vector-38978682.webp",
      username: users.find((user) => user.id === author)!.username ?? "Unknown",
    }));
  }),
});
