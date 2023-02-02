import { 
  displayTasks,
  displayChecked,
  displayImportant
} from "./crud";
const sideBar = document.querySelector('.sidebar-menu');

sideBar.addEventListener('click', (e) => {
  if(e.target.classList.contains('checked')) {
    displayChecked();
  } if(e.target.classList.contains('all')) {
    displayTasks();
  } if(e.target.classList.contains('important')) {
    displayImportant();
  }
})