// let openRequest = indexedDB.open(planer, 1);
const inbox = document.querySelector(".inbox__input");
const inboxButton = document.querySelector(".inbox__button");
const placeInboxList = document.querySelector(".inbox__listItems");
// const buttonInboxEdit = document.querySelector(".inbox__btn-edit");
const buttonInboxDelite = document.querySelector(".inbox__btn-delite");
let inboxItem = document.querySelector(".inbox__item");
let modalWindow = document.getElementById("overlay");
let btnClosePopup = document.getElementById("close");
let nameModale = document.querySelector(".window_name");
const headerButton = document.querySelector(".header__button")
const modalButton = document.querySelector(".modal__button");
const modalInput = document.getElementById("modalInput");
const modalCategory = document.querySelector(".modal__category");
const modalType = document.querySelector(".modal__type");
const modalDate = document.getElementById("date_type");
const modalContext = document.getElementById("context_type");
const typeMenuProject = document.querySelector(".menu__item_submenu-projects");
const typeMenuQuick = document.querySelector(".menu__item_submenu-quick");
const typeMenuReference = document.querySelector(".menu__item_submenu-reference");
const typeMenuWaiting = document.querySelector(".menu__item_submenu-waiting");

let arrayInbox = [];
let arrayEditedTask = [];
let currObjId = giveId();

// проверяет, записан ли последний выданный id в локальное хранилище, если нет - дает 0, если да - забирает значение
function giveId() {
  let id = "";
  if (localStorage.getItem("lastTaskId") === null) {
    id = 0;
  } else {
    id = Number(localStorage.getItem("lastTaskId")) + 1;
  }
  // console.log(id);
  return id;
}

// глобальная переменная для сохранения обрабатываемого таска из функции findTask
let currentObject = "";
// переменная для карточки таска, записывается по нажатию на кнопку редактирования
let taskCard = "";


// создает объект из таска и записывает его в массив
function createTaskObject() {
  const objInbox = {
    id: currObjId++,
    name: inbox.value,
  }
  arrayInbox.push(objInbox);

  // сохраняем массив входящих
  localStorage.setItem('arrayInbox', JSON.stringify(arrayInbox));

  // сохраняем в локальное хранилище последний использованный Id
  localStorage.setItem('lastTaskId', JSON.stringify(objInbox.id));
}

// ЛОКАЛЬНОЕ ХРАНИЛИЩЕ_______________________

// window.addEventListener('storage', event => {
//   // console.log(event);

// })


// window.addEventListener('storage', function (e) {
//   console.log('change');
//   document.querySelector('.out').textContent = localStorage.getItem('b1');
// });


// _________________________________________________________________

// по нажатию на кнопку редактирования у определенного таска вызывается эта функция
function findTask(el) {
  // забирает id из родительского элемента, который мы дали при создании карточки таска в createCard 
  const id = el.parentNode.id;
  console.log(id);
  let task = "";
  // находит в массиве тасков соответсвующий таск по id
  if (window.location.href.split('/').at(-1) == "index.html") {
    getLocStorage(arrayInbox);
    task = arrayInbox.find(el => el.id == id);
  }
  else if (window.location.href.split('/').at(-1) !== "index.html") {
    getLocStorage(arrayEditedTask);
    task = arrayEditedTask.find(el => el.id == id);
  }


  // передает имя таска в showTitle
  showTitle(task.name);
  // записывает в глобальную переменную найденный объект, чтобы передавать его в другие функции
  currentObject = task;
  taskCard = el.parentNode;
}

// засовывает имя таска в модальное окно
function showTitle(title) {
  nameModale.innerHTML = `${title}`;
  modalInput.innerHTML = `${title}`;
}

const createСard = (obj) => {
  const block = document.createElement('li');
  block.className = "inbox__listItem";

  const check = document.createElement('div');
  check.className = "inbox__inputfield";

  const labelCheck = document.createElement('label');
  labelCheck.className = "inbox__check check";

  const inputCheck = document.createElement('input');
  inputCheck.className = "inbox__input-check";
  inputCheck.setAttribute("type", "checkbox");

  const checkmark = document.createElement('span');
  checkmark.className = "inbox__checkmark checkmark";

  const item = document.createElement('div'); 
  item.className = "inbox__item";
  item.textContent = `${inbox.value}`;

  const buttonEdit = document.createElement('button');
  buttonEdit.className = "inbox__btn-edit";

  const buttonDelite = document.createElement('button');
  buttonDelite.className = "inbox__btn-delite";

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

const addCard = (objItem,) => {
  const item = createСard(objItem);
  placeInboxList.appendChild(item);
}

// проверка нахождения пользователя на главной странице
if (window.location.href.split('/').at(-1) == "index.html") {

  // слушатель для инпута по кнопке "Enter" на главной
  inbox.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      createTaskObject();
      createСard();
      addCard();

      inbox.value = "";
    }
  });
  // слушатель кнопки "Сохранить" на главной
  inboxButton.addEventListener("click", () => {
    createTaskObject();
    createСard();
    addCard();

    inbox.value = "";
  });
};

// КНОПКИ УДАЛИТЬ И РЕДАКТИРОВАТЬ_______________________________

placeInboxList.addEventListener('click', (event) => {
  if (event.target.classList.contains('inbox__btn-delite')) {
    event.target.parentNode.remove();
    if (window.location.href.split('/').at(-1) == "index.html") {
      const id = event.target.parentNode.id;
      const task = arrayInbox.find(el => el.id == id);
      let index = arrayInbox.indexOf(task);
      arrayInbox.splice(index, 1);
      UpdatedArray();
    }

    if (window.location.toString().indexOf('/3_quick.html') > 0) {
      const id = event.target.parentNode.id;
      const task = arrayQuick.find(el => el.id == id);
      let index = arrayQuick.indexOf(task);
      arrayQuick.splice(index, 1);
      UpdatedArray();
    }
    if (window.location.toString().indexOf('/4_projects.html') > 0) {
      const id = event.target.parentNode.id;
      const task = arrayInbox.find(el => el.id == id);
      let index = arrayProject.indexOf(task);
      arrayProject.splice(index, 1);
      UpdatedArray();
    }
  }
});

placeInboxList.addEventListener('click', (event) => {
  if (event.target.classList.contains('inbox__btn-edit')) {
    modalWindow.style.display = "block";
  }
  // else if (event.target.classList.contains('overlay')) {
  //   modalWindow.style.display = "none";
  // }
})

// ЧЕКБОКС И СЧЕТЧИК______________________________________________________

let arrayProgressCounter = [];
let timeoutID;
let progressCounter = document.querySelector(".header__counter");
let timer;
let updArray;

function checkBox(checkbox) {
  if (window.location.href.split('/').at(-1) == "index.html") {
    if (checkbox.checked) {
      const id = checkbox.parentNode.parentNode.parentNode.id;
      const task = arrayInbox.find(el => el.id == id);
      let index = arrayInbox.indexOf(task);
      // console.log(index);

      timeoutID = setTimeout(() =>
        checkbox.parentNode.parentNode.parentNode.style.display = 'none', 5000
      );
      arrayProgressCounter.push(1);

      timer = setTimeout(() =>
        arrayInbox.splice(index, 1), 5000
      );

      updArray = setTimeout(() =>
        UpdatedArray(), 5000
      );

    } else {
      clearTimeout(timeoutID);
      clearTimeout(timer);
      clearTimeout(updArray);
      arrayProgressCounter.pop();
    }
  }

  if (window.location.toString().indexOf('/3_quick.html') > 0) {
    if (checkbox.checked) {
      const id = checkbox.parentNode.parentNode.parentNode.id;
      const task = arrayQuick.find(el => el.id == id);
      let index = arrayQuick.indexOf(task);
      // console.log(index);

      timeoutID = setTimeout(() =>
        checkbox.parentNode.parentNode.parentNode.style.display = 'none', 5000
      );
      arrayProgressCounter.push(1);

      timer = setTimeout(() =>
        arrayQuick.splice(index, 1), 5000
      );

      updArray = setTimeout(() =>
        UpdatedArray(), 5000
      );
      console.log(arrayQuick);

    } else {
      clearTimeout(timeoutID);
      clearTimeout(timer);
      clearTimeout(updArray);
      arrayProgressCounter.pop();
    }
  }
  if (window.location.toString().indexOf('/4_projects.html') > 0) {
    if (checkbox.checked) {
      const id = checkbox.parentNode.parentNode.parentNode.id;
      const task = arrayProject.find(el => el.id == id);
      let index = arrayProject.indexOf(task);
      // console.log(index);

      timeoutID = setTimeout(() =>
        checkbox.parentNode.parentNode.parentNode.style.display = 'none', 5000
      );
      arrayProgressCounter.push(1);

      timer = setTimeout(() =>
        arrayProject.splice(index, 1), 5000
      );

      updArray = setTimeout(() =>
        UpdatedArray(), 5000
      );

    } else {
      clearTimeout(timeoutID);
      clearTimeout(timer);
      clearTimeout(updArray);
      arrayProgressCounter.pop();
    }
  }
  if (window.location.toString().indexOf('/7_reference.html') > 0) {
    if (checkbox.checked) {
      const id = checkbox.parentNode.parentNode.parentNode.id;
      const task = arrayReference.find(el => el.id == id);
      let index = arrayReference.indexOf(task);
      // console.log(index);

      timeoutID = setTimeout(() =>
        checkbox.parentNode.parentNode.parentNode.style.display = 'none', 5000
      );
      arrayProgressCounter.push(1);

      timer = setTimeout(() =>
      arrayReference.splice(index, 1), 5000
      );

      updArray = setTimeout(() =>
        UpdatedArray(), 5000
      );

    } else {
      clearTimeout(timeoutID);
      clearTimeout(timer);
      clearTimeout(updArray);
      arrayProgressCounter.pop();
    }
  }
  // let progressCounter = document.querySelector(".header__counter");
  if (window.location.toString().indexOf('/8_waiting-list.html') > 0) {
    if (checkbox.checked) {
      const id = checkbox.parentNode.parentNode.parentNode.id;
      const task = arrayWaitingList.find(el => el.id == id);
      let index = arrayWaitingList.indexOf(task);
      // console.log(index);

      timeoutID = setTimeout(() =>
        checkbox.parentNode.parentNode.parentNode.style.display = 'none', 5000
      );
      arrayProgressCounter.push(1);

      timer = setTimeout(() =>
      arrayWaitingList.splice(index, 1), 5000
      );

      updArray = setTimeout(() =>
        UpdatedArray(), 5000
      );

    } else {
      clearTimeout(timeoutID);
      clearTimeout(timer);
      clearTimeout(updArray);
      arrayProgressCounter.pop();
    }
  }
  // let progressCounter = document.querySelector(".header__counter");
  progressCounter.textContent = arrayProgressCounter.length;
  localStorage.setItem("progressCounter", JSON.stringify(arrayProgressCounter.length));
}
// ЗАГРУЗКА СТРАНИЦЫ________________________________________________

addEventListener('DOMContentLoaded', () => {

  let lastLenghtCounter = Number(localStorage.getItem("progressCounter"));
  arrayProgressCounter.length = lastLenghtCounter;
  progressCounter.textContent = arrayProgressCounter.length;

  if (localStorage.getItem("arrayInbox") === null) {
    arrayInbox = [];
  } else {
    arrayInbox = JSON.parse(localStorage.getItem("arrayInbox"));
  }

  if (window.location.toString().indexOf('/index.html') > 0) {
    insertTasks(arrayInbox);
  }

});
// МЕНЮ________________________________________________________  _

// показывает выбранный пункт меню, выдавая класс с цветом
const menuItems = document.querySelectorAll('.menu__item');

menuItems.forEach(el => {
  el.addEventListener('click', function () {
    removeClassSelected();
    el.classList.add('menu__item_selected');
  });
});

function removeClassSelected() {
  menuItems.forEach(el => {
    el.classList.remove('menu__item_selected');
  })
};

// открывает и закрывает под-меню по клику + закрывает соседние
const submenu = document.querySelectorAll('.menu__item_withSubmenu');

submenu.forEach(el => {
  el.addEventListener('click', function () {

    if (el.classList.contains("menu__item_submenu_selected")) {
      el.classList.remove("menu__item_submenu_selected")
    } else {
      hideOtherSubmenu();
      el.classList.add('menu__item_submenu_selected');
    }

  });
});

function hideOtherSubmenu() {
  submenu.forEach(el => {
    el.classList.remove('menu__item_submenu_selected');
  })
};

// --------------- МОДАЛЬНОЕ ОКНО 1 -------------
let arrayProject = [];
let arrayReference = [];
let arrayQuick = [];
let arrayWaitingList = [];


function closePopup() {
  modalWindow.style.display = "none";
};

// висит на онклике кнопки "Сохранить" в модальном окне
function addValues() {
  // нужный объект найден в функции findTask и записан в глобальную переменную currentObject
  // забирает все значения из полей, записывает их в объект и выводит объект в консоль
  const modalTypeErr = document.querySelector('.type_error_message');
  const modalCategoryErr = document.querySelector('.category_error_message')
  let name = document.getElementById("modalInput").value;
  currentObject.name = `${name}`;
  let type = document.getElementById("case_type");
  currentObject.type = `${type.value}`;
  let category = document.getElementById("project_category");
  currentObject.category = `${category.value}`;
  let context = document.getElementById("context_type");
  currentObject.context = `${context.value}`;
  let data = document.getElementById("date_type");
  currentObject.data = `${data.value}`;

  if (type.value == "") {
    modalTypeErr.textContent = "Пожалуйста, укажите тип";
    type.style.border = "1px solid red";
  }
  if (category.value == "") {
    modalCategoryErr.textContent = "Пожалуйста, укажите категорию";
    category.style.border = "1px solid red";
  }
  if ((type.value != "") && (category.value != "")) {
    type.style.border = '1px solid #d5dbd9';
    category.style.border = '1px solid #d5dbd9';
    modalTypeErr.textContent = "";
    modalCategoryErr.textContent = "";

    arrayEditedTask.push(currentObject);

    localStorage.setItem("editedTasks", JSON.stringify(arrayEditedTask));

    let index = arrayInbox.indexOf(currentObject);
    arrayInbox.splice(index, 1);
    UpdatedArray();
    taskCard.remove();
    sortByType();

    localStorage.setItem("arrayProject", JSON.stringify(arrayProject));
    localStorage.setItem("arrayReference", JSON.stringify(arrayReference));
    localStorage.setItem("arrayQuick", JSON.stringify(arrayQuick));
    localStorage.setItem("arrayWaitingList", JSON.stringify(arrayWaitingList));

    closePopup();

    type.value = "";
    category.value = "";
    context.value = "";
    data.value = "";
  }
  // очищение полей модального окна

  // удаление карточки таска
  // закрытие модального окна

};

// function isEmpty() {

// }


function UpdatedArray() {
  if (window.location.href.split('/').at(-1) == "index.html") {
    localStorage.removeItem("arrayInbox");
    localStorage.setItem("arrayInbox", JSON.stringify(arrayInbox));
  }

  if (window.location.toString().indexOf('/3_quick.html') > 0) {
    localStorage.removeItem("arrayQuick");
    localStorage.setItem("arrayQuick", JSON.stringify(arrayQuick));
  }
  if (window.location.toString().indexOf('/4_projects.html') > 0) {
    localStorage.removeItem("arrayProject");
    localStorage.setItem("arrayProject", JSON.stringify(arrayProject));
  }
};

//ЧЕРНОВИК СОРТИРОВКИ С ВЫВОДОМ В КОНСОЛЬ
//const projects = document.getElementById('projects');
//projects.addEventListener('click', sortByType());


function sortByType() {

  if (currentObject.type === 'Проекты') {
    arrayProject.push(currentObject);
  } else if (currentObject.type === 'Быстрые дела') {
    arrayQuick.push(currentObject);
  } else if (currentObject.type === 'Справочные материалы') {
    arrayReference.push(currentObject);
  } else if (currentObject.type === 'Лист ожидания') {
    arrayWaitingList.push(currentObject);
  }

};

// загрузка массива проекты на страницу проекты с отрисовкой

if (window.location.toString().indexOf('/4_projects.html') > 0) {
  document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("arrayProject") === null) {
      arrayProject = [];
    } else {
      arrayProject = JSON.parse(localStorage.getItem("arrayProject"));
    }
    insertTasks(arrayProject);
  });
};
// загрузка массива быстрые дела на страницу быстрые дела с отрисовкой
if (window.location.toString().indexOf('/3_quick.html') > 0) {
  document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("arrayQuick") === null) {
      arrayQuick = [];
    } else {
      arrayQuick = JSON.parse(localStorage.getItem("arrayQuick"));
    }
    insertTasks(arrayQuick);
  });
};

// загрузка массива справочные материалы на страницу справочные материалы с отрисовкой
if (window.location.toString().indexOf('/7_reference.html') > 0) {
  document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("arrayReference") === null) {
      arrayReference = [];
    } else {
      arrayReference = JSON.parse(localStorage.getItem("arrayReference"));
    }
    insertTasks(arrayReference);
  });
};
// загрузка массива лист ожилания на страницу лист ожидания с отрисовкой
if (window.location.toString().indexOf('/8_waiting-list.html') > 0) {
  document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("arrayWaitingList") === null) {
      arrayWaitingList = [];
    } else {
      arrayWaitingList = JSON.parse(localStorage.getItem("arrayWaitingList"));
    }
    insertTasks(arrayWaitingList);
  });
};

function getLocStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}
//return arr.filter((el) => el.type.includes(query));



// ____________________ЧЕК_ЛИСТ

let inp = document.querySelector(".todo__inp");
list = document.querySelector(".todo-list");
btnAdd = document.querySelector(".btn-add");

list.innerHTML = localStorage.getItem("tasks");

function createTodo() {
  if (inp.value === '') {
    alert('Заполните поле');
    return;
  }

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

  localStorage.setItem("tasks", list.innerHTML);

}

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