import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import CreateChannelButton from '../ui/CreateChannelButton';
import { dummyCategories } from '../../data/dummyCategories';

const TitleCategory: React.FC = ()  => {

  // 리팩토링 고민: 홈에서 카테고리 클릭시 카테고리정보 리덕스에 저장 후 사용하는 방식으로 구현
  const [ isCurrentCategory, setIsCurrentCategory ] = useState();
  const { categoryId } = useParams<{ categoryId: string }>();
  const memberId = useSelector((state: RootState) => state.user.memberId);
  const navigate = useNavigate();

  // 모든 카테고리 api 사용해서 현재 카테고리의 정보 가져옴
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/categories`);
        const catrgoriesData = res.data;
        const currentCategory = catrgoriesData.find((item: any) => item.categoryId.toString() === categoryId)?.categoryName;

        if (currentCategory) {
          setIsCurrentCategory(currentCategory);
        } else {
          // todo: 404페이지 경로로 이동 시키기
          // return navigate('/');
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  // 더미데이터 테스트 코드
  // const isCurrentCategory = dummyCategories.find(item => item.categoryId.toString() === categoryId)?.categoryName;

  // 리팩토링 고민: 페이지별 중복사용하는 핸들러 함수 모듈화 리팩토링하기
  const handleCreate = () => {
    if (memberId === -1) {
      navigate('/login');
    } else {
      // todo: 게시글 작성페이지로 경로이동
      // return navigate('/');
    };
  };

  return (
    <StyledTitleWrapper>
      <StyledTitleContainer>
        <StyledTitle>
          <StyledTitleName>
            {
              isCurrentCategory
            }
          </StyledTitleName>
          <StyledSubText>
            {
              `${isCurrentCategory} 장르의 다양한 게임 채널들을 살펴보세요!`
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
  font-size: 34px;
  font-weight: 700;
`

const StyledSubText = styled.h3`
  font-size: 16px;
  font-weight: 600;
  word-break: keep-all;
  overflow-wrap: break-word;
  color: var(--sub-text-color);
`;
