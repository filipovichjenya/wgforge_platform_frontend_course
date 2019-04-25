/**
 * Реализовать функцию cloneDeep которая копирует объекты по значению с любой глубиной вложенности
 */
export default function deepClone(sourceObj, resultObj = {}) {
  function iterator(object) {

    let keyIndex = 0;
    const arrayKeys = Object.keys(object);
    
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

  for (let [sourceIndex, sourceProp] of iterator(sourceObj)) {

    if (typeof sourceProp === 'object' && sourceProp !== null) {

      resultObj[sourceIndex] = sourceProp instanceof Array ? [] : {};
      resultObj[sourceIndex] = deepClone(sourceProp, resultObj[sourceIndex]);
    } else {
      
      resultObj[sourceIndex] = sourceProp;
    }
  }

  return resultObj;
}
//return JSON.parse(JSON.stringify(obj));
