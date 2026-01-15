import { addNote } from "../store/store";

export const CreateNote = () => {
  const form = document.createElement("form");
  form.className = "create-note";

  form.innerHTML = `
    <h2>Create Note</h2>
    <input type="text" placeholder="Title" name="title" required />
    <textarea placeholder="Content" name="content" required></textarea>
    <button type="submit">Add Note</button>
  `;

  form.addEventListener("submit", e => {
    e.preventDefault();
    const title = (form.elements.namedItem("title") as HTMLInputElement).value;
    const content = (form.elements.namedItem("content") as HTMLTextAreaElement).value;
    addNote(title, content);
    history.pushState({}, "", "/");
    window.dispatchEvent(new Event("route"));
  });

  return form;
};
