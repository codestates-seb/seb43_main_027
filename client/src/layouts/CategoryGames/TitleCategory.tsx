import React from 'react';
import styled from 'styled-components';
import CreateChannelButton from '../../components/ui/CreateChannelButton';
import dummyCategories from '../../data/dummyCategories';

const TitleCategory: React.FC = ()  => {

  /**
   *  todo: 
   *  1. 현재 URL경로의 카테고리 아이디로 필터링 하기 (필터링) - useParms
   *  2. 채널생성 버튼 클릭시 로그인시에만 생성경로로 이동, 비로그인시엔 로그인페이지로 이동 (라우팅) - onClick이벤트
   *  3. 상수 contant로 빼기 - 텍스트 메세지
   */

  const currentCategory: string = dummyCategories[0].categoryName;

  return (
    <StyledTitleWrapper>
      <StyledTitleContainer>
        <StyledTitle>
          <StyledTitleName>
            {
              currentCategory
            }
          </StyledTitleName>
          <StyledSubText>
            {
              `${currentCategory} 장르의 다양한 게임 채널들을 살펴보세요!`
            }
          </StyledSubText>
        </StyledTitle>
        <CreateChannelButton 
          text={'게임채널 추가'} 
          onClick={() => console.log('로그인 시에만 게임등록 채널로 이동')}
        />
      </StyledTitleContainer>
    </StyledTitleWrapper>
  );
};

export default React.memo(TitleCategory);

const StyledTitleWrapper = styled.div`
  width: 100%;
  background-color: var(--title-bg);
`;

const StyledTitleContainer = styled.div`
  padding: 30px 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  flex-direction: row;
  gap: 10px;
  @media screen and (max-width: 650px) {
    flex-direction: column;
  }
`;

const StyledTitle = styled(StyledTitleContainer)`
  padding: 0px;
  gap: 15px;
  flex-direction: column;
  align-items: flex-start;
  @media screen and (max-width: 650px) {
    align-items: center;
  }
`;

const StyledTitleName = styled.h1`
  font-size: 48px;
  font-weight: 700;
`

const StyledSubText = styled.h3`
  font-size: 20px;
  font-weight: 600;
  word-break: keep-all;
  overflow-wrap: break-word;
  color: var(--sub-text-color);
`;
