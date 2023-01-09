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


let arrayInbox = [];
let i = 0;


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
  // buttonEdit.append(imgButtonEdit);
  // buttonDelite.append(imgButtonDelite);

  
  // console.log(block);
  
  return block;
}

// const objInbox = {
//   name: inbox.value,
//   type: "",
//   category: "",
//   context: "",
//   date: "",
// id:"",
  
//     }

function createObject() {
  const objInbox = {
    id: i++,
    name: inbox.value,

      }
      arrayInbox.push (objInbox);
      // for (let i=0; i<)
      
      
}

// objIndex = myArray.findIndex((obj => obj.id == 1))

// function InboxDelite() {
//     inboxItem.innerHTML = null;
// }
// placeInboxList

const addCard = (objItem, ) => {
  const item = createСard(objItem);
  placeInboxList.appendChild(item);
  
}

inboxButton.addEventListener("click", () => {
  const objInbox = {
    name: inbox.value,
      }
      nameModale.textContent = objInbox.name;
      console.log(objInbox);
  createСard();
  addCard();
  createObject();
  console.log(arrayInbox);
  inbox.value = "";
});

// placeInboxList.addEventListener('click', (event) => {
//   if (event.target.classList.placeInboxList('inbox__btn-delite')) {
//     console.log(event.target.parentNode.remove);
//   }
// })

placeInboxList.addEventListener('click', (event) => {
  if (event.target.classList.contains('inbox__btn-delite')) {
    event.target.parentNode.remove();
  }
})

placeInboxList.addEventListener('click', (event) => {
  if (event.target.classList.contains('inbox__btn-edit')) {
    modalWindow.style.display = "block";
    
    // btnClosePopup.onclick = ClosePopup();
  }
})

// const modalButton = document.querySelector('modal__button');
// inboxButton.addEventListener('click', () => {
//   const objInbox = {
//     name: inbox.value,
//   }
// })


// МЕНЮ_________________________________________________________



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

    if(el.classList.contains("menu__item_submenu_selected")) {
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




// let delay_popup = 5000;



// setTimeout(() => {
//   modalWindow.style.display = "block";
// }, delay_popup);


// function ClosePopup() {
//   modalWindow.style.display = "none";
// };
// btnClosePopup.onclick = ClosePopup();

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



