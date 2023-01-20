function getLocStorage() {
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

  if (localStorage.getItem("arrayQuick") === null) {
    arrayQuick = [];
  } else {
    arrayQuick = JSON.parse(localStorage.getItem("arrayQuick"));
  }

  if (localStorage.getItem("arrayProject") === null) {
    arrayProject = [];
  } else {
    arrayProject = JSON.parse(localStorage.getItem("arrayProject"));
  }
  if (localStorage.getItem("arrayReference") === null) {
    arrayReference = [];
  } else {
    arrayReference = JSON.parse(localStorage.getItem("arrayReference"));
  }

  if (localStorage.getItem("arrayWaitingList") === null) {
    arrayWaitingList = [];
  } else {
    arrayWaitingList = JSON.parse(localStorage.getItem("arrayWaitingList"));
  }
}