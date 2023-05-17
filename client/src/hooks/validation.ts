import { validationType } from '../types/utilTypes';

/**
 * 유효성 검사를하는 커스텀 훅입니다.
 * @param {string} inputtype - input 창의 type, username, email, password...etc로 구분.
 * @returns {Boolean} - validity:유효성 검사 통과했는지 여부
 */

const usernameRegExp = /^[가-힣A-Za-z0-9]{2,10}$/;
const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegExp = /^[a-zA-Z0-9!@#$%^&*()_+-={}]{8,16}$/;


const usernameValidityTest = (value:string) => {
  return usernameRegExp.test(value);
}
const emailValidityTest = (value:string) => {
  return emailRegExp.test(value);
}
const passwordValidityTest = (value:string) => {
  return passwordRegExp.test(value);
}


function validation(validationType:validationType,value:string,customValidationFunction?:(value:string)=> boolean):boolean {
  if(validationType === 'username') {
    if(usernameValidityTest(value)) {
      return true;
    }
  }
  if(validationType === 'email') {
    if(emailValidityTest(value)) {
      return true;
    }
  }
  if(validationType === 'password') {
    if(passwordValidityTest(value)) {
      return true;
    }
  }
  if(validationType === 'custom') {
    if(customValidationFunction === undefined) return false;
    if(customValidationFunction(value)) {
      return true;
    }
  }
  if(validationType === 'none') {
    console.log('유효성검사가 없습니다')
  }

  return false;
}

export default validation;