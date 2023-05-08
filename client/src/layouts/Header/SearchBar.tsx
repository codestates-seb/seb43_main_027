import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';
import SearchHint from './SearchHint';
import { useState } from 'react';

const SearchBar = () => {
  const [showHint, setShowHint] = useState(false);

  const invertShowHint = () => setShowHint((prev) => !prev);

  return (
    <StyledContainer>
      <StyledInput
        placeholder='search...'
        onFocus={invertShowHint}
        onBlur={invertShowHint}
      />
      <StyledSearchButton>
        <AiOutlineSearch />
      </StyledSearchButton>
      {showHint && <SearchHint />}
    </StyledContainer>
  );
};

export default SearchBar;

const StyledContainer = styled.div`
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
