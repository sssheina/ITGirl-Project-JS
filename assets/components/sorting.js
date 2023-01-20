const titleCategory = document.querySelector(".category-sorting__sort");
const titleContext = document.querySelector(".contexts__sort");

addEventListener('DOMContentLoaded', () => {
  const arrTasks = getLocStorage("editedTasks");

  if (window.location.href.split('/').at(-1) == "10_category_sorting.html?category-home") {
    sortByCategory(arrTasks, 'Дом');
  }
  else if (window.location.href.split('/').at(-1) == "10_category_sorting.html?category-study") {
    sortByCategory(arrTasks, 'Учеба');
  }
  else if (window.location.href.split('/').at(-1) == "10_category_sorting.html?category-work") {
    sortByCategory(arrTasks, 'Работа');
  }
  else if (window.location.href.split('/').at(-1) == "10_category_sorting.html?category-selfimprovment") {
    sortByCategory(arrTasks, 'Саморазвитие');
  }
  else if (window.location.href.split('/').at(-1) == "10_category_sorting.html?category-health") {
    sortByCategory(arrTasks, 'Здоровье');
  }
  else if (window.location.href.split('/').at(-1) == "10_category_sorting.html?category-rest") {
    sortByCategory(arrTasks, 'Отдых');
  }
  else if (window.location.href.split('/').at(-1) == "10_category_sorting.html?category-hobby") {
    sortByCategory(arrTasks, 'Хобби');
  }
  else if (window.location.href.split('/').at(-1) == "10_category_sorting.html?category-ideas") {
    sortByCategory(arrTasks, 'Идеи');
  }
  else if (window.location.href.split('/').at(-1) == "10_category_sorting.html?category-household") {
    sortByCategory(arrTasks, 'Хозяйство');
  }
  else if (window.location.href.split('/').at(-1) == "10_category_sorting.html?category-sport") {
    sortByCategory(arrTasks, 'Спорт');
  }
  else if (window.location.href.split('/').at(-1) == "10_category_sorting.html?category-selfcare") {
    sortByCategory(arrTasks, 'Уход за собой');
  }

  if (window.location.href.split('/').at(-1) == "12_context_sorting.html?context-tel") {
    sortByContext(arrTasks, 'Телефон');
  }
  else if (window.location.href.split('/').at(-1) == "12_context_sorting.html?context-home") {
    sortByContext(arrTasks, 'Дом');
  }
  else if (window.location.href.split('/').at(-1) == "12_context_sorting.html?context-outside") {
    sortByContext(arrTasks, 'Вне дома');
  }
  else if (window.location.href.split('/').at(-1) == "12_context_sorting.html?context-school") {
    sortByContext(arrTasks, 'Школа');
  }
  else if (window.location.href.split('/').at(-1) == "12_context_sorting.html?context-kindergarden") {
    sortByContext(arrTasks, 'Детсад');
  }
  else if (window.location.href.split('/').at(-1) == "12_context_sorting.html?context-computer") {
    sortByContext(arrTasks, 'Компьютер');
  }
  else if (window.location.href.split('/').at(-1) == "12_context_sorting.html?context-minsk") {
    sortByContext(arrTasks, 'Минск');
  }
  else if (window.location.href.split('/').at(-1) == "12_context_sorting.html?context-in-town") {
    sortByContext(arrTasks, 'Город');
  }
  else if (window.location.href.split('/').at(-1) == "12_context_sorting.html?context-delegated") {
    sortByContext(arrTasks, 'Делегировано');
  }

});

function sortByCategory(tasks, category) {
  const arr = tasks.filter(el => el.category === `${category}`);
  titleCategory.textContent = category;
  insertTasks(arr);
}

function sortByContext(tasks, context) {
  const arr = tasks.filter(el => el.context === `${context}`);
  titleContext.textContent = context;
  title.textContent = context;
  insertTasks(arr);
}