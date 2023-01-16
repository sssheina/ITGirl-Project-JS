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


// создает объект из таска и записывает его в массив по нажатию
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
  // находит в массиве тасков соответсвующий таск по id
  const task = arrayInbox.find(el => el.id == id);
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
  // name.textContent = obj.name;
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
  //  const imgButtonEdit = document.createElement('img');
  // imgButtonEdit.className = "header__buttonpic-edit";
  const buttonDelite = document.createElement('button');
  buttonDelite.className = "inbox__btn-delite";
  //  const imgButtonDelite= document.createElement('img');
  // imgButtonDelite.className = "header__buttonpic-delite";

  block.append(check);
  block.append(item);
  block.append(buttonEdit);
  block.append(buttonDelite);
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
  // buttonEdit.append(imgButtonEdit);
  // buttonDelite.append(imgButtonDelite);
  return block;
}

const addCard = (objItem, ) => {
  const item = createСard(objItem);
  placeInboxList.appendChild(item);
}

// проверка нахождения пользователя на главной странице
if (window.location.href.split('/').at(-1) == "index.html") {

  // слушатель кнопки "Сохранить" на главной
  inboxButton.addEventListener("click", () => {
    createTaskObject();
    createСard();
    addCard();

    inbox.value = "";
  });
};

placeInboxList.addEventListener('click', (event) => {
  if (event.target.classList.contains('inbox__btn-delite')) {
    event.target.parentNode.remove();

    const id = event.target.parentNode.id;
    const task = arrayInbox.find(el => el.id == id);
    let index = arrayInbox.indexOf(task);
    arrayInbox.splice(index, 1);
    UpdatedArray();
  }
})

placeInboxList.addEventListener('click', (event) => {
  if (event.target.classList.contains('inbox__btn-edit')) {
    modalWindow.style.display = "block";

  }
  if (event.target.classList.contains('overlay')) {
    modalWindow.style.display = "none";

  }
})

// ДЛЯ 7 СТРАНИЦЫ "СПРАВОЧНЫЕ МАТЕРИАЛЫ"_______________________________________________________________

const createСardReference = (obj) => {
  const block = document.createElement('li');
  block.className = "reference__listItem";
  const category = document.createElement('div');
  category.className = "reference__category";
  const check = document.createElement('div');
  check.className = "reference__inputfield";
  // name.textContent = obj.name;
  const labelCheck = document.createElement('label');
  labelCheck.className = "reference__check check";
  const inputCheck = document.createElement('input');
  inputCheck.className = "reference__input-check";
  inputCheck.setAttribute("type", "checkbox");
  const checkmark = document.createElement('span');
  checkmark.className = "reference__checkmark checkmark";
  const item = document.createElement('div');
  item.className = "reference__item-name";
  item.textContent = obj.name;
  const contextItem = document.createElement('div');
  contextItem.className = "reference__item";
  const context = document.createElement('span');
  context.className = "reference__context";
  const buttonEdit = document.createElement('button');
  buttonEdit.className = "inbox__btn-edit";
  //  const imgButtonEdit = document.createElement('img');
  // imgButtonEdit.className = "header__buttonpic-edit";
  const buttonDelite = document.createElement('button');
  buttonDelite.className = "inbox__btn-delite";
  //  const imgButtonDelite= document.createElement('img');
  // imgButtonDelite.className = "header__buttonpic-delite";

  block.append(check);
  block.append(category);
  block.append(item);
  block.append(contextItem);
  block.append(buttonEdit);
  block.append(buttonDelite);
  check.append(labelCheck);
  labelCheck.append(inputCheck);
  labelCheck.append(checkmark);
  contextItem.append(context);

  // проходится по записанным в массив таскам
  arrayReference.forEach(el => {
    // дает создаваемому элементу block (li) id, доставая его из объекта
    // block.setAttribute("id", `${el.id}`);
    // дает создаваемой кнопке редкатирования onClick, который по нажатию отправляет элемент в функцию findTask
    buttonEdit.setAttribute("onClick", "findTask(this)");
    // дает создаваемому чекбокчу onClick, который по нажатию отправляет элемент в функцию checkBox
    inputCheck.setAttribute("onClick", "checkBox(this)");
  })
  // buttonEdit.append(imgButtonEdit);
  // buttonDelite.append(imgButtonDelite);
  return block;

}


// ДЛЯ 8 СТРАНИЦЫ "ЛИСТ ОЖИДАНИЯ"_______________________________________________________________

const createСardWaitingList = (obj) => {
  const block = document.createElement('li');
  block.className = "waiting-list__listItem";
  const category = document.createElement('div');
  category.className = "waiting-list__category";
  const check = document.createElement('div');
  check.className = "waiting-list__inputfield";
  // name.textContent = obj.name;
  const labelCheck = document.createElement('label');
  labelCheck.className = "waiting-list__check check";
  const inputCheck = document.createElement('input');
  inputCheck.className = "waiting-list__input-check";
  inputCheck.setAttribute("type", "checkbox");
  const checkmark = document.createElement('span');
  checkmark.className = "waiting-list__checkmark checkmark";
  const item = document.createElement('div');
  item.className = "waiting-list__item-name";
  item.textContent = obj.name;
  const contextItem = document.createElement('div');
  contextItem.className = "waiting-list__item";
  const context = document.createElement('span');
  context.className = "waiting-list__context";
  const buttonEdit = document.createElement('button');
  buttonEdit.className = "inbox__btn-edit";
  //  const imgButtonEdit = document.createElement('img');
  // imgButtonEdit.className = "header__buttonpic-edit";
  const buttonDelite = document.createElement('button');
  buttonDelite.className = "inbox__btn-delite";
  //  const imgButtonDelite= document.createElement('img');
  // imgButtonDelite.className = "header__buttonpic-delite";

  block.append(check);
  block.append(category);
  block.append(item);
  block.append(contextItem);
  block.append(buttonEdit);
  block.append(buttonDelite);
  check.append(labelCheck);
  labelCheck.append(inputCheck);
  labelCheck.append(checkmark);
  contextItem.append(context);

  // проходится по записанным в массив таскам
  arrayWaitingList.forEach(el => {
    // дает создаваемому элементу block (li) id, доставая его из объекта
    // block.setAttribute("id", `${el.id}`);
    // дает создаваемой кнопке редкатирования onClick, который по нажатию отправляет элемент в функцию findTask
    buttonEdit.setAttribute("onClick", "findTask(this)");
    // дает создаваемому чекбокчу onClick, который по нажатию отправляет элемент в функцию checkBox
    inputCheck.setAttribute("onClick", "checkBox(this)");
  })
  // buttonEdit.append(imgButtonEdit);
  // buttonDelite.append(imgButtonDelite);
  return block;

}


// ЧЕКБОКС И СЧЕТЧИК______________________________________________________

let arrayProgressCounter = [];
let timeoutID;
let progressCounter = document.querySelector(".header__counter");
let timer;
let updArray;

function checkBox(checkbox) {

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

  if (localStorage.getItem("editedTasks") === null) {
    arrayEditedTask = [];
  } else {
    arrayEditedTask = JSON.parse(localStorage.getItem("editedTasks"));
  }
  if (window.location.toString().indexOf('/index.html') > 0) {
    arrayInbox.forEach(el => {
      const block = document.createElement('li');
      block.className = "inbox__listItem";
      const check = document.createElement('div');
      check.className = "inbox__inputfield";
      // name.textContent = obj.name;
      const labelCheck = document.createElement('label');
      labelCheck.className = "inbox__check check";
      const inputCheck = document.createElement('input');
      inputCheck.className = "inbox__input-check";
      inputCheck.setAttribute("type", "checkbox");
      const checkmark = document.createElement('span');
      checkmark.className = "inbox__checkmark checkmark";
      const item = document.createElement('div');
      item.className = "inbox__item";
      item.textContent = el.name;
      // console.log(el.name);
      const buttonEdit = document.createElement('button');
      buttonEdit.className = "inbox__btn-edit";
      //  const imgButtonEdit = document.createElement('img');
      // imgButtonEdit.className = "header__buttonpic-edit";
      const buttonDelite = document.createElement('button');
      buttonDelite.className = "inbox__btn-delite";
      //  const imgButtonDelite= document.createElement('img');
      // imgButtonDelite.className = "header__buttonpic-delite";

      block.append(check);
      block.append(item);
      block.append(buttonEdit);
      block.append(buttonDelite);
      check.append(labelCheck);
      labelCheck.append(inputCheck);
      labelCheck.append(checkmark);

      // проходится по записанным в массив таскам

      // дает создаваемому элементу block (li) id, доставая его из объекта
      block.setAttribute("id", `${el.id}`);
      // дает создаваемой кнопке редкатирования onClick, который по нажатию отправляет элемент в функцию findTask
      buttonEdit.setAttribute("onClick", "findTask(this)");
      // дает создаваемому чекбокчу onClick, который по нажатию отправляет элемент в функцию checkBox
      inputCheck.setAttribute("onClick", "checkBox(this)");


      placeInboxList.appendChild(block);
      // console.log(arrayInbox);
    })
  }
})

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


function closePopup() {
  modalWindow.style.display = "none";
};

// висит на онклике кнопки "Сохранить" в модальном окне
function addValues() {
  // нужный объект найден в функции findTask и записан в глобальную переменную currentObject
  // забирает все значения из полей, записывает их в объект и выводит объект в консоль

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

  if (type.value != "") {
    arrayEditedTask.push(currentObject);
    localStorage.setItem('editedTasks', JSON.stringify(arrayEditedTask));

    let index = arrayInbox.indexOf(currentObject);
    arrayInbox.splice(index, 1);
    // console.log(arrayInbox);
    UpdatedArray();
  }

  // сохранение каждой отдельной задачи в локальном хранилище
  // let keyObj = `planerTaskObj_${currentObject.id}`;
  // localStorage.setItem(keyObj, JSON.stringify(currentObject));

  //   let arrayInboxParse = localStorage.getItem('arrayInbox');
  // arrayInboxParse = JSON.parse(arrayInboxParse);
  // console.log(arrayInboxParse);

  // очищение полей модального окна
  type.value = "";
  category.value = "";
  context.value = "";
  data.value = "";
  // удаление карточки таска
  taskCard.remove();
  // закрытие модального окна
  closePopup();

  sortByType();

  localStorage.setItem("arrayProject", JSON.stringify(arrayProject));
  localStorage.setItem("arrayReference", JSON.stringify(arrayReference));
  localStorage.setItem("arrayQuick", JSON.stringify(arrayQuick));
  localStorage.setItem("arrayWaitingList", JSON.stringify(arrayWaitingList));


};

// парсим arrayEditedTask
//  let arrayEditedTaskParse  = localStorage.getItem('editedTasks');
//  arrayEditedTaskParse = JSON.parse('editedTasks');
//  console.log(arrayEditedTaskParse);
// arrayEditedTaskParse = arrayEditedTask;


function UpdatedArray() {
  localStorage.removeItem("arrayInbox");
  localStorage.setItem("arrayInbox", JSON.stringify(arrayInbox));

}

//ЧЕРНОВИК СОРТИРОВКИ С ВЫВОДОМ В КОНСОЛЬ
//const projects = document.getElementById('projects');
//projects.addEventListener('click', sortByType());
let arrayProject = [];
let arrayReference = [];
let arrayQuick = [];
let arrayWaitingList = [];

function sortByType() {

  arrayEditedTask.forEach(el => {
    if (el.type === 'Проекты') {
      arrayProject.push(el);
    }
    if (el.type === 'Быстрые дела') {
      arrayQuick.push(el);
    }
    if (el.type === 'Справочные материалы') {
      arrayReference.push(el);
    }
    if (el.type === 'Лист ожидания') {
      arrayWaitingList.push(el);
    }
  });
}

// загрузка массива проекты на страницу проекты с отрисовкой

if (window.location.toString().indexOf('/4_projects.html') > 0) {
  document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("arrayProject") === null) {
      arrayProject = [];
    } else {
      arrayProject = JSON.parse(localStorage.getItem("arrayProject"));
    }

    arrayProject.forEach(el => {
      const block = document.createElement('li');
      block.className = "projects__listItem";
      const category = document.createElement('div');
      category.className = "projects__category";
      if (el.category === 'Дом') {
        category.className = 'projects__category category-home';
      } else if (el.category === 'Учеба') {
        category.className = 'projects__category category-learning';
      } else if (el.category === 'Работа') {
        category.className = 'projects__category category-job';
      } else if (el.category === 'Саморазвитие') {
        category.className = 'projects__category category-self-development';
      } else if (el.category === 'Здоровье') {
        category.className = 'projects__category category-health';
      } else if (el.category === 'Отдых') {
        category.className = 'projects__category category-recreation';
      } else if (el.category === 'Хобби') {
        category.className = 'projects__category category-hobby';
      } else if (el.category === 'Идеи') {
        category.className = 'projects__category category-ideas';
      } else if (el.category === 'Хозяйство') {
        category.className = 'projects__category category-household';
      } else if (el.category === 'Спорт') {
        category.className = 'projects__category category-sport';
      } else if (el.category === 'Уход за собой') {
        category.className = 'projects__category category-self-care';
      }

      const check = document.createElement('div');
      check.className = "projects__inputfield";
      // name.textContent = obj.name;
      const labelCheck = document.createElement('label');
      labelCheck.className = "projects__check check";
      const inputCheck = document.createElement('input');
      inputCheck.className = "projects__input-check";
      inputCheck.setAttribute("type", "checkbox");
      const checkmark = document.createElement('span');
      checkmark.className = "projects__checkmark checkmark";
      const item = document.createElement('div');
      item.className = "projects__item-name";
      item.textContent = el.name;
      // const nameLink = document.createElement('a');
      // nameLink.textContent = el.name;
      //nameLink.href = "./5_stages.html";
      // const contextItem = document.createElement('div'); 
      // contextItem.className = "projects__item";
      // const context = document.createElement('span'); 
      // context.className = "projects__context";
      const buttonEdit = document.createElement('button');
      buttonEdit.className = "inbox__btn-edit";
      const buttonDelite = document.createElement('button');
      buttonDelite.className = "inbox__btn-delite";


      block.append(check);
      block.append(category);
      block.append(item);
      // block.append(contextItem);
      block.append(buttonEdit);
      block.append(buttonDelite);
      check.append(labelCheck);
      labelCheck.append(inputCheck);
      labelCheck.append(checkmark);

      // проходится по записанным в массив таскам

      // дает создаваемому элементу block (li) id, доставая его из объекта
      //block.setAttribute("id", `${el.id}`);
      // дает создаваемой кнопке редкатирования onClick, который по нажатию отправляет элемент в функцию findTask
      //buttonEdit.setAttribute("onClick", "findTask(this)");
      // дает создаваемому чекбокчу onClick, который по нажатию отправляет элемент в функцию checkBox
      //inputCheck.setAttribute("onClick", "checkBox(this)");
      placeInboxList.appendChild(block);
      // console.log(arrayInbox);
    })
  })
};
// загрузка массива быстрые дела на страницу быстрые дела с отрисовкой
if (window.location.toString().indexOf('/3_quick.html') > 0) {
  document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("arrayQuick") === null) {
      arrayQuick = [];
    } else {
      arrayQuick = JSON.parse(localStorage.getItem("arrayQuick"));
    }
    arrayQuick.forEach(el => {
      const block = document.createElement('li');
      block.className = "quick__listItem";
      const category = document.createElement('div');
      if (el.category === 'Дом') {
        category.className = 'quick__category category-home';
      } else if (el.category === 'Учеба') {
        category.className = 'quick__category category-learning';
      } else if (el.category === 'Работа') {
        category.className = 'quick__category category-job';
      } else if (el.category === 'Саморазвитие') {
        category.className = 'quick__category category-self-development';
      } else if (el.category === 'Здоровье') {
        category.className = 'quick__category category-health';
      } else if (el.category === 'Отдых') {
        category.className = 'quick__category category-recreation';
      } else if (el.category === 'Хобби') {
        category.className = 'quick__category category-hobby';
      } else if (el.category === 'Идеи') {
        category.className = 'quick__category category-ideas';
      } else if (el.category === 'Хозяйство') {
        category.className = 'quick__category category-household';
      } else if (el.category === 'Спорт') {
        category.className = 'quick__category category-sport';
      } else if (el.category === 'Уход за собой') {
        category.className = 'quick__category category-self-care';
      }
      const check = document.createElement('div');
      check.className = "quick__inputfield";
      // name.textContent = obj.name;
      const labelCheck = document.createElement('label');
      labelCheck.className = "quick__check check";
      const inputCheck = document.createElement('input');
      inputCheck.className = "quick__input-check";
      inputCheck.setAttribute("type", "checkbox");
      const checkmark = document.createElement('span');
      checkmark.className = "quick__checkmark checkmark";
      const item = document.createElement('div');
      item.className = "quick__item-name";
      item.textContent = el.name;
      const contextItem = document.createElement('div');
      contextItem.className = "quick__item";
      const context = document.createElement('span');

      if (el.context === 'Дом') {
        context.className = 'quick__context home-tag';
      } else if (el.context === 'Телефон') {
        context.className = 'quick__context phone-tag';
      } else if (el.context === 'Вне дома') {
        context.className = 'quick__context outdoors-tag';
      } else if (el.context === 'Компьютер') {
        context.className = 'quick__context computer-tag';
      } else if (el.context === 'Делегироване') {
        context.className = 'quick__context delegating-tag';
      } else if (el.context === 'Город') {
        context.className = 'quick__context city-tag';
      } else if (el.context === 'Школа') {
        context.className = 'quick__context school-tag';
      } else if (el.context === 'Детсад') {
        context.className = 'quick__context kindergarten-tag';
      } else if (el.context === 'Минск') {
        context.className = 'quick__context minsk-tag';
      } 

      const buttonEdit = document.createElement('button');
      buttonEdit.className = "inbox__btn-edit";
      //  const imgButtonEdit = document.createElement('img');
      // imgButtonEdit.className = "header__buttonpic-edit";
      const buttonDelite = document.createElement('button');
      buttonDelite.className = "inbox__btn-delite";
      //  const imgButtonDelite= document.createElement('img');
      // imgButtonDelite.className = "header__buttonpic-delite";

      block.append(check);
      block.append(category);
      block.append(item);
      block.append(contextItem);
      block.append(buttonEdit);
      block.append(buttonDelite);
      check.append(labelCheck);
      labelCheck.append(inputCheck);
      labelCheck.append(checkmark);
      contextItem.append(context);
      // дает создаваемому элементу block (li) id, доставая его из объекта
      block.setAttribute("id", `${el.id}`);
      // дает создаваемой кнопке редкатирования onClick, который по нажатию отправляет элемент в функцию findTask
      buttonEdit.setAttribute("onClick", "findTask(this)");
      // дает создаваемому чекбокчу onClick, который по нажатию отправляет элемент в функцию checkBox
      inputCheck.setAttribute("onClick", "checkBox(this)");
      placeInboxList.appendChild(block);
      // console.log(arrayInbox);
    })
  })
};


//return arr.filter((el) => el.type.includes(query));


// --------------- МОДАЛЬНОЕ ОКНО 2 -------------

// let modalWindow2 = document.getElementById("overlay2");
// let btnClosePopup2 = document.getElementById("close2");
// let delay_popup2 = 5000;

// setTimeout(() => {
//   modalWindow2.style.display = "block";
// }, delay_popup2);

// btnClosePopup2.onclick = () => {
//   modalWindow2.style.display = "none";
// };



// ЧЕК_ЛИСТ

// $('.task__add').on('focus',function(){
//   $(this).val('');
// });

// $('.task__add').on('blur',function(){
//   $(this).val('+ add new task');
// });

// $('form').on('submit', function(event){
//   event.preventDefault();

//   var taskText = $('.task__add').val();
//   var tasksN = $('.task').length + 1;

//   var newTask = '<label for="task--' + tasksN + '" class="task task--new"><input class="task__check" type="checkbox" id="task--' + tasksN + '" /> <div class="task__field task--row">' + taskText + '<button class="task__important"><i class="fa fa-check" aria-hidden="true"></i></button></div></label>'


//   $('.task__list').append(newTask);

//   $('.task__add').val('');
//   checkList();
// });

// var lastDeletedTask = '';


// function checkList() {


//   $('.task').each(function(){

//     var $field = $(this).find('.task__field');
//     var mousedown = false;


//     $field.on('mousedown', function(){
//         mousedown = true;
//         $field.addClass('shaking');
//         setTimeout(deleteTask,1000)
//     });

//     $field.on('mouseup', function(){
//         mousedown = false;
//         $field.removeClass('shaking');
//     });

//     function deleteTask(){
//       if(mousedown) {
//         $field.addClass('delete');
//         lastDeletedTask = $field.text();
//         console.log(lastDeletedTask);

//         setTimeout(function(){
//            $field.remove();
//         }, 200);
//        } else {return;}
//     }

//   });
// }

// checkList();

// let nameTask == inbox.value;

// let task = {
//     nameTask: "",
//     category: "",
//     contextTask: "",
//     dateTask: "",
//     stages:[]
// }

// let stage = {
//   nameStage: "",
//   contextStage: "",
//     dateStage: "",
// }



// function generateInboxList() {
//     arrayInbox.push(inbox.value);
//     console.log(arrayInbox);
//     placeInboxList.innerHTML += `<li class="inbox__listItem listItem">


//     <div class="inbox__inputfield">
//       <label class="inbox__check check">
//         <input type="checkbox" class="inbox__input-check"/>
//         <span class="inbox__checkmark checkmark"></span>
//       </label>
//     </div>



//     <div class="inbox__item">${inbox.value}</div>
//     <button class="inbox__btn-edit btn">
//       <img
//         class="header__buttonpic-edit"
//         src="./assets/images/pencil_white.png"
//         alt="logo_white"
//       />
//     </button>
//     <button class="inbox__btn-delite btn" onclick="InboxDelite()">
//       <img
//         class="header__buttonpic"
//         src="./assets/images/delite_white.png"
//         alt="logo_white"
//       />
//     </button>
//   </li>`

//   inbox.value = "";
//   console.log(buttonInboxEdit);
// }

// const objInbox = {
//   name: inbox.value,
//   type: "",
//   category: "",
//   context: "",
//   date: "",
// id:"",

//     }

// function InboxDelite() {
//     inboxItem.innerHTML = null;
// }
// placeInboxList

// function Storage() {
//   this._ITEMS_DESCRIPTOR = 'items'; // Я полагаю, ключ по умолчанию?
// }
// // let key будет указан при вызове метода, или по умолчанию устанавливается в the private property _ITEMS_DESCRIPTOR
// Storage.prototype.get = function(key) {
//   var fromStorage = localStorage.getItem(key  ? key : this._planerTaskObjId);
//   return fromStorage ? JSON.parse(fromStorage) : [];
// };
// Storage.prototype.set = function(key, items) {
//   localStorage.setItem(key, JSON.stringify(items));