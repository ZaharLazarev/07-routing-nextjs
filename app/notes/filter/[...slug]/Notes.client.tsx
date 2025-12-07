"use client";

import css from "./page.module.css";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import { TailSpin } from "react-loader-spinner";
import { useState } from "react";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import { useDebouncedCallback } from "use-debounce";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

interface NotesClientProps {
  paramTag?: string;
}

export default function NotesClient({ paramTag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [query, setNewQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ["notes", page, query, paramTag],
    queryFn: () =>
      paramTag && paramTag !== "all"
        ? fetchNotes(page, query, paramTag)
        : fetchNotes(page, query),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const totalPages = data?.totalPages ?? 0;

  const updateQuery = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewQuery(e.target.value);
      setPage(1);
    },
    600
  );

  const onClose = () => {
    setIsModalOpen(false);
  };
  const onSuccess = () => {
    setIsModalOpen(false);
  };
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox updateQuery={updateQuery} />
        {totalPages > 1 && (
          <Pagination setPage={setPage} page={page} totalPages={totalPages} />
        )}
        <button
          onClick={() => {
            setIsModalOpen(true);
          }}
          className={css.button}
        >
          Create note +
        </button>
      </header>
      {data && !isLoading && <NoteList notes={data.notes} />}
      {isLoading && <TailSpin />}
      {isModalOpen && (
        <Modal onClose={onClose}>
          <NoteForm onClose={onClose} onSuccess={onSuccess} />
        </Modal>
      )}
    </div>
  );
}
