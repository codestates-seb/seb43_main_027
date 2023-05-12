import React, { useState } from 'react';
import styled from 'styled-components';

const FilterTap = ({ filterList }: { filterList: string[]})  => {

  // todo: 클릭한 상태값 담아서 내보내기

  const [activeIndex, setActiveIndex] = useState(0);

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <StyledTapWrapper>
      <FilterMenu>
        {filterList.map((item, index) => (
          <FiterItem
            key={index}
            className={activeIndex === index ? 'active' : ''}
            onClick={() => handleItemClick(index)}
          >
            {item}
          </FiterItem>
        ))}
      </FilterMenu>
    </StyledTapWrapper>
  );
};

export default FilterTap;

const StyledTapWrapper = styled.div`
  margin: 0px;
  border-bottom: 2px solid #e5e5e5;
  display: flex;
  justify-content: left;
  width: 100%;
  @media screen and (max-width: 650px) {
    justify-content: center;
  }
`;

const FilterMenu = styled.ul`
  width: 100%;
  display: flex;
  gap: 10px;
  flex-direction: row;
  @media screen and (max-width: 650px) {
    justify-content: center;
  }
`;

const FiterItem = styled.li`
  padding: 15px 15px;
  font-size: 14px;
  font-weight: 500;
  color: var(--default-text-color);
  border-bottom: none;
  cursor: pointer;

  &.active {
    color: var(--cyan-dark-500);
    border-bottom: 3px solid var(--cyan-dark-400);
  };
  @media screen and (max-width: 650px) {
    font-size: 12px;
    padding: 20px 15px;
  }
`;