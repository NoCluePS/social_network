import React from "react";
import Image from "next/image";
import { type RouterOutputs } from "~/utils/api";
import { getRelativeTimeString } from "~/utils/dateString";

type PostWithUser = RouterOutputs["post"]["getALl"][number];
const PostView = ({ username, pfp, content, createdAt }: PostWithUser) => {
  const timeString = getRelativeTimeString(createdAt);

  return (
    <div className="flex items-center gap-4 border-b border-slate-400 p-8">
      <Image
        width={50}
        height={50}
        src={pfp}
        alt={`${username} Profile picture`}
        className="rounded-xl"
      />
      <div className="flex flex-col">
        <span className="mb-2">
          @{username}
          <span className="text-sm font-thin text-slate-400">
            {" "}
            · {timeString}
          </span>
        </span>
        <span>{content}</span>
      </div>
    </div>
  );
};
export default PostView;
