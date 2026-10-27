import { getCollection, type CollectionEntry } from "astro:content";

export async function getNotes(): Promise<CollectionEntry<"notes">[]> {
  const notes = await getCollection("notes");
  return notes.sort((left, right) => {
    const byDate = right.data.publishedAt.localeCompare(left.data.publishedAt);
    if (byDate !== 0) return byDate;
    return left.data.title.localeCompare(right.data.title);
  });
}

export async function getProjects(): Promise<CollectionEntry<"projects">[]> {
  const projects = await getCollection("projects");
  return projects.sort((left, right) => left.data.order - right.data.order);
}
