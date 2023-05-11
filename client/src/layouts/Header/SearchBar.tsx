import { useRef, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';

import SearchHint from './SearchHint';
import { useNavigate } from 'react-router-dom';

type SubmitEvent =
  | React.FormEvent<HTMLFormElement>
  | React.MouseEvent<HTMLButtonElement>;

const SearchBar = () => {
  const [showHint, setShowHint] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigation = useNavigate();

  const invertShowHint = () => setShowHint((prev) => !prev);

  const onSubmitHandler = (e: SubmitEvent) => {
    e.preventDefault();
    navigation('/search');

    // 입력 완료 시 인풋창을 비우고 포커스아웃한다.
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.blur();
    }
  };
  return (
    <StyledFormContainer onSubmit={onSubmitHandler}>
      <StyledInput
        placeholder='search...'
        onFocus={invertShowHint}
        onBlur={invertShowHint}
        ref={inputRef}
      />
      <StyledSearchButton onClick={onSubmitHandler}>
        <AiOutlineSearch />
      </StyledSearchButton>
      {showHint && <SearchHint />}
    </StyledFormContainer>
  );
};

export default SearchBar;

const StyledFormContainer = styled.form`
  position: relative;
  min-width: 70%;
  @media screen and (max-width: 650px) {
    width: 100%;
  }
`;
const StyledInput = styled.input`
  outline: none;
  padding: 0.8rem 1rem;
  width: 100%;
  font-size: 1.5rem;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
`;
const StyledSearchButton = styled.button`
  position: absolute;
  border: 1px solid #1890ff;
  border-radius: 0 3px 3px 0;
  width: 50px;
  right: 0;
  padding: 0.8rem 1rem;
  height: 35px;
  background-color: var(--cyan-dark-500);
  color: white;
`;