/**
 * Реализовать функцию zipObject которая принимает два аргумента:
 *  - первый аргумент массив идентификаторов свойств объекта
 *  - второй аргумент массив значений свойств объекта
 * В качестве результата выполнения функция должна возвращать объект сформированный
 * из идентификаторов и значений полученных на входе
 *
 *
 * Пример:
 *  zipObject(['a', 'b'], [1, 2]);
 *  // => { 'a': 1, 'b': 2 }
 */
export default function zipObject(arrayOfIndexes, arrayOfProperties) {
  if(!Array.isArray(arrayOfIndexes) || !Array.isArray(arrayOfProperties)){
    throw new TypeError('argument should be an array');
  }
  const resultObj = {};
  const length = arrayOfIndexes.length
  let index = 0;
  while (index < length) {
    resultObj[arrayOfIndexes[index]] = arrayOfProperties[index]
    index += 1;
  }

  return resultObj;
}
