/**
 * 유효성 검사를하는 커스텀 훅입니다.
 * @param {string} value - input 창의 입력값.
 * @param {string} validationFunction - 유효성 검사하는 함수
 * @returns {Boolean} - validity:유효성 검사 통과했는지 여부
 */

import { ValidationFunction } from '../types/customHooksTypes';

function useValidation(value: any, validationFunction: ValidationFunction) {
  if (validationFunction) return validationFunction(value);
  return false;
}

export default useValidation;
