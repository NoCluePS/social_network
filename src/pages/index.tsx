import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

export default function Home() {
  const user = useUser();

  return <>{!user.isSignedIn ? <SignInButton /> : <SignOutButton />}</>;
}
