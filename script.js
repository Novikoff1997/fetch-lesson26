"use strict";
const button = document.getElementById("button");
const success = document.querySelector(".success");

const debounce = (func, wait) => {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  };
};

const getData = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log("Ошибка: " + error));
};

const sendData = (url, data) => {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      success.textContent = "Данные успешно отправлены! Информация в консоли.";
      console.log("Данные успешно отправлены:");
      console.log(data);
    })
    .catch((error) => console.log("Ошибка: " + error));
};

button.addEventListener(
  "click",
  debounce(() => {
    getData("db.json").then((data) => {
      console.log("Данные успешно получены:");
      console.log(data);
      return sendData("https://jsonplaceholder.typicode.com/posts", data);
    });
  }, 300)
);
