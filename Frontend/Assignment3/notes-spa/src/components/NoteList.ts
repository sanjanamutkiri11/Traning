import { notes } from "../store/store";
import { NoteItem } from "./NoteItem";

export const NoteList = () => {
  const container = document.createElement("div");
  container.className = "note-list";

  if (notes.length === 0) {
    container.innerHTML = `<p>No notes yet.</p>`;
    return container;
  }

  notes.forEach(note => {
    container.appendChild(NoteItem(note));
  });

  return container;
};
