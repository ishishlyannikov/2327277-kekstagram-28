//Функция для проверки длины строки.
const checkLength = (string, maxSymbols) => string.length <= maxSymbols;
checkLength('yesterday',5);

//Функция для проверки, является ли строка палиндромом.
const checkPalindrome = (string) => {
  const stringRegister = string.toLowerCase();
  let invertedString = '';
  for (let i = stringRegister.length - 1; i >= 0; i--) {
    if (invertedString[i] !== ' ') {
      invertedString += stringRegister[i];
    }
  }
  return invertedString === stringRegister;
};
checkPalindrome('moM');

//Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
//Если в строке нет ни одной цифры, функция должна вернуть NaN:
const checkNumber = (string) => {
  let emptyString = '';
  for (let i = 0; i <= string.length; i++) {
    const parsedString = parseInt(string[i], 10);
    if (!Number.isNaN(parsedString)) {
      emptyString += parsedString;
    }
  }
  return emptyString;
};
checkNumber('09йг3ризтий03=3+т034.2');

//Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами — и возвращает исходную строку,
//дополненную указанными символами до заданной длины. Символы добавляются в начало строки.
//Если исходная строка превышает заданную длину, она не должна обрезаться. Если «добивка» слишком длинная, она обрезается с конца.
const addSymbols = (string, minLength, addedSymbols) => {
  while (string.length < minLength) {
    string = addedSymbols.slice(0, minLength - string.length) + string;
  }
  return string;
};
addSymbols('qwerty', 4, '0');
