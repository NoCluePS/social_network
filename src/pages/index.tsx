import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";

export default function Home() {
  const user = useUser();
  const { data } = api.post.getALl.useQuery();

  console.log(data);

  return (
    <div>
      <div>{!user.isSignedIn ? <SignInButton /> : <SignOutButton />}</div>
      <div>{data?.map((post) => <div key={post.id}>{post.content}</div>)}</div>
    </div>
  );
}
