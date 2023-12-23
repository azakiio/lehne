// 1. Import utilities from `astro:content`
import { defineCollection, z } from "astro:content";

// 2. Define a `type` and `schema` for each collection
const people = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      position: z.string(),
      image: image(),
      sortOrder: z.number(),
    }),
});

const projects = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      images: z.array(image()).optional(),
    }),
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  people,
  projects,
};
