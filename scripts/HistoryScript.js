const historyNodes = document.querySelector(".history__nodes");

const trashCanIcon = document.querySelector("svg");
function addNewNoteWithResult(result, expression) {
  const note_block = document.createElement("div");
  note_block.className = "history_note";

  const new_note = `
        <input aria-invalid="false" autocomplete="off" class="Textinput-Control" placeholder='заметка' value>

        <p>${expression} = ${result}</p>
    `;

  note_block.innerHTML = new_note;

  historyNodes.append(note_block);
}

trashCanIcon.addEventListener("click", () => {
  historyNodes.innerHTML = "";
});

export { addNewNoteWithResult };
