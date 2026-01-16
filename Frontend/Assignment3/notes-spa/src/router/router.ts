import { HomeView } from "../views/HomeView";
import { CreateView } from "../views/CreateView";
import { notes } from "../store/store";
import type{ Note } from "../model/Note";

export const router = () => {
  const app = document.getElementById("app")!;
  app.innerHTML = ""; // Clear previous content

  const path = location.pathname;

  if (path === "/") {
    app.appendChild(HomeView());
  } else if (path === "/create") {
    app.appendChild(CreateView());
  } else if (path.startsWith("/note/")) {
    const id = Number(path.split("/")[2]);
    const note: Note | undefined = notes.find(n => n.id === id);
    if (note) {
      const div = document.createElement("div");
      div.innerHTML = `
        <h2>${note.title}</h2>
        <p>${note.content}</p>
        <small>${note.timestamp}</small>
        <br/>
        <button id="back">Back</button>
      `;
      div.querySelector("#back")!.addEventListener("click", () => {
        history.pushState({}, "", "/");
        router();
      });
      app.appendChild(div);
    } else {
      app.innerHTML = "<p>Note not found</p>";
    }
  } else {
    app.innerHTML = "<p>Page not found</p>";
  }
};

window.addEventListener("popstate", router);
window.addEventListener("route", router);
