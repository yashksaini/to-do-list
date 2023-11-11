let pending = [];
let completed = [];
const pendingList = document.getElementById("pendingList");
const completedList = document.getElementById("completedList");
const taskInput = document.getElementById("taskInput");

function addTask() {
  const inputValue = taskInput.value;
  if (inputValue !== "") {
    pending.push(inputValue);
    taskInput.value = "";
    displayPending();
  }
}

function displayCompleted() {
  completedList.innerHTML = "";
  for (let i = 0; i < completed.length; i++) {
    completedList.innerHTML += `
       <div class='task completed'>
           <i class='fa-solid fa-circle-check' onclick="toggleComplete(${i},2)"></i>
           <span>${completed[i]}</span>
           <i class='fa-solid fa-xmark' onclick='removeTask(${i},2)'></i>
       </div>
       `;
  }
  localStorage.setItem("completed", JSON.stringify(completed));
}
function displayPending() {
  pendingList.innerHTML = "";
  for (let i = 0; i < pending.length; i++) {
    pendingList.innerHTML += `
      <div class='task '>
          <i class='fa-regular fa-circle' onclick="toggleComplete(${i},1)"></i> 
          <span class="draggable">${pending[i]}</span>
          <i class='fa-solid fa-xmark' onclick='removeTask(${i},1)'></i>
      </div>
      `;
  }
  localStorage.setItem("pending", JSON.stringify(pending));
}
function toggleComplete(index, type) {
  if (type === 1) {
    // Marking task completed
    completed.push(pending[index]);
    removeTask(index, 1);
  } else {
    // Marking task incomplete
    pending.push(completed[index]);
    removeTask(index, 2);
  }
  displayPending();
  displayCompleted();
}

function removeTask(index, type) {
  if (type === 1) {
    // Means the pending array
    pending.splice(index, 1);
    displayPending();
  } else {
    // Means the completed array
    completed.splice(index, 1);

    displayCompleted();
  }
}

function getDataFromLocalStorage() {
  if (localStorage.getItem("pending")) {
    pending = JSON.parse(localStorage.getItem("pending"));
    displayPending();
  }
  if (localStorage.getItem("completed")) {
    completed = JSON.parse(localStorage.getItem("completed"));
    displayCompleted();
  }
}

function getInitials() {
  new Sortable(pendingList, {
    handle: ".draggable",
    forcePlaceholderSize: true,
    placeholderClass: "dragging",
    animation: 400,
    swapThreshold: 1,
    onUpdate: function (evt) {
      // Update the todo array after sorting
      var newIndex = evt.newIndex;
      var oldIndex = evt.oldIndex;
      var movedItem = pending.splice(oldIndex, 1)[0];
      pending.splice(newIndex, 0, movedItem);
      displayPending();
    },
  });
}

getInitials();
getDataFromLocalStorage();
