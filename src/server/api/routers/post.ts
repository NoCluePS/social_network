/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { filterUserForClient } from "~/server/utils/filterUserForClient";

const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "1 m"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});

export const postRouter = createTRPCRouter({
  create: privateProcedure
    .input(
      z.object({
        content: z.string().emoji("Only emojis are allowed").min(1).max(280),
      }),
    )
    .mutation(async ({ ctx, input: { content } }) => {
      const { success } = await rateLimit.limit(ctx.currentUser);
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

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
      orderBy: { createdAt: "desc" },
    });

    const users = await clerkClient.users.getUserList({
      userId: posts.map((post) => post.author),
      limit: 100,
    });

    return posts.map(({ author, ...post }) => ({
      ...post,
      ...filterUserForClient(users.find((user) => user.id === author)!),
    }));
  }),
});
