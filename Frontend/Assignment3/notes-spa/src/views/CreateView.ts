import { CreateNote } from "../components/CreateNote";

export const CreateView = () => {
  const div = document.createElement("div");
  div.className = "create-view";

  div.appendChild(CreateNote());
  return div;
};
