import React from 'react';
import styled from 'styled-components';
import GameTitle from '../layouts/GameChannel/GameTitle';
import FilterTap from '../components/common/FilterTap';
import CreateChannelButton from '../components/ui/CreateChannelButton';
import SelectTag from '../components/common/SelectTag';
import PostList from '../layouts/GameChannel/PostList';

const GameChannel = ()  => {

  const filterList = ['전체글', '인기순', '조회순', '최신순', '북마크 글', '내가 쓴 글'];
  const optionsTag = [
    { value: '전체', label: '전체' },
    { value: '모집', label: '모집' },
    { value: '공략', label: '공략' },
    { value: '완료', label: '완료' },
  ];

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <StyledGameChannelWrapper>
      <StyledGameChannelContain>
        <GameTitle />
        <StyledMainContent>
        <StyledSubContent>
          <SelectTag 
            options={optionsTag}
            onChange={handleChange}
          />
          <CreateChannelButton 
            text='게시글 작성' 
            onClick={() => {console.log('게시글작성페이지로 이동')}}
          />
        </StyledSubContent>
          <FilterTap filterList={filterList} />
          <PostList />
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