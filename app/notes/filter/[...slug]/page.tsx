import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";

interface NotesProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export default async function NotesByTag({ params }: NotesProps) {
  const tag = (await params).slug?.[0];
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", tag],
    queryFn: () =>
      tag && tag !== "all" ? fetchNotes(1, "", tag) : fetchNotes(1, ""),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient paramTag={tag} />
    </HydrationBoundary>
  );
}
