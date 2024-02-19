/*
Задание 1

В прошлом модуле в юните «Циклы» вы выполняли следующее задание:
    Дан массив. Нужно вывести в консоль количество чётных и нечётных элементов 
    в массиве. Если в массиве есть нулевой элемент, то он учитывается и 
    выводится отдельно. 

    При выполнении задания необходимо учесть, что массив может содержать не только 
    числа, но и знаки, например null и так далее.

На этот раз оформите решение в виде функции: постарайтесь дать этой функции 
корректное название, вызовите функцию, проанализируйте синтаксис.
*/
function evenOddCount() {
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
}
evenOddCount();