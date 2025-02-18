import { redirect } from "next/navigation";

interface CatchAllPageProps {
  params?: { slug: string[] };
}

export default async function CatchAllPage({ params }: CatchAllPageProps) {
  // Define valid routes (optional, for example purposes)
  const validPaths = ["about", "contact", "home"];

  if (!!params) {
    const { slug } = await params;

    if (!validPaths.includes(slug.join("/"))) {
      // Redirect to not-found page
      redirect("/not-found");
    }
  }
}
