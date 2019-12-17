// Пример программы, в процессе работы которой в браузере строится график


// Параметр - положительное число, количество итерация
const iterCount = parseInt( process.argv[2] );
if (!iterCount) {
    console.warn('iterCount должно быть положительным');
    process.exit(1);
}

// Файл, в котором определяетя диапазон генерации случайного числа
// 1 строка - минимальное число для генерации
// 2 строка - максимальное число для генерации
const fs = require('fs');
const content = fs.readFileSync('input.txt', 'utf8');

const min = parseInt( content.split('\n')[0] );
const max = parseInt( content.split('\n')[1] );

if (!min || !max || min > max) {
    console.warn('min и max должны быть числами, причем min > max');
    process.exit(1);
}

const sleep = function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const run = async function(iterCount, min, max) {
    let sum = 0;

    for (let i = 0; i < iterCount; i++) {
        const rand = Math.floor(Math.random() * (max - min + 1) + min); // Получаем случайное число
        sum += rand;

        let output = i + '\n'; // На первой строке - номер текущей итерации
        output +=  sum + '\n'; // На второй строке - текущее случайное число

        output += i    + '\n'; // На третьей строке   - номер текущей итерации (для графика)
        output += rand + '\n'; // На четвертой строке - текущее случайное число

        process.stdout.write(output);

        await sleep(1000);
    }

    fs.writeFileSync('output.txt', sum);

    /* COMPLITE - Магическое слово, которое говорит о завершении работы программы                          *
     * После этого слова идут данные, которые будут представлены в соответствии с output-данными в конфиге */
    process.stdout.write(`COMPLITE\n${iterCount}`);
}

run(iterCount, min, max);