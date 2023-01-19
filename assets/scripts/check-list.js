const todoInput = document.querySelector('.list-checklists__input');
const nameChecklist = document.querySelector('.task__head');
const nameModalInputChecklist = document.querySelector('.todo__input');
const placeChecklistsList = document.querySelector(".list-checklists__listItems");
const buttonChecklist = document.querySelector(".list-checklists__button");
let modalWindowChecklist = document.getElementById("overlay3");

let arrayChecklists = [];


addEventListener('DOMContentLoaded', () => {

      
    if (localStorage.getItem("arrayChecklists") === null) {
        arrayChecklists = [];
    } else {
        arrayChecklists = JSON.parse(localStorage.getItem("arrayChecklists"));
    }
  
   
  
  });

  function createTaskChecklist() {
    const objChecklist = {
        name: todoInput.value,
    }
    arrayChecklists.push(objChecklist);
  
    // сохраняем массив Checklist
    localStorage.setItem('arrayChecklists', JSON.stringify(arrayChecklists));
    
}

// засовывает имя Checklist в модальное окно
function showTitleChecklist(title) {
    nameChecklist.innerHTML = `${title}`;
    nameModalInputChecklist.innerHTML = `${title}`;
  }
  



  const createСardChecklist = (obj) => {
    const block = document.createElement('li');
    block.className = "list-checklists__listItem";
  
    const check = document.createElement('div');
    check.className = "list-checklists__inputfield";
  
    const labelCheck = document.createElement('label');
    labelCheck.className = "list-checklists__check check";
  
    const inputCheck = document.createElement('input');
    inputCheck.className = "list-checklists__input-check";
    inputCheck.setAttribute("type", "checkbox");
  
    const checkmark = document.createElement('span');
    checkmark.className = "list-checklists__checkmark checkmark";
  
    const item = document.createElement('div');
    item.className = "list-checklists__item";
    item.textContent = `${todoInput.value}`;
  
    const buttonEdit = document.createElement('button');
    buttonEdit.className = "list-checklists__btn-edit";
  
    const buttonDelite = document.createElement('button');
    buttonDelite.className = "list-checklists__btn-delite";
  
    const imgButtonEdit = new Image(20, 20);
    imgButtonEdit.src = "./assets/images/pencil_white.png"
    imgButtonEdit.className = "header__buttonpic-edit";
  
    const imgButtonDelite = new Image(20, 20);
    imgButtonDelite.src = "./assets/images/delite_white.png"
    imgButtonDelite.className = "header__buttonpic-delite";
  
    block.append(check);
    block.append(item);
    block.append(buttonEdit);
    buttonEdit.append(imgButtonEdit);
    block.append(buttonDelite);
    buttonDelite.append(imgButtonDelite);
    check.append(labelCheck);
    labelCheck.append(inputCheck);
    labelCheck.append(checkmark);
  
    // проходится по записанным в массив таскам
    arrayInbox.forEach(el => {
      // дает создаваемому элементу block (li) id, доставая его из объекта
      block.setAttribute("id", `${el.id}`);
      // дает создаваемой кнопке редкатирования onClick, который по нажатию отправляет элемент в функцию findTask
      buttonEdit.setAttribute("onClick", "findTask(this)");
      // дает создаваемому чекбокчу onClick, который по нажатию отправляет элемент в функцию checkBox
      inputCheck.setAttribute("onClick", "checkBox(this)");
    })
  
    return block;
  }

  const addCardChecklist = (objItem,) => {
    const item = createСardChecklist(objItem);
    placeChecklistsList.appendChild(item);
  }

// слушатель для инпута по кнопке "Enter" на 13
  todoInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      createTaskChecklist();
      createСardChecklist();
      addCardChecklist();

      todoInput.value = "";
    }
  });

  // слушатель кнопки "Сохранить" на 13
  buttonChecklist.addEventListener("click", () => {
    createTaskChecklist();
      createСardChecklist();
      addCardChecklist();

      todoInput.value = "";
  });


  // КНОПКИ УДАЛИТЬ И РЕДАКТИРОВАТЬ_______________________________

  placeChecklistsList.addEventListener('click', (event) => {
    if (event.target.classList.contains('list-checklists__btn-delite')) {
      event.target.parentNode.remove();
      if (window.location.href.split('/').at(-1) == "13_list-checklists.html") {
        // const id = event.target.parentNode.id;
        const task = arrayChecklists.find(el => el.id == id);
        let index = arrayChecklists.indexOf(task);
        arrayChecklists.splice(index, 1);
        UpdatedArrayChecklistsLists();
      }
  
    }
  });
  
  placeChecklistsList.addEventListener('click', (event) => {
    if (event.target.classList.contains('list-checklists__btn-edit')) {
        modalWindowChecklist.style.display = "block";
    }
    // else if (event.target.classList.contains('overlay')) {
    //   modalWindow.style.display = "none";
    // }
  })

  function UpdatedArrayChecklistsLists() {
    if (window.location.href.split('/').at(-1) == "13_list-checklists.html") {
      localStorage.removeItem("arrayChecklists");
      localStorage.setItem("arrayChecklists", JSON.stringify(arrayChecklists));
    }
  
  };