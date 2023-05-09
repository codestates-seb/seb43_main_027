import styled from 'styled-components';

import { NavItemType } from '../../types/dataTypes';

type NavItemPropsType = {
  item: NavItemType;
  selected: boolean;
  onClick: () => void;
};

const NavItem = ({ item, selected, onClick }: NavItemPropsType) => {
  return (
    <StyledNavItem selected={selected} onClick={onClick}>
      {item.element}
    </StyledNavItem>
  );
};

export default NavItem;

const StyledNavItem = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => (props.selected ? 'var(--cyan-dark-500)' : '#8c8c8c')};
  background-color: ${(props) =>
    props.selected ? 'var(--cyan-light-100)' : '#fff'};
  width: 100%;
  border-bottom: ${(props) =>
    props.selected ? '2px solid var(--cyan-dark-500)' : 'none'};
  aspect-ratio: 1/1;
  font-size: 2rem;
  cursor: pointer;

  transition: background-color 0.5s;

  @media screen and (min-width: 650px) {
    border-right: ${(props) =>
      props.selected ? '2px solid var(--cyan-dark-500)' : 'none'};
    border-bottom: none;
  }
`;
