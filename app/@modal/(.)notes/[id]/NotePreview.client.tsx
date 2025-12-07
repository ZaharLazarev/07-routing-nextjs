"use client";
import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";
import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
// import { useEffect } from "react";

export default function NotePreviewClient() {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });
  const router = useRouter();
  const onClose = () => {
    router.back();
  };
  // const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
  //   if (e.target === e.currentTarget) {
  //     onClose();
  //   }
  // };

  // useEffect(() => {
  //   const handleKeyDown = (e: KeyboardEvent) => {
  //     if (e.key === "Escape") {
  //       onClose();
  //     }
  //   };
  //   document.addEventListener("keydown", handleKeyDown);
  //   document.body.style.overflow = "hidden";
  //   return () => {
  //     document.removeEventListener("keydown", handleKeyDown);
  //     document.body.style.overflow = "";
  //   };
  // });
  return (
    <Modal onClose={onClose}>
      {data && !isLoading && (
        <div className={css.container}>
          <button onClick={onClose} className={css.backBtn}>
            Close
          </button>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{data.title}</h2>
            </div>
            <p className={css.content}>{data.content}</p>
            <p className={css.date}>{data.createdAt}</p>
            <p className={css.tag}>{data.tag}</p>
          </div>
        </div>
      )}
      {isLoading && <p>Loading, please wait...</p>}
      {error && !data && <p>Something went wrong.</p>}
    </Modal>
  );
}
