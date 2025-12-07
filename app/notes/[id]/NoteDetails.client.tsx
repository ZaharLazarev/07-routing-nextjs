"use client";

import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import css from "./page.module.css";

export default function NoteDetails() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    <div>
      {data && !isLoading && (
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{data.title}</h2>
            </div>
            <p className={css.content}>{data.content}</p>
            <p className={css.date}>{data.createdAt}</p>
          </div>
        </div>
      )}
      {isLoading && <p>Loading, please wait...</p>}
      {error && !data && <p>Something went wrong.</p>}
    </div>
  );
}
