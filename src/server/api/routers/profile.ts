/* eslint-disable @typescript-eslint/no-unsafe-call */
import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { filterUserForClient } from "~/server/utils/filterUserForClient";

export const profileRouter = createTRPCRouter({
  getUserByUsernanme: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ input: { username } }) => {
      const [user] = await clerkClient.users.getUserList({
        username: [username],
      });

      if (!user) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "User not found",
        });
      }

      return filterUserForClient(user);
    }),
});
