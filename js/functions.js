//Функция для проверки длины строки. Она принимает строку, которую нужно проверить, и максимальную длину и возвращает true,
//если строка меньше или равна указанной длине, и false, если строка длиннее
const stringCheck = (string, maxSymbols) => string.length <= maxSymbols;
stringCheck('yesterday',5);

//Функция для проверки, является ли строка палиндромом. Палиндром — это слово или фраза, которые одинаково читаются и слева направо и справа налево.
const palindromeCheck = (string) => {
  const stringRegister = string.toLowerCase();
  let invertedString = '';
  for (let i = stringRegister.length - 1; i >= 0; i--) {
    if (invertedString[i] !== ' ') {
      invertedString += stringRegister.at(i);
    }
  }
  console.log(invertedString);
  return invertedString === stringRegister;
};
palindromeCheck('улыбок тебе дед Макар');

//Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
//Если в строке нет ни одной цифры, функция должна вернуть NaN:
const numberCheck = (string) => {
  let emptyString = '';
  for (let i = 0; i <= string.length; i++) {
    if (!Number.isNaN(parseInt(string.at(i), 10))) {
      emptyString += parseInt(string.at(i), 10);
    }
  }
  return emptyString;
};
numberCheck('1.5');
