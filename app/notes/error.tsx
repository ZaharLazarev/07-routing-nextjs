"use client";

interface ErrorHandlerProps {
  error: Error;
}
export default function ErrorHandler({ error }: ErrorHandlerProps) {
  return <p>Could not fetch the list of notes. {error.message}</p>;
}
