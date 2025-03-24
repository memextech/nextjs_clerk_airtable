import { auth } from "@clerk/nextjs";
import { Hero } from "@/components/ui/hero";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = auth();

  if (!userId) {
    return <Hero />;
  }

  // If user is authenticated, redirect to the wishlist page
  redirect("/wishlist");
}