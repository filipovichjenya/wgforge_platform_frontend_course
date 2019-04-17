/**
 * Реализовать метод deepMerge для рекурсивного слияния собственных и унаследованных перечислимых
 * строковых свойств исходного объекта в целевой объект.
 * Свойства исходного объекта, которые разрешаются в undefined, пропускаются,
 * если свойство существует в целевом объекте.
 * Свойства Array и plain Object типа рекурсивно объединяются, свойства других типов из исходного объекта
 * переписывают свойства в объекте назначения либо добавляются если их нету в объекте назначения
 *
 * Пример:
 *
 * const destinationObject = {
 *   students: [{ name: 'Unit 1' }, { name: 'Unit 2'}],
 *   label: 'backend',
 *   count: 1
 * };
 *
 * const sourceObject = {
 *  students: [{ surname: 'Forge 1' }, { surname: 'Forge 2'}],
 *  label: 'frontend'
 * };
 *
 * deepMerge(destinationObject, sourceObject);
 * // => {
 * //       students: [{ name: 'Unit 1', surname: 'Forge 1' }, { name: 'Unit 2', surname: 'Forge 2' }],
 * //       label: 'frontend',
 * //       count: 1
 * //    }
 */
export default function deepMerge(destinationObject, sourceObject) {
  function iterator(object) {

    let keyIndex = 0;
    const arrayKeys = [];
    for (let key in object) {
      arrayKeys.push(key);
    }

    return {
      [Symbol.iterator]: function () {
        return {
          next() {
            return {

              done: keyIndex >= arrayKeys.length,
              value: [arrayKeys[keyIndex], object[arrayKeys[keyIndex++]]]
            }
          }
        }
      }
    }
  }

  for (let [sourceIndex, sourceProp] of iterator(sourceObject)) {
    if (typeof sourceProp === 'undefined' && destinationObject.hasOwnProperty(sourceIndex)) {
            continue;
    } else if (typeof sourceProp === 'object' && sourceProp !== null) {

      destinationObject[sourceIndex] = deepMerge(destinationObject[sourceIndex], sourceProp)
    } else if (typeof destinationObject !== 'undefined') {

      destinationObject[sourceIndex] = sourceProp
    }
  }

  return destinationObject
}

