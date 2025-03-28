// src/lib/sanity.ts
import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "7s9faau2",
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-03-27",
});

export async function getAllBlogs() {
  return client.fetch(`*[_type == "post"]{ title, description, slug }`);
}

export async function getBlogBySlug(slug: string) {
  const result = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]`,
    { slug }
  );
  return result;
}

export async function getAllBlogSlugs() {
  const result = await client.fetch(
    `*[_type == "post" && defined(slug.current)]{
      "slug": slug.current,
      }`
  );

  return result;
}
