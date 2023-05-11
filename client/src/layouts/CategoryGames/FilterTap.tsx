import React, { useState } from 'react';
import styled from 'styled-components';

const FilterTap = ()  => {

  const [activeIndex, setActiveIndex] = useState(0);

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
  };

  const filterItems = ['전체 게임', '인기 게임', '신규 게임'];

  return (
    <StyledTapWrapper>
      <FilterMenu>
        {filterItems.map((item, index) => (
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
  margin: 0px 50px;
  border-bottom: 2px solid #e5e5e5;
  display: flex;
  text-align: center;
  justify-content: left;
  @media screen and (max-width: 650px) {
    justify-content: center;
  }
`;

const FilterMenu = styled.ul`
  max-width: 540px;
  display: flex;
  gap: 10px;
  flex-direction: row;
`;

const FiterItem = styled.li`
  padding: 20px 20px;
  font-size: 18px;
  font-weight: 500;
  color: var(--default-text-color);
  border-bottom: none;
  cursor: pointer;

  &.active {
    color: var(--cyan-dark-500);
    border-bottom: 3px solid var(--cyan-dark-400);
  };
`;