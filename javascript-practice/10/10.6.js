/*
Задание 6

Дан массив. Проверить, одинаковые ли элементы в массиве и вывести результат
 true или false в консоль. Речь идёт не о двух рядом стоящих одинаковых 
 элементах, а обо всех. Проверить, все ли элементы в массиве одинаковые.
*/
function similar(arr) {
    for(var i = 0; i < arr.length - 1; i++) {
        if(arr[i] !== arr[i+1]) {
            return false;
        }
    }
    return true;
}
var arr = [3, 3, 4];
similar(arr);

/*
Задание 7

Дан массив. Нужно вывести в консоль количество чётных и нечётных элементов в 
массиве. Если в массиве есть нулевой элемент, то он учитывается и выводится отдельно. 

При выполнении задания необходимо учесть, что массив может содержать не только числа,
но и, например, знаки, null и так далее.
*/
let countArr = [3, 6, 7, 5, 4, 3, null, 's', 'f'];
let evenNumbers = 0;
let oddNumbers = 0;
let otherValue = 0;

for (let i = 0; i < countArr.length; i++) {
    if ((countArr[i] === 0) || (typeof(countArr[i]) != 'number')) {
        otherValue++;
    } else {
        if (countArr[i] % 2 === 0) {
            evenNumbers++;
        } else {
            oddNumbers++;
        }
    }
}
console.log("Количество четных " + evenNumbers);
console.log("Количество нечетных " + oddNumbers);
console.log("Другие значения " + otherValue);