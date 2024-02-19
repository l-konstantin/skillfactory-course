/*
Задание 15.3

Реализовать чат на основе эхо-сервера wss://echo-ws-service.herokuapp.com.
Интерфейс состоит из input, куда вводится текст сообщения, и кнопки «Отправить».

При клике на кнопку «Отправить» сообщение должно появляться в окне переписки.

Эхо-сервер будет отвечать вам тем же сообщением, его также необходимо выводить в чат:

Добавить в чат механизм отправки геолокации:

При клике на кнопку «Геолокация» необходимо отправить данные серверу и вывести в чат 
ссылку на https://www.openstreetmap.org/ с вашей геолокацией. Сообщение, которое отправит 
обратно эхо-сервер, выводить не нужно.
*/

const wsUrl = "wss://echo-ws-service.herokuapp.com";

const infoOutput = document.querySelector(".info-output");
const output = document.getElementById("output");
const btnSend = document.querySelector('.chat-button');
const mapLink = document.querySelector('#map-link');
const status = document.querySelector("#status");

let webSocket;

function writeToScreen(message) {
    let pre = document.createElement("p");
    pre.style.wordWrap = "break-word";
    pre.innerHTML = message;
    output.appendChild(pre);
}

websocket = new WebSocket(wsUrl);

btnSend.addEventListener('click', () => {
    let input = document.getElementById("input").value;
    websocket.onmessage = function(evt) {
        writeToScreen('<p class="message-text">Сервер: ' + evt.data + mapLink + '</p>');
    };

    let message = input;
    writeToScreen('<p class="message-text">' + "Пользователь: " + message + '</p>');
    websocket.send(message);
});

mapLink.addEventListener("click", () => {
    mapLink.href = '';
    mapLink.textContent = '';

    if ("geolocation" in navigator) {
        status.textContent = 'Определение местоположения...';
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        status.textContent = 'Geolocation не поддерживается вашим браузером';
    }
});

const error = () => {
    status.textContent = 'Невозможно получить ваше местоположение';
}

const success = (position) => {
    console.log('position', position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = `${latitude}, ${longitude}`;
    mapLink.href = `https://www.openstreetmap.org/#map=40/${latitude}/${longitude}`;
    mapLink.textContent = 'Ссылка на карту';
}