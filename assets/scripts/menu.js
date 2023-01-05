// показывает выбранный пункт меню
const li = document.querySelectorAll('.menu__item');

li.forEach(el => {
  el.addEventListener('click', function () {
    removeClassSelected()
    el.classList.add('menu__item_selected')
  });
});

function removeClassSelected() {
  li.forEach(el => {
    el.classList.remove('menu__item_selected')
  })
}

// открывает под-меню
const submenu = document.querySelectorAll('.menu__item_with_submenu');

submenu.forEach(el => {
  el.addEventListener('click', function () {
    removeAll2()
    el.classList.add('menu__item_submenu_selected')
  });
});

function removeAll2() {
  submenu.forEach(el => {
    el.classList.remove('menu__item_submenu_selected')
  })
}