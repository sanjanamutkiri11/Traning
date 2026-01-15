import type{ Note } from "../model/Note";

export const NoteItem = (note: Note) => {
  const div = document.createElement("div");
  div.className = "note-item";
  div.innerHTML = `
    <h3>${note.title}</h3>
    <small>${note.timestamp}</small>
  `;
  div.addEventListener("click", () => {
    history.pushState({ id: note.id }, "", `/note/${note.id}`);
    window.dispatchEvent(new Event("route"));
  });
  return div;
};
