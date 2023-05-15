import { useState } from 'react';

import useValidation from './useValidation';
import { useValidationType } from '../types/costomHooksTypes';

/**
 * input 상태를 관리하는 커스텀 훅입니다.
 * @param {string} init - input 창의 초기값 (default: '')
 * @param {string} iputtype - input 창의 유형 
 * @returns {Array} - input 상태, input 값 변경 시 핸들러, input 상태 변경함수, input 창의 유효성
 */
let data;

function useInput(init = '',inputtype:useValidationType) {
  const [value, setValue] = useState(init);
  const [validity, setValidity] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setValue(e.target.value);
    setValidity(useValidation(inputtype,e.target.value)); 
    console.log(validity);
  };
  data = { value, onChange , setValue, validity}
  return data;
}

export default useInput;