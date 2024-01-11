/* eslint-disable @typescript-eslint/no-unsafe-return */
import { clerkClient } from "@clerk/nextjs";
import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  create: privateProcedure
    .input(z.object({ content: z.string().emoji().min(1).max(280) }))
    .mutation(async ({ ctx, input: { content } }) => {
      return ctx.db.post.create({
        data: {
          content,
          author: ctx.currentUser,
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
      userId: posts.map((post) => post.author),
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
