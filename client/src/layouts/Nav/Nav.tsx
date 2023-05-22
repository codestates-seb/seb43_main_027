import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { IoGameControllerOutline } from 'react-icons/io5';
import { AiOutlineUser } from 'react-icons/ai';
import { FaRegBookmark } from 'react-icons/fa';
import { NavItemType } from '../../types/dataTypes';
import NavItem from './NavItem';
import NavContent from './NavContent';
import UserNavItem from './UserNavItem';
import PostItem from '../../components/common/PostItem';

import { NavStateType } from '../../types/propsTypes';
import NavGameCardContainer from './NavGameCardContainer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { closeNav, openNav } from '../../slice/navSlice';

const itemList: NavItemType[] = [
  {
    type: 'user',
    element: <AiOutlineUser />,
    contentElement: UserNavItem
  },
  {
    type: 'bookmark',
    element: <FaRegBookmark />,
    contentElement: PostItem
  },
  {
    type: 'games',
    element: <IoGameControllerOutline />,
    contentElement: NavGameCardContainer
  }
];

const Nav = ({ show, setShow }: NavStateType) => {
  const [selectedInd, setSelectedInd] = useState(0);
  const isOpened = useSelector((s: RootState) => s.nav);
  const dispatch = useDispatch();

  const onClickHandler = (i: number) => () => {
    setSelectedInd(i);
    dispatch(openNav());
    setShow(true);
  };

  const onBackgroundClickHandler = () => dispatch(closeNav());

  useEffect(() => {
    if (!show) dispatch(closeNav());
  }, [show]);

  return (
    <>
      {isOpened && <StyledBackground onClick={onBackgroundClickHandler} />}
      <StyledNav show={show}>
        <StyledStickyBox>
          {itemList.map((item, i) => (
            <NavItem
              key={item.type}
              item={item}
              selected={selectedInd === i}
              onClick={onClickHandler(i)}
            />
          ))}
        </StyledStickyBox>

        {isOpened && (
          <NavContent
            type={itemList[selectedInd].type}
            Content={itemList[selectedInd].contentElement}
          />
        )}
      </StyledNav>
    </>
  );
};

export default Nav;

const StyledNav = styled.nav<{ show: boolean }>`
  display: ${(props) => (props.show ? 'block' : 'none')};
  position: fixed;
  top: 50px;
  width: 100%;
  height: 50px;
  background-color: #fff;
  z-index: 2;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  @media screen and (min-width: 650px) {
    position: relative;
    display: block;
    width: 50px;
    height: inherit;
    top: 0;
  }
`;
const StyledStickyBox = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  width: 50%;
  gap: 1rem;
  @media screen and (min-width: 650px) {
    flex-direction: column;
    position: sticky;
    width: 50px;
    top: 50px;
    height: 400px;
  }
`;
const StyledBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgba(37, 37, 37, 0.4);
  opacity: 0.5;
`;
