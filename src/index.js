
import './style.css';
import _ from 'lodash';
import {
  displayTasks,
} from './modules/crud.js'

const openModalBtn = document.querySelector('.open-modal-btn');
const modalAdd = document.querySelector('.modal-add');
const overlay = document.querySelector('.overlay');
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

window.addEventListener('load', displayTasks);
