import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination, EffectCoverflow } from 'swiper';
import { dummyCategoriesGames } from '../../data/dummyCategories';
import { type SwiperBgType, type SwiperInfoType } from '../../types/propsTypes';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

const RecommedGames = () => {

  // todo: 카테고리 아이디에 맞는 추천 게임데이터 받아서 스와이핑하기
  // 1. 모든 게임들 중 인기게임 조회(팔로우많은 게임 30개)중 현재 카테고리 아이디에 맞는 게임 5개만 추려낼지,
  // 2. 아니면 현재 카테고리를 기준으로 모든 게임을 다 받고 팔로우 많은 순 5개를 추려낼지 선택
  // 더미데이터 2로 진행- followerCount 추가데이터 필요함
  // 인기순으로 재정렬해서 5개만 조회하기
  // 데이터가 없을때 디폴트 이미지 보여주기

  const { categoryId } = useParams<{ categoryId: string }>();

  const [ currentSlideIndex, setCurrentSlideIndex ] = useState(0);
  const [ currentText, setCurrentText ] = useState('');
  const [ introduceMode, setIntroduceMode ] = useState(false);
  const [ isLastCurrent, setIsLastCurrent ] = useState(false);

  const filteredGames = dummyCategoriesGames.data
  .filter((game) => game.categories.some((category) => category.categoryId.toString() === categoryId))
  .sort((a, b) => b.followerCount - a.followerCount) // 인기순으로 재정렬
  .slice(0, 5); // 최대 5개까지 저장

  const currentSlide = filteredGames[currentSlideIndex];

  const firstMessage = '인디벗에서 다양한 커뮤니티를 함께 즐겨보세요!';
  const lastMessage = '원하는 게임이 없다면 지금 바로 게임채널을 만들어보세요!';

  useEffect (() => {
    if (currentSlideIndex === 0) {
      setIntroduceMode(true);
      setIsLastCurrent(false);
      setCurrentText(firstMessage);
      return;
    }
    if (currentSlideIndex === filteredGames.length - 1) {
      setIntroduceMode(true);
      setIsLastCurrent(true);
      setCurrentText(lastMessage);
      return;
    } else {
      setIntroduceMode(false);
      setIsLastCurrent(false);
    }
  }, [currentSlide]);

  return (
    <>
    <StyledIntroduceText 
      introduceMode={introduceMode}
      isLastCurrent={isLastCurrent}
      currentSlideIndex={currentSlideIndex}
    >
      <p>{currentText}</p>
    </StyledIntroduceText>
    <StyledContainer backgroundImage={currentSlide.mainImgUrl}>
      <StyledSwiperContainer
        slidesPerView={3}
        freeMode={true}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        effect={'coverflow'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 70,
          modifier: 1.5,
        }}
        modules={[Autoplay, FreeMode, Pagination, EffectCoverflow]}
        onSlideChange={(swiper) => setCurrentSlideIndex(swiper.activeIndex)}
      >
        {
          filteredGames.map((item, index) => (
              <StyledSwiperSlide key={index} >
                <Link to={`/games/${item.gameId}`} >
                <StyledBadge>TOP:{item.gameName}</StyledBadge>
                <StyledSwiperSlideImg 
                  src={item.mainImgUrl}
                  alt='slide_image' 
                />
                </Link>
              </StyledSwiperSlide>
          ))
        }
      </StyledSwiperContainer>
    </StyledContainer>
    </>
  );
};

export default React.memo(RecommedGames);

const StyledContainer = styled.div<SwiperBgType>`
  width: 100%;
  height: 450px;
  background: 
    linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(${(props) => props.backgroundImage});
  background-position: center;
  background-size: cover;
  transition: background-image 1s ease-in-out;
  @media screen and (max-width: 650px) {
    height: 400px;
  }
`;

const StyledIntroduceText = styled.div<SwiperInfoType>`
  display: ${({introduceMode}) => introduceMode ? 'flex' : 'none'};
  flex-direction: column;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
  font-size: 28px;
  font-weight: 700;
  line-height: 1.5;
  color: #fff;
  padding: 30px;
  word-break: keep-all;
  overflow-wrap: break-word;
  animation: slide-up 1s ease-in-out;
  right: ${({isLastCurrent}) => isLastCurrent ? '50px' : ''};
  @keyframes slide-up {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
  @media screen and (max-width: 650px) {
    display: none;
  }
`;

const StyledSwiperContainer = styled(Swiper)`
  width: 100%;
  height: 100%;
  padding: 20px;
  box-shadow: none;
  .swiper-slide-shadow-left,
  .swiper-slide-shadow-right {
    display: none;
  }
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  position: relative; 
  min-height: 240px;
  text-align: center;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledSwiperSlideImg = styled.img`
  width: 100%;
  height: 80%;
  min-width: 250px;
  min-height: 350px;
  object-fit: cover;
  border-radius: 15px;
  cursor: pointer;
  @media screen and (max-width: 650px) {
    min-height: 240px;
  }
`;

const StyledBadge = styled.div`
  position: absolute;
  padding: 10px 20px 10px 15px;
  word-break: keep-all;
  background-color: #fff;
  color: var(--cyan-dark-500);
  font-size: 16px;
  top: 50px;
  left: -30px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  text-align: center;
  font-weight: 700;
  opacity: 0.8;
  @media screen and (max-width: 650px) {
    position: absolute;
    top: 70px;
    left: -60px;
  }
`;