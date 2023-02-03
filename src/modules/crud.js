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
      const taskContainer = document.createElement('div');
      taskContainer.classList.add('task-container');
      if (task.completed) {
        taskContainer.classList.add('completed');
        taskContainer.dataset.taskStatus = 'completed';
      }
      if (task.important === "important") {
        taskContainer.dataset.taskImportance = 'important';
      }
      const checkboxTask = document.createElement('div');
      checkboxTask.classList.add('checkbox-task');
      const checkbox = document.createElement('input');
      checkbox.id = task.index;
      checkbox.classList.add('checkbox');
      checkbox.type = "checkbox";
      checkboxTask.appendChild(checkbox);
      const taskText = document.createElement('p');
      taskText.dataset.index = task.index;
      taskText.classList.add('task-text');
      taskText.textContent = task.title;
      if (task.important === "important") {
        const star = document.createElement('i');
        star.classList.add('fa-solid');
        star.classList.add('fa-star');
        taskText.appendChild(star);
      }
      checkboxTask.appendChild(taskText);
      taskContainer.appendChild(checkboxTask);
      const allIcons = document.createElement('div');
      allIcons.classList.add('all-icons');
      const taskDate = document.createElement('p');
      taskDate.dataset.index = task.index;
      taskDate.classList.add('task-date');
      taskDate.textContent = task.dueDate;
      allIcons.appendChild(taskDate);
      const magnifyingGlass = document.createElement('i');
      magnifyingGlass.id = task.index;
      magnifyingGlass.classList.add('fa-solid');
      magnifyingGlass.classList.add('fa-magnifying-glass');
      allIcons.appendChild(magnifyingGlass);
      const pen = document.createElement('i');
      pen.id = task.index;
      pen.classList.add('fa-regular');
      pen.classList.add('fa-pen-to-square');
      allIcons.appendChild(pen);
      const trashCan = document.createElement('i');
      trashCan.id = task.index;
      trashCan.classList.add('fa-regular');
      trashCan.classList.add('fa-trash-can');
      allIcons.appendChild(trashCan);
      taskContainer.appendChild(allIcons);
      listContainer.appendChild(taskContainer);
    }

function displayTasks() {
    titleSection.textContent = "ALL TASKS"
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach((task) => {
      const taskContainer = document.createElement('div');
      taskContainer.classList.add('task-container');
      if (task.completed) {
        taskContainer.classList.add('completed');
        taskContainer.dataset.taskStatus = 'completed';
      }
      if (task.important === "important") {
        taskContainer.dataset.taskImportance = 'important';
      }
      const checkboxTask = document.createElement('div');
      checkboxTask.classList.add('checkbox-task');
      const checkbox = document.createElement('input');
      checkbox.id = task.index;
      checkbox.classList.add('checkbox');
      checkbox.type = "checkbox";
      checkboxTask.appendChild(checkbox);
      const taskText = document.createElement('p');
      taskText.dataset.index = task.index;
      taskText.classList.add('task-text');
      taskText.textContent = task.title;
      if (task.important === "important") {
        const star = document.createElement('i');
        star.classList.add('fa-solid');
        star.classList.add('fa-star');
        taskText.appendChild(star);
      }
      checkboxTask.appendChild(taskText);
      taskContainer.appendChild(checkboxTask);
      const allIcons = document.createElement('div');
      allIcons.classList.add('all-icons');
      const taskDate = document.createElement('p');
      taskDate.dataset.index = task.index;
      taskDate.classList.add('task-date');
      taskDate.textContent = task.dueDate;
      allIcons.appendChild(taskDate);
      const magnifyingGlass = document.createElement('i');
      magnifyingGlass.id = task.index;
      magnifyingGlass.classList.add('fa-solid');
      magnifyingGlass.classList.add('fa-magnifying-glass');
      allIcons.appendChild(magnifyingGlass);
      const pen = document.createElement('i');
      pen.id = task.index;
      pen.classList.add('fa-regular');
      pen.classList.add('fa-pen-to-square');
      allIcons.appendChild(pen);
      const trashCan = document.createElement('i');
      trashCan.id = task.index;
      trashCan.classList.add('fa-regular');
      trashCan.classList.add('fa-trash-can');
      allIcons.appendChild(trashCan);
      taskContainer.appendChild(allIcons);
      listContainer.appendChild(taskContainer);
    });
  }



function displayChecked() {
  titleSection.textContent = "COMPLETED TASKS"
  const tasks = document.querySelectorAll('.task-container');
  tasks.forEach(task => {
    if(task.dataset.taskStatus === "completed") {
      task.style.display = 'flex';
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
    const sibling = checkbox.closest('.task-container');
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