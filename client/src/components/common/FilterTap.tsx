import React, { useState } from 'react';
import styled from 'styled-components';

type Props = {
  filterList: string[];
  onClickFilter: (item: string) => void;
};

const FilterTap = ({ filterList, onClickFilter }: Props)  => {

  const [activeIndex, setActiveIndex] = useState(0);

  const handleItemClick = (item: string, index: number) => {
    setActiveIndex(index);
    onClickFilter(item);
  };

  return (
    <StyledTapWrapper>
      <FilterMenu>
        {filterList.map((item, index) => (
          <FiterItem
            key={index}
            className={activeIndex === index ? 'active' : ''}
            onClick={() => handleItemClick(item, index)}
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
    padding: 20px 10px;
  }
`;