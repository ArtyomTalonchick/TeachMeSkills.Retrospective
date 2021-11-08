- [Функциональное программирование](#functional__programming)
- [Стили кода](#code__style)
- [Неизменность (Immutability)](#immutability)
- [Чистые функции](#pure__functions)
  - [Ссылочная прозрачность](#referential__transparency)
- [Запоминание (memoization)](#memoization)
- [Карринг](#curry)
- [Частичное применение](#partial__application)
- [Композиция](#compose)
---
- [Правильный порядок аргументов](#arguments__order)
- [Отладка функциональных композиций](#debugging)



# <a name="functional__programming"></a>  Функциональноe программирование

Цель **функционального программирования** состоит в том, чтобы минимизировать побочные эффекты и разделить функции так, чтобы в случае ошибки ты точно знал, где её найти.


# <a name="code__style"></a>  Стили кода

**Императивный код** - это код, который сообщает компьютеру, что и как делать
```
for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    ...
}
```

**Декларативный код** - это код, который сообщает компьютеру, что делать и что должно происходить; он не говорит машине, как именно это сделать
```
arr.forEach(item => {...});
```


# <a name="immutability"></a>  Неизменность (Immutability)

Неизменность заключается не в изменении состояния, а в **копировании старого** состояния, **изменении новой копии** и **замене старого состояния** новым.


# <a name="pure__functions"></a>  Чистые функции

**Чистая функция** - это функция, которая выводит свои данные основываясь исключительно на свои входные данные и не вызывает побочных эффектов в приложении.

Условия:
- всегда должны возвращать один и тот же вывод при одинаковом вводе
- нет побочных эффектов: не могут ничего изменить вне их самих

Достоинства:
- стабильны
- единообразны
- предсказуемы
- легко тестируемы

Признаки нечистых функций:
- Использование глобального состояния
- Содержит Math.random или запросы на сервер
- Изменяет состояние приложения
  - *Мутирует объект*
- Содержит побочный эффект “внешнего мира”


## <a name="referential__transparency"></a>  Ссылочная прозрачность

**Ссылочная прозрачность** (referential transparency) - обычно определяется как факт, что выражение в программе может быть заменено его значением (или чем-либо, имеющим то же значение) без изменения результата программы. Это подразумевает, что методы всегда должны возвращать одно и то же значение для данного аргумента, не оказывая никакого другого влияния

```
const add = (x, y) => x + y;
add(1, 2); // 3
```


# <a name="memoization"></a>  Запоминание (memoization)

**Запоминание** (memoization) - особый вид кеширования. Он **кеширует** возвращаемое значение **на основе своих параметров**. Таким образом, если параметры совпадают, вместо поиска функции и повторного вычисления возвращаемого значения, выполняется поиск значения. Это может сэкономить ценные вычислительные циклы.

*Чтобы не загрязнять глобальное пространство имен, используется замыкание*

```
const memoizedAdd80WithClosure = () {
  const cache = {};
  return (n) => {
    if (!(n in cache)) {
      console.log('симуляция длительного вычисления');
      cache[n] = n + 80;
    }    
    return cache[n];
  }
}
```


# <a name="curry"></a>  Карринг

*Карринг* (curry) - преобразует функцию с несколькими аргументами в серию функций, каждая из которых принимает один аргумент

```
const multiply = (a, b, c) => a * b * c;
console.log(multiply(1, 2, 3)); // 6

const multiply = a => b => c => a * b * c;
console.log(multiply(1)(2)(3)); // 6
```

Aрность (`arity`):
- `unary` - унарная функция (принимает **один** аргумент)
- `binary` - двоичная функция (принимает **два** аргумент)
- `ternary` - троичная функция (принимает **три** аргумент)
- `quaternary` - четверичная функция (принимает **четыре** аргумент)

*Преобразование функции в серию унарных функций делает исходную функцию очень гибкой, поскольку мы можем применить любое количество аргументов, в данный момент времени*


# <a name="partial__application"></a>  Частичное применение

**Частичное применение** (partial application) - это применение к функции некоторых аргументов и возврат новой функции, в ожидании остальных аргументов.


# <a name="compose"></a>  Композиция

**Композиция** - создание сложной функциональности за счет объединения более простых функций

В некотором смысле, композиция - это вложение функций, каждая из которых передает свой результат в качестве входных данных для другой функции

---

# <a name="arguments__order"></a>  Правильный порядок аргументов

Упорядочивая аргументы функций особым образом, мы позволяем нашим функциям:
- извлечь выгоду из частичного применения
- улучшить возможность повторного использования и использовать их в композиции


Порядок не имеет значения:
```
const map = (cb, array) => array.map(cb);
const map = (array, cb) => array.map(cb);
```

Неправильный порядок аргументов:
```
const map = array => cb => array.map(cb);

const arr = [1, 2, 3, 4, 5];
const double = n => n * 2;

const withArr = map(arr);

console.log(withArr(double));
console.log(withArr(n => n * 3));
```
*Это не дает никакой дополнительной пользы, кроме как вызова метода map непосредственно на массиве*

Правильный порядок аргументов:
```
const map = cb => array => array.map(cb);

const arr = [1, 2, 3, 4, 5];
const double = n => n * 2;

const withDouble = map(double);

console.log(withDouble(arr));
console.log(withDouble([2, 4, 6, 8, 10]));
```
*Можно повторно использовать над другими массивами*

**ПРАВИЛО**
Порядок аргументов от наиболее конкретного до наименее конкретного. Наименее конкретным аргументом в каждом случае всегда будут данные, которые могут быть логическим значением, числом, строкой, объектом, массивом и т.д.

```
const prop = key => obj => obj[key];

const getName = prop("name");

const person = { name: "Alex" };

getName(person);
```



# <a name="debugging"></a>  Отладка функциональных композиций


---
#Источники

[Функциональное программирование](https://frontend-stuff.com/blog/javascript-functional-programming)