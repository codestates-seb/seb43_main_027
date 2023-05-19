import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import styled from 'styled-components';
import GameTitle from '../components/GameChannel/GameTitle';
import FilterTap from '../components/common/FilterTap';
import CreateChannelButton from '../components/ui/CreateChannelButton';
import SelectTag from '../components/common/SelectTag';
import PostList from '../components/GameChannel/PostList';
import { postOptionTags, optionMapping } from '../data/postOptionTags';
import { gameChannelFilterTab } from '../data/filterTapList';
import PATH_URL from '../constants/pathUrl';

// todo: 버튼 클릭시 경로 설정

const GameChannel = ()  => {

  const { gameId } = useParams();
  const navigate = useNavigate();
  const getMemberData = localStorage.getItem('user');
  const memberData = getMemberData ? JSON.parse(getMemberData) : { memberId: -1 };
  const memberId = memberData.memberId;

  const [ isSelectTag, setIsSelectTag ] = useState<string>('전체');
  const [ isSelectTab, setIsSelectTab ] = useState<string>(gameChannelFilterTab[0]);
  const [ isMappingTag, setIsMappingTag ] = useState<string>('');

  const handleChange = (value: string) => {
    setIsSelectTag(value);
    setIsMappingTag(optionMapping[value]);
  };

  const handleClick = (item: string) => {
    setIsSelectTab(item);
  };

  const handleCreate = () => {
    if (memberId === -1) {
      navigate('/login');
    } else {
      navigate(`${PATH_URL.GAME}${gameId}${PATH_URL.POSTING}`);
    }
  };

  return (
    <StyledGameChannelWrapper>
      <StyledGameChannelContain>
        <GameTitle />
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
            isSelectTag={isSelectTag}
            isSelectTab={isSelectTab}
            isMappingTag={isMappingTag}
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