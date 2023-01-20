const todoInput = document.querySelector('.list-checklists__input');
const nameChecklist = document.querySelector('.window_name');
const nameModalInputChecklist = document.querySelector('.todo__input');
const modalTodoInput = document.getElementById('todoInput');
const placeChecklistsList = document.querySelector(".list-checklists__listItems");
const buttonChecklist = document.querySelector(".list-checklists__button");
let modalWindowChecklist = document.getElementById("overlay3");
let currentObjectChecklist = '';


let arrayChecklists = [];
let currObjChecklistId = giveId();
let currChecklistId = '';


// проверяет, записан ли последний выданный id в локальное хранилище, если нет - дает 0, если да - забирает значение
function giveId() {
  let id = "";
  if (localStorage.getItem("lastChecklistsId") === null) {
    id = 0;
  } else {
    id = Number(localStorage.getItem("lastChecklistsId")) + 1;
  }
  // console.log(id);
  return id;
}

addEventListener('DOMContentLoaded', () => {

      
    if (localStorage.getItem("arrayChecklists") === null) {
        arrayChecklists = [];
    } else {
        arrayChecklists = JSON.parse(localStorage.getItem("arrayChecklists"));
        insertChecklists();
    }
  
    // console.log(arrayChecklists);
  
  });

  function insertChecklists() {

    arrayChecklists.forEach(el => {
  
      const li = document.createElement('li');
      li.className = "list-checklists__listItem";
      li.setAttribute("id", `${el.id}`);
  
      const item = document.createElement('p');
      item.className = "list-checklists__item";
  
      const check = document.createElement('div');
      check.className = "list-checklists__inputfield";
  
      const labelCheck = document.createElement('label');
      labelCheck.className = "list-checklists__check check";
  
      const inputCheck = document.createElement('input');
      inputCheck.className = "list-checklists__input-check";
      inputCheck.setAttribute("type", "checkbox");
      
  
      const checkmark = document.createElement('span');
      checkmark.className = "list-checklists__checkmark checkmark";
  
      ul.append(li);
  
      
  
  
  
  
  
  
      labelCheck.append(inputCheck);
      labelCheck.append(checkmark);
      li.append(check);
      li.append(item);
      item.textContent = el.name;
      check.append(labelCheck);
  
  
  
      
  
      const buttonEdit = document.createElement('button');
      buttonEdit.className = "list-checklists__btn-edit";
      buttonEdit.setAttribute("onClick", "findChecklist(this)");
  
      const buttonDelite = document.createElement('button');
      buttonDelite.className = "list-checklists__btn-delite";
  
      const imgButtonEdit = new Image(20, 20);
      imgButtonEdit.src = "./assets/images/pencil_white.png"
      imgButtonEdit.className = "header__buttonpic-edit";
  
      const imgButtonDelite = new Image(20, 20);
      imgButtonDelite.src = "./assets/images/delite_white.png"
      imgButtonDelite.className = "header__buttonpic-delite";
  
      li.append(buttonEdit);
      buttonEdit.append(imgButtonEdit);
      li.append(buttonDelite);
      buttonDelite.append(imgButtonDelite);
    });
  }
  

  function createTaskChecklist() {
    const objChecklist = {
        id: currObjChecklistId++,
        name: todoInput.value,
         
    }
    arrayChecklists.push(objChecklist);
  
    // сохраняем массив Checklist
    localStorage.setItem('arrayChecklists', JSON.stringify(arrayChecklists));
     // сохраняем в локальное хранилище последний использованный Id
  localStorage.setItem('lastChecklistsId', JSON.stringify(objChecklist.id));
    
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
  
    const item = document.createElement('p');
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
    arrayChecklists.forEach(el => {
      // дает создаваемому элементу block (li) id, доставая его из объекта
      block.setAttribute("id", `${el.id}`);
      // дает создаваемой кнопке редкатирования onClick, который по нажатию отправляет элемент в функцию findTask
      buttonEdit.setAttribute("onClick", "findChecklist(this)");
      
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

  // ____________________ЧЕК_ЛИСТ

let inp = document.querySelector(".todo__inp");
list = document.querySelector(".todo-list");
btnAdd = document.querySelector(".btn-add");

list.innerHTML = localStorage.getItem("tasks");



btnAdd.onclick = function () {
  createTodo();
  inp.value = '';
}

list.addEventListener("click", function (e) {
  let
    el = e.target;
  parent = el.parentElement;
  inpTask = parent.querySelector(".inp-task");
  check = parent.querySelector(".check");
  btnEdit = parent.querySelector(".btn-edit");

  if (el.classList.contains("check")) {
    inpTask.classList.toggle("_completed");
    check.classList.toggle("_active");
  }

  if (el.classList.contains("btn-del")) {
    parent.remove();
  }

  if (el.classList.contains("btn-edit")) {

    inpTask.classList.toggle("_active");

    btnEdit.classList.toggle("_active");
    inpTask.classList.toggle("no-event");

    if (btnEdit.innerHTML === "edit") {
      btnEdit.innerHTML = "save";
      inpTask.focus();
    }

    else {
      btnEdit.innerHTML = "edit";
      inpTask.setAttribute("value", inpTask.value);
    }

  }

  localStorage.setItem("tasks", list.innerHTML);
});

function findChecklist(el) {
  // забирает id из родительского элемента, который мы дали при создании карточки таска в createCard 
  const id = el.parentNode.id;
  console.log(id);
  let checklist = "";
  // находит в массиве тасков соответсвующий checklist по id

  checklist = arrayChecklists.find(el => el.id == id);
  currChecklistId = id;


  // передает имя таска в showTitle
  showTitleChecklist(checklist.name);
  // записывает в глобальную переменную найденный объект, чтобы передавать его в другие функции
  currentObjectChecklist = checklist;
  console.log(currentObjectChecklist);
  // checklistCard = el.parentNode;
}

function showTitleChecklist(el){
  nameChecklist.textContent = el;
  modalTodoInput.value = el;
};

function closePopup3() {
  modalWindowChecklist.style.display = "none";
}

function createTodo() {
  if (inp.value === '') {
    alert('Заполните поле');
    return;
  }

  // let num = 0++;
  let
    todo = `
          <span class="check"></span>
          <input class="inp inp-task no-event" value="${inp.value}" type="text">
          <button class="btn btn-edit _active">edit</button>
          <button class="btn btn-del">delete</button>
        `;
  item = document.createElement("li");

  item.classList = "row";
  item.innerHTML = todo;

  list.appendChild(item);
  // let key = `currentObjectChecklist_${Math.random()}`;
  // currentObjectChecklist.sub_`${Math.random()}` = `${todo}`;
  console.log(currentObjectChecklist);
  localStorage.setItem("tasks", list.innerHTML);

}