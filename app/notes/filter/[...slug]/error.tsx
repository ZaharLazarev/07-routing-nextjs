"use client";

interface ErrorSlugProps {
  error: Error;
}
export default function ErrorSlug({ error }: ErrorSlugProps) {
  return <p>Could not fetch the filter of notes. {error.message}</p>;
}
