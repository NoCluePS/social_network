import { type User } from "@clerk/nextjs/server";

export const filterUserForClient = (user: User) => ({
  id: user.id,
  username: user.username ?? "Unknown",
  pfp:
    user.imageUrl ??
    "https://cdn.vectorstock.com/i/preview-1x/86/82/profile-picture-with-a-crown-placeholder-vector-38978682.webp",
});
