import { useEffect, useRef, useState } from 'react';
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
import { closeNav, displayNav, openNav } from '../../slice/navSlice';

import Message from '../../pages/Message';
import { stopChat } from '../../slice/chatSlice';
import { TbMessages } from 'react-icons/tb';

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
  },
  {
    type: 'messages',
    element: <TbMessages />,
    contentElement: UserNavItem
  }
];

const Nav = () => {
  const [selectedInd, setSelectedInd] = useState(0);
  const navRef = useRef<HTMLElement | null>(null);

  const { isOpened, isChatOpened, show } = useSelector((s: RootState) => ({
    isOpened: s.nav.isOpened,
    isChatOpened: s.chat.isChat,
    show: s.nav.isDisplayed
  }));

  const [height, setHeight] = useState(0);

  const dispatch = useDispatch();
  const onClickHandler = (i: number) => () => {
    setSelectedInd(i);
    dispatch(openNav());
    dispatch(displayNav());
  };

  const onBackgroundClickHandler = () => {
    dispatch(closeNav());
    dispatch(stopChat());
  };

  useEffect(() => {
    if (!show) {
      dispatch(closeNav());
      dispatch(stopChat());
    }
  }, [show]);

  useEffect(() => {
    const calculateVisibleHeight = () => {
      const element = navRef.current; // ref를 통해 요소 가져오기
      if (element) {
        const rect = element.getBoundingClientRect(); // 요소의 위치와 크기 정보 가져오기
        const windowHeight =
          window.innerHeight || document.documentElement.clientHeight; // 화면의 높이 가져오기

        const navHeight = Math.max(
          0,
          Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0)
        ); // 요소의 보여지는 높이 계산
        setHeight(navHeight);
      }
    };

    calculateVisibleHeight();
  }, [navRef.current, isOpened]);
  return (
    <>
      {isOpened && <StyledBackground onClick={onBackgroundClickHandler} />}
      <StyledNav show={show} ref={navRef}>
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
            navHeight={height}
          />
        )}
        {isChatOpened && <Message />}
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
    position: absolute;
    display: block;
    width: 50px;
    height: calc(100% + 50px);
    top: -50px;
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
    height: fit-content;
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
