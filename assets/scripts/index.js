const inbox = document.querySelector(".inbox__input");
const inboxButton = document.querySelector(".inbox__button");
const placeInboxList = document.querySelector(".inbox__listItems");
const buttonInboxEdit = document.querySelector(".inbox__btn-edit");
const buttonInboxDelite = document.querySelector(".inbox__btn-delite");
let inboxItem = document.querySelector(".inbox__item");

// let nameTask == inbox.value;

let task = {
    nameTask: "",
    category: "",
    context: "",
    stages:[]

}



let arrayInbox = [];

inboxButton.addEventListener("click", generateInboxList);

function generateInboxList() {
    arrayInbox.push(inbox.value);
    console.log(arrayInbox);
    placeInboxList.innerHTML += `<li class="inbox__listItem listItem">
                      

    <div class="inbox__inputfield">
      <label class="inbox__check check">
        <input type="checkbox" />
        <span class="inbox__checkmark checkmark"></span>
      </label>
    </div>

    

    <div class="inbox__item">${inbox.value}</div>
    <button class="inbox__btn-edit btn">
      <img
        class="header__buttonpic"
        src="./assets/images/pencil_white.png"
        alt="logo_white"
      />
    </button>
    <button class="inbox__btn-delite btn" onclick="InboxDelite()">
      <img
        class="header__buttonpic"
        src="./assets/images/delite_white.png"
        alt="logo_white"
      />
    </button>
  </li>`

  inbox.value = "";
  console.log(buttonInboxEdit);
}


function InboxDelite() {
    inboxItem.innerHTML = null;
}

// показывает выбранный пункт меню
const li = document.querySelectorAll('.menu__item');

li.forEach(el => {
  el.addEventListener('click', function () {
    removeClassSelected();
    el.classList.add('menu__item_selected');
  });
});

function removeClassSelected() {
  li.forEach(el => {
    el.classList.remove('menu__item_selected');
  })
};

// открывает под-меню
const submenu = document.querySelectorAll('.menu__item_withSubmenu');

submenu.forEach(el => {
  el.addEventListener('click', function () {
    hideOtherSubmenu();
    el.classList.add('menu__item_submenu_selected');
  });
});

function hideOtherSubmenu() {
  submenu.forEach(el => {
    el.classList.remove('menu__item_submenu_selected');
  })
};

// --------------- МОДАЛЬНОЕ ОКНО -------------

if (window.screen.availWidth < window.screen.availHeight) {
  document.querySelector(".popup__img").src =
    "./assets/images/modal-window_mobile-01.png";
}

let modalWindow = document.getElementById("overlay");
let btnClosePopup = document.getElementById("close");
let delay_popup = 5000;

setTimeout(() => {
  modalWindow.style.display = "block";
}, delay_popup);

btnClosePopup.onclick = () => {
  modalWindow.style.display = "none";
};





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



