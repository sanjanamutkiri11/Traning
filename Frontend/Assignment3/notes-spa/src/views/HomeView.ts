import { NoteList } from "../components/NoteList";

export const HomeView = () => {
  const div = document.createElement("div");
  div.className = "home-view";

  const header = document.createElement("div");
  header.innerHTML = `
    <h1>My Notes</h1>
    <button id="create-btn">Create Note</button>
  `;

  header.querySelector("#create-btn")!.addEventListener("click", () => {
    history.pushState({}, "", "/create");
    window.dispatchEvent(new Event("route"));
  });

  div.appendChild(header);
  div.appendChild(NoteList());

  return div;
};
