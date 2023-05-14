import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import GameTitle from '../layouts/GameChannel/GameTitle';
import FilterTap from '../components/common/FilterTap';
import CreateChannelButton from '../components/ui/CreateChannelButton';
import SelectTag from '../components/common/SelectTag';
import PostList from '../layouts/GameChannel/PostList';
import postOptionTags from '../data/postOptionTags';
import { gameChannelFilterTab } from '../data/filterTapList';

const GameChannel = ()  => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [ isSelectTag, setIsSelectTag ] = useState<string>('전체');
  const [ isSelectTab, setIsSelectTab ] = useState<string>(gameChannelFilterTab[0]);
  const memberId = useSelector((state: RootState) => state.user.memberId);

  const handleChange = (value: string) => {
    setIsSelectTag(value);
  };

  const handleClick = (item: string) => {
    setIsSelectTab(item);
  };

  const handleCreate = () => {
    if (memberId === -1) {
      navigate('/login');
    } else {
      // 게시글 작성페이지로 경로이동
      // navigate('/');
      console.log('게시글 작성페이지로 이동');
    }
  };

  return (
    <StyledGameChannelWrapper>
      <StyledGameChannelContain>
        <GameTitle gameId={id} />
        <StyledMainContent>
        <StyledSubContent>
          <SelectTag 
            options={postOptionTags}
            onChange={handleChange}
          />
          <CreateChannelButton 
            text='게시글 작성' 
            onClick={handleCreate}
          />
        </StyledSubContent>
          <FilterTap
            filterList={gameChannelFilterTab}
            onClickFilter={handleClick}
          />
          <PostList 
            gameId={id} 
            isSelectTag={isSelectTag}
            isSelectTab={isSelectTab}
          />
        </StyledMainContent>
      </StyledGameChannelContain>
    </StyledGameChannelWrapper>
  );
};

export default GameChannel;

const StyledGameChannelWrapper = styled.div`
  background-color: var(--page-bg);
  width: 100%;
  flex-grow: 1;
  overflow-x: hidden;
`;

const StyledGameChannelContain = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding: 0px;
  display: flex;
  justify-content: left;
  flex-direction: row;
  gap: 20px;
  @media screen and (max-width: 650px) {
    padding: 30px 0px;
    flex-direction: column;
  }
`;

const StyledMainContent = styled.main`
  display: flex;
  flex-direction: column;
  width: 100vw;
  margin-right: 35px;
  min-height: 511px;
  @media screen and (max-width: 650px) {
    width: 100%;
    margin-right: 0px;
  }
`;

const StyledSubContent = styled.section`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  margin-top: 10px;
  @media screen and (max-width: 650px) {
    width: 90%;
    padding-left: 20px;
    justify-content: left;
    align-items: center;
    & > * {
      margin-top: 0px;
      width: 300px;
    }
    > :last-child {
      background-color: var(--cyan-dark-700);
    }
    > :last-child:hover {
      background-color: var(--button-hover-color);
    }
  }
`;