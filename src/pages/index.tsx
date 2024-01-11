import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import LoadingSpinner from "~/components/LoadingSpinner";
import PostView from "~/components/PostView";
import Profile from "~/components/Profile";
import { api } from "~/utils/api";

export default function Home() {
  const { isSignedIn } = useUser();
  const { data, isLoading, refetch } = api.post.getALl.useQuery();
  const { mutate, isLoading: mutationLoading } = api.post.create.useMutation({
    onSuccess: () => refetch(),
  });
  const [emojis, setEmojis] = useState("");

  const submitEmojis = () => {
    mutate({ content: emojis });
    setEmojis("");
  };

  return (
    <main>
      <div className="flex h-full justify-center">
        <div className="min-h-screen w-full max-w-2xl border-x border-slate-400">
          <div className="flex border-b border-slate-400 p-4">
            <Profile />
          </div>
          {isSignedIn && (
            <div className="relative w-full border-b border-slate-400 p-5">
              <input
                type="text"
                placeholder="Type some emojis!"
                value={emojis}
                onChange={(e) => setEmojis(e.target.value)}
                disabled={mutationLoading}
                onKeyDown={(e) => {
                  if (e.key === "Enter") submitEmojis();
                }}
                className="w-full rounded-xl p-3 text-slate-500 outline-none"
              />
              {mutationLoading && (
                <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black opacity-50">
                  <LoadingSpinner />
                </div>
              )}
            </div>
          )}
          <div className="flex flex-col">
            {!isLoading ? (
              data && !!data.length ? (
                data
                  .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
                  .map((post) => <PostView key={post.id} {...post} />)
              ) : (
                <span className="p-3">No data found!</span>
              )
            ) : (
              <LoadingSpinner />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
