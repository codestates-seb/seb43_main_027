import React from 'react';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import CreateChannelButton from '../../components/ui/CreateChannelButton';
import { dummyCategories } from '../../data/dummyCategories';

const TitleCategory: React.FC = ()  => {

  // todo: 홈에서 카테고리 클릭시 카테고리정보 리덕스에 저장 후 사용하는 방식으로 구현
  const { categoryId } = useParams();
  const memberId = useSelector((state: RootState) => state.user.memberId);
  const navigate = useNavigate();

  const currentCategory = dummyCategories.find(item => item.categoryId.toString() === categoryId);
  if (!currentCategory) {
    // 카테고리가 없을때 404페이지로 이동
    return <div>페이지를 찾을 수 없습니다.</div>
  };

  // todo: 페이지별 중복사용하는 핸들러 함수 모듈화 리팩토링하기
  const handleCreate = () => {
    if (memberId === -1) {
      navigate('/login');
    } else {
      // 게시글 작성페이지로 경로이동
      // navigate('/');
      console.log('게시글 작성페이지로 이동');
    };
  };

  return (
    <StyledTitleWrapper>
      <StyledTitleContainer>
        <StyledTitle>
          <StyledTitleName>
            {
              currentCategory.categoryName
            }
          </StyledTitleName>
          <StyledSubText>
            {
              `${currentCategory.categoryName} 장르의 다양한 게임 채널들을 살펴보세요!`
            }
          </StyledSubText>
        </StyledTitle>
        <CreateChannelButton 
          text={'게임채널 추가'} 
          onClick={handleCreate}
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
