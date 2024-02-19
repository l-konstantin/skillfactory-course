/*
Задание 8

Создайте произвольный массив Map. Получите его ключи и выведите в консоль все значения 
в виде «Ключ — Х, значение — Y».

Используйте шаблонные строки.
*/
let map = new Map([
    ['firstname', 'Igor'],
    ['lastname', 'Ivanov'],
    ['profession', 'frontend']
]);

map.forEach(function(Y, X){
    console.log('X - ' + X + ', Y - ' + Y);
});