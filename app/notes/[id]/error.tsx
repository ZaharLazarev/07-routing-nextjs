"use client";

interface ErrorIdProps {
  error: Error;
}
export default function ErrorId({ error }: ErrorIdProps) {
  return <p>Could not fetch note details. {error.message}</p>;
}
