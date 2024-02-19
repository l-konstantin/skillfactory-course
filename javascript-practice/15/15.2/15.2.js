/*
Задание 15.2

Сверстайте кнопку, клик на которую будет выводить данные о размерах экрана с помощью alert.
*/
function widthHeight() {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    alert("Ширина экрана: " + screenWidth + ", " + "Высота экрана: " + screenHeight);
}