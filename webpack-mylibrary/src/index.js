import _ from 'lodash';
import numRef from './ref.json';

export function numToWord(num) {
  return _.reduce(
    numRef,
    (accNum, ref) => {
      return ref.num === num ? ref.word : accNum;
    },
    ''
  );
}

export function wordToNum(word) {
  return _.reduce(
    numRef,
    (accNum, ref) => {
      return ref.word === word && word.toLowerCase() ? ref.num : accNum;
    },
    -1
  );
}