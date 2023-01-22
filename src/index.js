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
const removeBtn = document.querySelector('.fa-trash-can');
const listContainer = document.querySelector('.all-tasks')
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
  let index;
  const len = tasks.length;
  if (len === 0 || len === null) {
    index = 0;
  } else {
    index = tasks[len - 1].index + 1;
  }
  if (newTitle) {
    const newTask = new Task(newTitle, newDescription, newDate,Number(index),false); //
    Storage.addTask(newTask);
    displayTask(newTask)
    closeModal();
  }
});
// -- Function to remove task when click trash icon --

const clickHandle = function (e) {
  if (e.target.classList.contains('fa-pen-to-square')) {
    // -- Modify task desciption --
    
  } else if (e.target.classList.contains('fa-trash-can')) {
    // -- Delete task when press trash can --
    const { id } = e.target;
    Storage.removeTask(id);
    e.target.parentElement.parentElement.remove();
   }
   //else if (e.target.classList.contains('checkbox')) {
  //   // -- Check completed --
  //   const { id } = e.target;
  //   const checkbox = e.target;
  //   const sibling = checkbox.closest('.task-wrapper').querySelector('.task-text');
  //   if (checkbox.checked) {
  //     sibling.classList.add('completed');
  //     updateStatus(id);
  //   } else {
  //     sibling.classList.remove('completed');
  //     updateStatus(id);
  //   }
  // }
};

// --Event to handle UI in task --
listContainer.addEventListener('click', clickHandle);