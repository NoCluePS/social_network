import Link from "next/link";
import { useRouter } from "next/router";
import LoadingSpinner from "~/components/LoadingSpinner";
import { api } from "~/utils/api";

const ProfilePage = () => {
  const { query } = useRouter();
  const { data, isLoading } = api.user.getUserByUsernanme.useQuery({
    username:
      query.slug && typeof query.slug === "string"
        ? query.slug.split("@").join("")
        : "noclueps",
  });

  if (!data && !isLoading) return <div>404</div>;

  return (
    <main>
      <div className="flex h-full justify-center">
        <div className="min-h-screen w-full max-w-2xl border-x border-slate-400 p-4">
          <Link href="/" className="cursor-pointer hover:underline">
            {"< GoBack"}
          </Link>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="mt-4">Profile view ({data.username})</div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
