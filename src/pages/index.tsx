import { SignInButton, useUser } from "@clerk/nextjs";
import Profile from "~/components/Profile";
import Image from "next/image";
import { api } from "~/utils/api";

export default function Home() {
  const { isSignedIn } = useUser();
  const { data, isLoading } = api.post.getALl.useQuery();

  return (
    <main>
      <div className="flex h-full justify-center">
        <div className="h-full w-full max-w-2xl border-x border-slate-400">
          <div className="flex border-b border-slate-400 p-4">
            {!isSignedIn ? (
              <div>
                <SignInButton />
              </div>
            ) : (
              <Profile />
            )}
          </div>
          <div className="w-full border-b border-slate-400 p-5">
            <input
              type="text"
              placeholder="Type some emojis!"
              className="w-full rounded-xl p-3 outline-none"
            />
          </div>
          <div className="flex flex-col">
            {data && !isLoading ? (
              data.map(({ content, id, pfp, username }) => (
                <div className="border-b border-slate-400 p-8" key={id}>
                  <div className="mb-4 flex items-center gap-4">
                    <Image
                      width={40}
                      height={40}
                      src={pfp}
                      alt={`${username} Profile picture`}
                      className="rounded-xl"
                    />
                    <span>{username}</span>
                  </div>
                  {content}
                </div>
              ))
            ) : (
              <div className="h-[50px] w-[50px] animate-spin rounded-full border-4 border-blue-200 border-b-slate-400" />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
