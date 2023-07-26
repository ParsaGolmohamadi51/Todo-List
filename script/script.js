// get user info
let objectInfo = [];

let body = document.getElementById("body");
let main = document.getElementById("main");

// get Date
let today = new Date();
let year = today.getFullYear();
let month = (today.getMonth() + 1).toString().padStart(2, "0");
let day = today.getDate().toString().padStart(2, "0");
let formattedDate = `${year}-${month}-${day}`;
document.getElementById("date").value = formattedDate;

// get Time
let now = new Date();
let hours = now.getHours().toString().padStart(2, "0");
let minutes = now.getMinutes().toString().padStart(2, "0");
let formattedTime = `${hours}:${minutes}`;
document.getElementById("time").value = formattedTime;

// get Value Input and add to page
let buttonAdd = document.getElementById("button-add");
let clearAllEditInfo = document.getElementById("clear-all-edit-info");
let sectionNote = document.getElementById("section-note");

clearAllEditInfo.addEventListener("click", funcClearAllEditInfo);

function funcClearAllEditInfo() {
  while (sectionNote.firstChild) {
    sectionNote.removeChild(sectionNote.firstChild);
  }
}

buttonAdd.addEventListener("click", funcButtonAdd);

let counter = 0;

function funcButtonAdd() {
  let text = document.getElementById("text").value;
  let date = document.getElementById("date").value;
  let time = document.getElementById("time").value;
  let textarea = document.getElementById("textarea").value;

  if (text === "") {
    alert("هیچ فعالیتی را یادداشت نکردید!");
  } else if (text.length > 0) {
    let noteObject = {
      text: text,
      date: date,
      time: time,
      textarea: textarea,
      id: counter++,
    };
    objectInfo.push(noteObject);

    let note = document.createElement("div");
    note.setAttribute("class", "note");

    let asideLeft = document.createElement("div");
    asideLeft.setAttribute("class", "aside-left");

    let edit = document.createElement("div");
    edit.setAttribute("class", "option_edit");
    asideLeft.appendChild(edit);

    let del = document.createElement("div");
    del.setAttribute("class", "option_del");
    asideLeft.appendChild(del);

    let asideRight = document.createElement("div");

    let elemText = document.createElement("div");
    elemText.setAttribute("class", "elem");
    elemText.innerHTML = text;
    asideRight.appendChild(elemText);

    let elemDate = document.createElement("div");
    elemDate.setAttribute("class", "elem");
    elemDate.innerHTML = date;
    asideRight.appendChild(elemDate);

    let elemTime = document.createElement("div");
    elemTime.setAttribute("class", "elem");
    elemTime.innerHTML = time;
    asideRight.appendChild(elemTime);
    asideRight.setAttribute("class", "aside-right");
    note.appendChild(asideLeft);
    note.appendChild(asideRight);

    sectionNote.appendChild(note);

    document.getElementById("text").value = "";
    document.getElementById("date").value = formattedDate;
    document.getElementById("time").value = formattedTime;
    document.getElementById("textarea").value = "";
    console.log(objectInfo);
    // Delete and Edit
    del.addEventListener("click", funcDel);

    function funcDel() {
      note.remove();
      let index = objectInfo.indexOf(noteObject);
      if (index !== -1) {
        objectInfo.splice(index, 1);
      }
    }

    edit.addEventListener("click", funcEdit);

    function funcEdit() {
      let editInfo = document.createElement("div");
      editInfo.setAttribute("class", "edit_info");
      body.style.cssText =
        "display: flex; align-items: center; justify-content: center;";
      main.style.cssText = "opacity: 0.2; box-shadow: 2 2 2 2 color;";

      let updateText = document.createElement("input");
      updateText.type = "text";
      updateText.value = text;
      updateText.classList.add("update_info_text");
      editInfo.appendChild(updateText);

      let updateDate = document.createElement("input");
      updateDate.type = "date";
      updateDate.value = date;
      updateDate.classList.add("update_info_date");
      editInfo.appendChild(updateDate);

      let updateTime = document.createElement("input");
      updateTime.type = "time";
      updateTime.value = time;
      updateTime.classList.add("update_info_time");
      editInfo.appendChild(updateTime);

      let updateDescription = document.createElement("textarea");
      updateDescription.value = textarea;
      updateDescription.classList.add("update_info_textarea");
      editInfo.appendChild(updateDescription);

      let submit = document.createElement("button");
      submit.classList.add("button_submit");
      submit.innerHTML = "تایید";
      editInfo.appendChild(submit);

      body.appendChild(editInfo);

      submit.addEventListener("click", funcSubmit);

      function funcSubmit() {
        editInfo.style.cssText = "display: none;";
        main.style.cssText = "display: flex;";
        elemText.innerHTML = updateText.value;
        noteObject.text = updateText.value;
        elemDate.innerHTML = updateDate.value;
        noteObject.date = updateDate.value;
        elemTime.innerHTML = updateTime.value;
        noteObject.time = updateTime.value;
        noteObject.textarea = updateDescription.value;
      }
    }
  }
}
