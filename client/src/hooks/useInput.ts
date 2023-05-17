import { useState } from 'react';
import { useDispatch } from 'react-redux';

import validation from './validation';
import { validationType } from '../types/utilTypes';

import { setSignupInfo } from '../slice/signupSlice';

/**
 * input 상태를 관리하는 커스텀 훅입니다.
 * @param {string} init - input 창의 초기값 (default: '')
 * @param {string} iputtype - input 창의 유형 
 * @returns {Array} - input 상태, input 값 변경 시 핸들러, input 상태 변경함수, input 창의 유효성
 */
let data;

function useInput(init = '',validationType:validationType,customValidationFunction?:(value:string) => boolean) {
  const [value, setValue] = useState(init);
  const [validity, setValidity] = useState(false);

  const dispatch = useDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setValue(e.target.value);
    setValidity(validation(validationType,e.target.value,customValidationFunction));

    //  Signup 관련 store 업데이트
    if(validationType === 'username') dispatch(setSignupInfo({key:'username', value:e.target.value}))
    if(validationType === 'email') dispatch(setSignupInfo({key:'email', value:e.target.value}))
    if(validationType === 'password') dispatch(setSignupInfo({key:'password', value:e.target.value}))
    console.log(validity);
  };
  data = { value, onChange , setValue, validity}
  return data;
}

export default useInput;