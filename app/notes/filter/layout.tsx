import React from "react";
import css from "./LayoutNotes.module.css";

interface FilterLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}
export default function FilterLayout({ children, sidebar }: FilterLayoutProps) {
  return (
    <div className={css.container}>
      <div className={css.sidebar}>{sidebar}</div>
      <div className={css.notesWrapper}>{children}</div>
    </div>
  );
}
