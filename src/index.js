import _ from 'lodash';
import './style.css';
import  Storage  from './modules/localStorage.js'
import  Task  from './modules/task.js'
import displayTask from './modules/crud.js'

const openModalBtn = document.querySelector('.open-modal-btn');
const modalAdd = document.querySelector('.modal-add');
const overlay = document.querySelector('.overlay');
const closeModalBtn = document.querySelector('.close-modal')
const addBtn = document.querySelector('.add-task-btn');
const titleInput = document.querySelector('.add-title');
const descriptionInput = document.querySelector('.add-desc');
const dateInput = document.querySelector('.add-date');
//---- EVENT LISTENERES ---

function closeModal () {
    modalAdd.classList.remove('active');
    overlay.classList.remove('active');
  
}
// -- Function to open modal to add new task --
openModalBtn.addEventListener('click', () => {

  modalAdd.classList.add('active');
  overlay.classList.add('active');
  });
// -- Function to close modal --
closeModalBtn.addEventListener('click', closeModal)

// -- Function to add new task when click add button --
addBtn.addEventListener('click',(e) => {
  e.preventDefault();
  const tasks = Storage.getTasks();
  const newTitle = titleInput.value;
  const newDescription = descriptionInput.value;
  const newDate = dateInput.value;
  let newId;
  const len = tasks.length;
  if (len === 0 || len === null) {
    newId = 0;
  } else {
    newId = tasks[len - 1].id + 1;
  }
  if (newTitle) {
    const newTask = new Task(newTitle, newDescription, newDate, newDescription, newId); //
    Storage.addTask(newTask);
    displayTask(newTask)
    closeModal();
  }
});