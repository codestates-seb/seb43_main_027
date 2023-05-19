import { useState } from 'react';
import useValidation from './useValidation';
import { ValidationFunction } from '../types/customHooksTypes';

/**
 * input 상태를 관리하는 커스텀 훅입니다.
 * @param {string} init - input 창의 초기값 (default: '')
 * @param {function extraActionWithValue((params:string) {}:void)} - e.target.value를 store에 저장하는 등 e.target.value로 필요한 추가적인 액션을 하는 void 함수
 * @param {function customValidationFunction((params:string) {}:boolean)} - e.target.value의 유효성 검사를 진행할 함수
 * @returns {Object} - input value(상태), input에서 작동할 onChangehandler, input 창의 유효성검사 결과
 */

function useInput(init = '', extraActionWithValue?:(value:string)=>void ,
                  customValidationFunction?:ValidationFunction) {
  const [value, setValue] = useState(init);
  const [validity, setValidity] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.stopPropagation();
    setValue(e.target.value);
    if (customValidationFunction) {
      const validationResult = useValidation(e.target.value,customValidationFunction)
      if(validationResult) setValidity(validationResult);
    }
    if (extraActionWithValue) extraActionWithValue(e.target.value);
    console.log(validity);
  };

  return { value, onChange, validity}
}

export default useInput;
