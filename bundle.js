(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const inbox = document.querySelector(".inbox__input");
const inboxButton = document.querySelector(".inbox__button");
const placeInboxList = document.querySelector(".inbox__listItems");
const buttonInboxEdit = document.querySelector(".inbox__btn-edit");
const buttonInboxDelite = document.querySelector(".inbox__btn-delite");
let inboxItem = document.querySelector(".inbox__item");

let arrayInbox = [];

inboxButton.addEventListener("click", generateInboxList);

function generateInboxList() {
    arrayInbox.push(inbox.value);
    console.log(arrayInbox);
    placeInboxList.innerHTML += `<div class="inbox__listItem listItem">
                      

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
  </div>`

  inbox.value = "";
}

function InboxDelite() {
    inboxItem.innerHTML = "";
}
},{}]},{},[1]);
