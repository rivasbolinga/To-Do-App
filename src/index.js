// import _ from 'lodash';
import './style.css';
import Storage from './modules/localStorage.js';
import Task from './modules/task.js';
import {
  displayTask,
  displayTasks,
} from './modules/crud.js';
import { createElement } from 'parse5/lib/tree-adapters/default';

const openModalBtn = document.querySelector('.open-modal-btn');
const modalAdd = document.querySelector('.modal-add');
const overlay = document.querySelector('.overlay');
const addBtn = document.querySelector('.add-task-btn');
const titleInput = document.querySelector('.add-title');
const descriptionInput = document.querySelector('.add-desc');
const dateInput = document.querySelector('.add-date');
const listContainer = document.querySelector('.all-tasks');
const modalEdit = document.querySelector('.edit-task');
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

function editTask(id,editTitleInput) {
  // Get the task from Local Storage
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  let taskToEdit = tasks.find((task) => task.index === id);

  // Get the updated task information from the modal input fields
  const newTitle = editTitleInput.value;
  const newDescription = document.querySelector('.add-desc').value;
  const newDate = document.querySelector('.add-date').value;
 
  const taskContainer = document.querySelector(`[data-index='${id}']`);
  taskContainer.textContent = newTitle;
  Storage.editTask(newTitle, id)
  // Close the modal
  closeModal();
}


//--Create a modal to edit task.
function createEditModal(id) {
  modalEdit.classList.add('active');
  overlay.classList.add('active');
  const titleContainer = document.createElement('div');
  titleContainer.classList.add('title-modal');
  const titleModal = document.createElement('h3');
  titleModal.textContent = 'Edit Task';
  const closeModalBtn = document.createElement('button');
  closeModalBtn.classList.add('close-modal');
  closeModalBtn.textContent = 'x';
  modalEdit.appendChild(titleContainer);
  titleContainer.appendChild(titleModal);
  titleContainer.appendChild(closeModalBtn);
  const formContainer = document.createElement('div');
  formContainer.classList.add('form-container');
  const form = document.createElement('form');
  form.classList.add('form');
  //title
  const editTitleContainer = document.createElement('div');
  editTitleContainer.classList.add('add-container');
  editTitleContainer.classList.add('title');
  const editTitlelabel = document.createElement('label');
  editTitlelabel.classList.add('add-title-label');
  editTitlelabel.textContent = 'Title';
  const editTitleInput = document.createElement('input');
  editTitleInput.classList.add('add-title');
  editTitleInput.classList.add('input');
  editTitleInput.type = 'text';
  editTitleInput.id = id;
  modalEdit.appendChild(formContainer);
  formContainer.appendChild(form);
  form.appendChild(editTitleContainer);
  editTitleContainer.appendChild(editTitlelabel);
  editTitleContainer.appendChild(editTitleInput);
// description
const editDescContainer = document.createElement('div');
  editDescContainer.classList.add('add-container');
  editDescContainer.classList.add('description');
  const editDesclabel = document.createElement('label');
  editDesclabel.classList.add('add-desc-label');
  editDesclabel.textContent = 'Description';
  const editDescInput = document.createElement('textarea');
  editDescInput.classList.add('add-desc');
  // editDescInput.type = 'text';
  editDescInput.id = id;
  form.appendChild(editDescContainer);
  editDescContainer.appendChild(editDesclabel);
  editDescContainer.appendChild(editDescInput);
  // date
  const editDateContainer = document.createElement('div');
  editDateContainer.classList.add('add-container');
  editDateContainer.classList.add('date');
  const editDatelabel = document.createElement('label');
  editDatelabel.classList.add('add-date-label');
  editDatelabel.textContent = 'Due date';
  const editDateInput = document.createElement('input');
  editDateInput.classList.add('add-date');
  editDateInput.classList.add('input');
  editDateInput.type = 'date';
  editDateInput.id = id;
  form.appendChild(editDateContainer);
  editDateContainer.appendChild(editDatelabel);
  editDateContainer.appendChild(editDateInput);
  const buttonEdit = document.createElement('button');
  buttonEdit.classList.add('edit-task-btn');
  buttonEdit.textContent = 'Edit';
  buttonEdit.id = id;
  form.appendChild(buttonEdit);
  // closeModalBtn.addEventListener('click', (e) => {
  //   e.preventDefault();
  //   closeModal()
  // })
  buttonEdit.addEventListener('click', (e) => {
    e.preventDefault();
    const {id} = e.target;
    editTask(id,editTitleInput);
  })
};
// -- Function to close modal --
function closeModal() {
  console.log('clicked');
  const id = modalEdit.getAttribute('data-id');
  console.log(id)
  modalEdit.classList.remove('active');
  modalAdd.classList.remove('active');
  overlay.classList.remove('active');
  while (modalEdit.firstChild) {
    modalEdit.removeChild(modalEdit.firstChild);
  }
  while (overlay.firstChild) {
    overlay.removeChild(overlay.firstChild);
  }
}

function createInfoModal(id) {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  modalEdit.classList.add('active');
  overlay.classList.add('active');
  modalEdit.setAttribute('data-id', id);
  const html = `
  <div class='modal-info-container'>
    <div class= "title-container-info">
    <h3>Task details</h3>
    <button class="close-modal">x</button>
    </div>
  <div class="task-details">
    <div class="title-container">
      <h4 class="info-title">Title</h4>
      <p class="info">${tasks[id].title}</p>
     </div
   <div class="description-container">
     <h4 class="info-title">Description</h4>
     <p class="info">${tasks[id].description}</p>
     <div class="date-info-container">
     <h4 class="info-title">Date</h4>
     <div class="info">${tasks[id].dueDate}</div>
     </div>
       </div>
  
    </div>
  </div>`
  modalEdit.insertAdjacentHTML('beforeend',html);
    }
    const closeModalBtn = document.querySelectorAll('.close-modal');
    closeModalBtn.forEach((btn) => btn.addEventListener('click', closeModal));



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
      sibling.classList.add('completed');
      Storage.updateStatus(id);
    } else {
      sibling.classList.remove('completed');
      Storage.updateStatus(id);
    }
  } else if (e.target.classList.contains('fa-magnifying-glass')) {
    const { id } = e.target;
    createInfoModal(id);
  }
};

// --Event to handle UI in task --
listContainer.addEventListener('click', clickHandle);
window.addEventListener('load', displayTasks);
