import { SignInButton, useUser } from "@clerk/nextjs";
import PostView from "~/components/PostView";
import Profile from "~/components/Profile";
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
          {isSignedIn && (
            <div className="w-full border-b border-slate-400 p-5">
              <input
                type="text"
                placeholder="Type some emojis!"
                className="w-full rounded-xl p-3 outline-none"
              />
            </div>
          )}
          <div className="flex flex-col">
            {!isLoading ? (
              data && !!data.length ? (
                data.map((post) => <PostView key={post.id} {...post} />)
              ) : (
                <span className="p-3">No data found!</span>
              )
            ) : (
              <div className="h-[50px] w-[50px] animate-spin rounded-full border-4 border-blue-200 border-b-slate-400 p-3" />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
