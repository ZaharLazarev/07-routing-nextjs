import css from "./SearchBox.module.css";

interface SearchBoxProps {
  updateQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function SearchBox({ updateQuery }: SearchBoxProps) {
  return (
    <input
      onChange={updateQuery}
      className={css.input}
      name="text"
      type="text"
      placeholder="Search notes"
    />
  );
}
