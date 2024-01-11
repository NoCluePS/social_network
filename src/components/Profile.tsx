import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import LoadingSpinner from "./LoadingSpinner";

const Profile = () => {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isSignedIn) return <SignInButton />;

  if (!isLoaded) return <LoadingSpinner />;

  if (!user) return null;

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-4">
        <Image
          src={
            user.imageUrl ??
            "https://cdn.vectorstock.com/i/preview-1x/86/82/profile-picture-with-a-crown-placeholder-vector-38978682.webp"
          }
          width={50}
          height={50}
          alt={`${user.firstName} profile picture`}
          className="rounded-xl"
        />
        <span>{user.username}</span>
      </div>
      <div>
        <SignOutButton />
      </div>
    </div>
  );
};

export default Profile;
