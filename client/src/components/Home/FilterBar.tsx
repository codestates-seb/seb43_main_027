import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '../../store/store';
import { getFilterPath } from '../../data/filterTabList';

const FilterBar = ({
  onClickHandler,
  tab
}: {
  onClickHandler: (i: string) => () => void;
  tab: string;
}) => {
  const user = useSelector((s: RootState) => s.user);
  const tabs = Object.keys(getFilterPath(user.memberId));

  return (
    <StyledContainer>
      <StyledFilterTabContainer>
        {tabs.map((tabName) => (
          <StyledItem
            key={tabName}
            onClick={onClickHandler(tabName)}
            selected={tab === tabName}
          />
        ))}
      </StyledFilterTabContainer>
    </StyledContainer>
  );
};

export default FilterBar;

const StyledContainer = styled.div`
  margin: 0px;
  border-bottom: 2px solid #e5e5e5;
  display: flex;
  justify-content: left;
  width: 100%;
  @media screen and (max-width: 650px) {
    justify-content: center;
  }
`;

const StyledItem = styled.li<{ selected: boolean }>`
  padding: 15px 15px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ selected }) => (selected ? 'var(--cyan-dark-500)' : ' #999')};
  border-bottom: ${({ selected }) =>
    selected ? '3px solid var(--cyan-dark-400)' : 'none'};
  cursor: pointer;

  @media screen and (max-width: 650px) {
    font-size: 12px;
    padding: 20px 15px;
  }
`;

const StyledFilterTabContainer = styled.ul`
  width: 100%;
  display: flex;
  gap: 10px;
  flex-direction: row;
  @media screen and (max-width: 650px) {
    justify-content: center;
  }
`;
