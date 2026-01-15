import { selectedNote, deleteNote } from "../store/store";

export const ViewNoteView = () => {
  const div = document.createElement("div");

  if (!selectedNote) {
    div.innerHTML = "<p>No note selected</p>";
    return div;
  }

  div.innerHTML = `
    <h2>${selectedNote.title}</h2>
    <p>${selectedNote.content}</p>
    <small>${selectedNote.timestamp}</small>

    <div class="actions">
      <button id="edit">Edit</button>
      <button id="delete">Delete</button>
    </div>
  `;

  div.querySelector("#edit")!.addEventListener("click", () => {
    history.pushState({}, "", "/edit");
    window.dispatchEvent(new Event("route"));
  });

  div.querySelector("#delete")!.addEventListener("click", () => {
    deleteNote(selectedNote.id);
    history.pushState({}, "", "/");
    window.dispatchEvent(new Event("route"));
  });

  return div;
};
