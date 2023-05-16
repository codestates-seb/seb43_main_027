import { useValidityType } from '../types/customHooksTypes';

/**
 * 유효성 검사를하는 커스텀 훅입니다.
 * @param {string} inputtype - input 창의 type, username, email, password...etc로 구분.
 * @returns {Boolean} - validity:유효성 검사 통과했는지 여부
 */

const usernameRegExp = /^[가-힣A-Za-z0-9]{2,10}$/;
const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegExp = /^[a-zA-Z0-9!@#$%^&*()_+-={}]{8,16}$/;

const usernameValidityTest = (value: string) => {
  return usernameRegExp.test(value);
};
const emailValidityTest = (value: string) => {
  return emailRegExp.test(value);
};
const passwordValidityTest = (value: string) => {
  return passwordRegExp.test(value);
};

function useValidity(inputtype: useValidityType, value: string): boolean {
  if (inputtype === 'username') {
    if (usernameValidityTest(value)) {
      console.log('usernameValidityTest');
      return true;
    }
  }
  if (inputtype === 'email') {
    if (emailValidityTest(value)) {
      console.log('emailValidityTest');
      return true;
    }
  }
  if (inputtype === 'password') {
    if (passwordValidityTest(value)) {
      console.log('passwordValidityTest');
      return true;
    }
  }

  return false;
}

export default useValidity;
