import type{ Note } from "../model/Note";

export const notes: Note[] = [];

export const addNote = (title: string, content: string) => {
  const note: Note = {
    id: Date.now(),
    title,
    content,
    timestamp: new Date().toLocaleString(),
  };
  notes.push(note);
};

export const getNoteById = (id: number) => {
  return notes.find(n => n.id === id);
};
