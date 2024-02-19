/*
Задание 3

Дана строка. Необходимо вывести в консоль перевёрнутый вариант. 
Например, "Hello" -> "olleH".
*/
let str = "Hello";
let result = str.split('').reverse('').join('');

console.log(result);

/*
Задание 4

Записать в переменную случайное целое число в диапазоне [0; 100]. 
Используйте объект Math.
*/
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
getRandomIntInclusive(0, 100);