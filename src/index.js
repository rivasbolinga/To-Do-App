// import _ from 'lodash';
import './style.css';
import Storage from './modules/localStorage.js';
import Task from './modules/task.js';
import {
  displayTask,
  displayTasks,
} from './modules/crud.js';

const openModalBtn = document.querySelector('.open-modal-btn');
const modalAdd = document.querySelector('.modal-add');
const overlay = document.querySelector('.overlay');
const closeModalBtn = document.querySelectorAll('.close-modal');
const addBtn = document.querySelector('.add-task-btn');
const titleInput = document.querySelector('.add-title');
const descriptionInput = document.querySelector('.add-desc');
const dateInput = document.querySelector('.add-date');
const listContainer = document.querySelector('.all-tasks');
const modalEdit = document.querySelector('.edit-task');
const editBtn = document.querySelector('.edit-task-btn');
const hambMenu = document.querySelector('.hamburger-menu');
const sideBar = document.querySelector('.sidebar-menu');
const closeMenu = document.querySelector('.close-menu-btn');
// ---- EVENT LISTENERES ---

// -- Function to open menu for mobile version --
hambMenu.addEventListener('click', (e) => {
  e.preventDefault();
  sideBar.style.display = 'flex';
});
// -- Function to open menu for mobile version --
closeMenu.addEventListener('click', (e) => {
  e.preventDefault();
  sideBar.style.display = 'none';
});

// -- Function to open modal to add new task --
openModalBtn.addEventListener('click', () => {
  modalAdd.classList.add('active');
  overlay.classList.add('active');
});
// -- Function to close modal --
function closeModal() {
  modalAdd.classList.remove('active');
  modalEdit.classList.remove('active');
  overlay.classList.remove('active');
}
closeModalBtn.forEach((btn) => btn.addEventListener('click', closeModal));

// -- Function to add new task when click add button --
addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const tasks = Storage.getTasks();
  const newTitle = titleInput.value;
  const newDescription = descriptionInput.value;
  const newDate = dateInput.value;
  let index;
  const len = tasks.length;
  if (len === 0 || len === null) {
    index = 0;
  } else {
    index = tasks[len - 1].index + 1;
  }
  if (newTitle) {
    const newTask = new Task(newTitle, newDescription, newDate, Number(index), false); //
    Storage.addTask(newTask);
    displayTask(newTask);
    closeModal();
  }
});

editBtn.addEventListener('click', (e) => {
  e.preventDefault();

// }
});

// -- Function to handle click functions inside task container--
const clickHandle = function (e) {
  if (e.target.classList.contains('fa-pen-to-square')) {
    // -- Open modal to modify task desciption --
    const { id } = e.target;
    e.target.parentElement.parentElement.setAttribute('data-task-index', id);
    modalEdit.classList.add('active');
    overlay.classList.add('active');
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
      sibling.classList.add('completed');
      Storage.updateStatus(id);
    } else {
      sibling.classList.remove('completed');
      Storage.updateStatus(id);
    }
  }
};

// --Event to handle UI in task --
listContainer.addEventListener('click', clickHandle);
window.addEventListener('load', displayTasks);