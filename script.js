const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Function to add a new task to the list.
function addTask() {

  // Check if the input box is empty.
  if (inputBox.value === '') {
    alert("You must write something!");   // Show an alert if the input is empty.
  } else {
    let li = document.createElement("li");    // Create a new list item (li) element to represent the task.
    li.innerHTML = inputBox.value;    // Set the content of the list item to the input value.
    listContainer.appendChild(li);    // Add the list item to the list container.

    // Create a delete button for each task.
    let deleteBtn = document.createElement("span");
    deleteBtn.innerHTML = '<img src="images/delete-icon.png">';   // Use an image as the delete button.
    li.appendChild(deleteBtn);    // Add the delete button to the list item.

    inputBox.value = "";    // Clear the input box after adding the task.

    // Add a click event listener to the delete button to remove the task when clicked.
    deleteBtn.addEventListener("click", () => {
      li.remove();    // Remove the parent list item when the delete button is clicked.
    });
  }
  saveData();   // Save the updated task list to the browser's localStorage.
}

// Add an event listener for the "Add" button click event.
document.querySelector(".js-add-btn").addEventListener('click', () => {
  addTask();
});

// Add an event listener for the Enter key press event in the input box.
inputBox.addEventListener('keydown', (event)=> {
  if (event.key === 'Enter') {
    addTask();
  }
});

// Add an event listener to the list container to handle clicks on list items (tasks).
listContainer.addEventListener("click", function(e){
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");   // Toggle the "checked" class when a list item is clicked.
  }
  saveData();
});

// Function to save the task list to the browser's localStorage.
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

// Function to load and display tasks from localStorage.
function showData() {
  listContainer.innerHTML = localStorage.getItem("data");

  // Update local storage when a task is deleted
  const deleteButtons = listContainer.querySelectorAll("li span");
    deleteButtons.forEach((deleteBtn) => {
      deleteBtn.addEventListener("click", () => {
        deleteBtn.parentElement.remove();
        saveData();
      });
    });
}

showData();




