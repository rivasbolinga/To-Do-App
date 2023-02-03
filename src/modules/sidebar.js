import { 
  displayTasks,
  displayChecked,
  displayImportant
} from "./crud";
const sideBar = document.querySelector('.sidebar-menu');

sideBar.addEventListener('click', (e) => {
  switch (true) {
    case e.target.classList.contains('checked'):
      displayChecked();
      break;
    case e.target.classList.contains('all'):
      displayTasks();
      break;
    case e.target.classList.contains('important'):
      displayImportant();
      break;
    default:
      break;
  }
})
