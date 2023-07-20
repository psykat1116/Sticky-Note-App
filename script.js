let addBox = document.getElementById("add-box");
let popupBox = document.getElementById("popup-box");
let placeNote = document.getElementById("box");
let popupHeading = document.querySelector("header p");
let rowTitle = document.querySelector("input");
let rowDetails = document.querySelector("textarea");
let addNote = document.querySelector("button");
let closePopupBox = document.querySelector("header i");
let editTime = document.querySelectorAll("#time");

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false,
  updateId;

// *------Opening and Closing function of The Popup Box--------

addBox.addEventListener("click", () => {
  rowTitle.focus();
  popupBox.classList.add("show");
});

closePopupBox.addEventListener("click", () => {
  rowDetails.value = "";
  rowTitle.value = "";
  addNote.innerText = "Add Note";
  popupHeading.innerText = "Add a New Note";
  popupBox.classList.remove("show");
});

// *-------Adding new note function------------

addNote.addEventListener("click", (e) => {
  e.preventDefault();
  let title = rowTitle.value;
  let description = rowDetails.value;
  if (!title && !description) {
    window.alert("Title and Description Both Cannot Be Empty");
    return;
  } else {
    let dateObj = new Date();
    let month = months[dateObj.getMonth()],
      day = dateObj.getDate(),
      year = dateObj.getFullYear(),
      hour = dateObj.getHours(),
      min = dateObj.getMinutes(),
      sec = dateObj.getSeconds();

    let noteInfo = {
      title: title,
      description: description,
      date: `${month} ${day} ${year}, ${hour}:${min}:${sec}`,
    };

    if (!isUpdate) {
      notes.push(noteInfo);
    } else {
      isUpdate = false;
      notes[updateId] = noteInfo;
    }
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
    closePopupBox.click();
  }
});

// *--------Showing the current notes------------

function showNotes() {
  let allNotes = document.querySelectorAll(".note");
  allNotes.forEach((note) => {
    note.remove();
  });
  notes.forEach((note, index) => {
    let liTag = `<li class="note">
        <div class="detail">
          <p id="title">${note.title}</p>
          <div id="content"
            >${note.description}</div
          >
        </div>
        <div class="bottom-content">
          <span id="time">${note.date}</span>
          <div id="setting">
            <i onclick="showMenu(this)" class="fa-solid fa-ellipsis"></i>
            <ul id="menu">
                <li onclick="updateNote(${index},'${note.title}','${note.description}')"><i class="fa-regular fa-pen-to-square"></i>Edit</li>
                <li onclick="deleteNote(${index})"><i class="fa-solid fa-trash-can"></i>Delete</li>
            </ul>
          </div>
        </div>
      </li>`;
    addBox.insertAdjacentHTML("afterend", liTag);
  });
}

showNotes();

// *-----------Showing the setting options for each notes--------------

function showMenu(elem) {
  elem.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != elem) {
      elem.parentElement.classList.remove("show");
    }
  });
}

// *------------Edit notes function for each notes----------------------

function deleteNote(noteInd) {
  let confirmDelete=confirm("Are You Sure You Want To Delete This?");
  if(!confirmDelete){
    return;
  }
  notes.splice(noteInd, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}

// *------------Uptade note function for each notes--------------------

function updateNote(noteInd, noteTitle, noteDes) {
  updateId = noteInd;
  isUpdate = true;
  addBox.click();
  addNote.innerText = "Update Note";
  popupHeading.innerText = "Update " + noteTitle;
  rowTitle.value = noteTitle;
  rowDetails.value = noteDes;
}
