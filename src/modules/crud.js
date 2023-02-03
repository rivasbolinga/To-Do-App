import {
  closeModal,
  createEditModal,
  createInfoModal,
} from './modal.js';
import Storage from './localStorage.js';
import Task from './task.js';

const listContainer = document.querySelector('.all-tasks');
const titleInput = document.querySelector('.add-title');
const descriptionInput = document.querySelector('.add-desc');
const dateInput = document.querySelector('.add-date');
const titleSection = document.querySelector('.title-section-text');
const importance = document.querySelector('.important-select')
const addForm = document.querySelector('.form');

function displayTask(task) {
  if(task.important === 'important') {
    const html = `
    <div class="task-container" data-task-importance="important">
     <div class="checkbox-task">
      <input id="${task.index}" class="checkbox" type="checkbox">
      <p data-index="${task.index}" class="task-text">${task.title}
      <i class="fa-solid fa-star"></i>
      </p>
     </div>
    <div class="all-icons">
    <p date-index="${task.index}" class="task-date">${task.dueDate}</p>
    <i id="${task.index}" class="fa-solid fa-magnifying-glass"></i>
      <i id="${task.index}" class="fa-regular fa-pen-to-square"></i>
    <i id="${task.index}" class="fa-regular fa-trash-can"></i>
    </div>`;
    listContainer.innerHTML += html;
  } else {
  const html = `
  <div class="task-container">
     <div class="checkbox-task">
      <input id="${task.index}" class="checkbox" type="checkbox">
      <p data-index="${task.index}" class="task-text">${task.title}</p>
     </div>
    <div class="all-icons">
    <p date-index="${task.index}" class="task-date">${task.dueDate}</p>
    <i id="${task.index}" class="fa-solid fa-magnifying-glass"></i>
      <i id="${task.index}" class="fa-regular fa-pen-to-square"></i>
    <i id="${task.index}" class="fa-regular fa-trash-can"></i>
    </div>`;
  listContainer.innerHTML += html;
  }
}

function displayTasks() {
  titleSection.textContent = "ALL TASKS"
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks.forEach((task) => {
      const html = `
    <div class="task-container">
     <div class="checkbox-task">
      <input id="${task.index}" class="checkbox" type="checkbox">
      <p data-index="${task.index}" class="task-text">${task.title}</p>
     </div>
    <div class="all-icons">
    <p date-index="${task.index}" class="task-date">${task.dueDate}</p>
    <i id="${task.index}" class="fa-solid fa-magnifying-glass"></i>
      <i id="${task.index}" class="fa-regular fa-pen-to-square"></i>
    <i id="${task.index}" class="fa-regular fa-trash-can"></i>
    </div>`;
    listContainer.innerHTML += html;
    }); 
  }


function displayChecked() {
  titleSection.textContent = "COMPLETED TASKS"
  const tasks = document.querySelectorAll('.task-container');
  tasks.forEach(task => {
    if(task.dataset.taskImportance === "true") {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
  }
  function displayImportant() {
    titleSection.textContent = "IMPORTANT";
    const tasks = document.querySelectorAll('.task-container');
    tasks.forEach(task => {
      if(task.dataset.taskImportance === "important") {
        task.style.display = 'flex';
      } else {
        task.style.display = 'none';
      }
    });
    }
// -- Function to add new task when click add button --

addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const tasks = Storage.getTasks();
  const newTitle = titleInput.value;
  const newDescription = descriptionInput.value;
  const newDate = dateInput.value;
  const important = importance.value
  let index;
  const len = tasks.length;
  if (len === 0 || len === null) {
    index = 0;
  } else {
    index = tasks[len - 1].index + 1;
  }
  if (newTitle) {
    const newTask = new Task(newTitle, newDescription, newDate, Number(index),important, false); //
    Storage.addTask(newTask);
    displayTask(newTask);
    closeModal();
  }
});

const closeModalBtn = document.querySelector('.close-modal');
closeModalBtn.addEventListener('click', closeModal);

// -- Function to handle click functions inside task container--
const clickHandle = (e) => {
  if (e.target.classList.contains('fa-pen-to-square')) {
    // -- Open modal to modify task desciption --
    const { id } = e.target;
    createEditModal(id);
  } else if (e.target.classList.contains('fa-trash-can')) {
    // -- Delete task when press trash can --
    const { id } = e.target;
    Storage.removeTask(id);
    e.target.parentElement.parentElement.remove();
  } else if (e.target.classList.contains('checkbox')) {
    // -- Check completed --
    const { id } = e.target;
    const checkbox = e.target;
    const sibling = checkbox.closest('.task-container').querySelector('.task-text');
    if (checkbox.checked) {
      sibling.dataset.taskStatus = 'completed';
      sibling.classList.add('completed');
      Storage.updateStatus(id);
    } else {
      sibling.classList.remove('completed');
      delete sibling.dataset.taskStatus;
      Storage.updateStatus(id);
    }
  } else if (e.target.classList.contains('fa-magnifying-glass')) {
    const { id } = e.target;
    createInfoModal(id);
  }
};
// --Event to handle UI in task --
listContainer.addEventListener('click', clickHandle);

export {
  displayTask,
  displayChecked,
  displayTasks,
  clickHandle,
  displayImportant
};