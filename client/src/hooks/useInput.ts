import { useState } from 'react';

/**
 * input 상태를 관리하는 커스텀 훅입니다.
 * @param {*} init - input 창의 초기값 (default: null)
 * @returns {Array} - input 상태, input 값 변경 시 핸들러, input 상태 변경함수
 */
let data;

function useInput(init = '') {
  const [value, setValue] = useState(init);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    console.log(value);
  };
  data = { value, onChange , setValue}
  return [data];
}

export default useInput;