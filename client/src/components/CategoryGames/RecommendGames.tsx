import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination, EffectCoverflow } from 'swiper';
import PATH_URL from '../../constants/pathUrl';
import { BANNER_MESSAGE } from '../../constants/stringMessage';
import { type GameType } from '../../types/dataTypes';
import { type SwiperBgType, type SwiperInfoType } from '../../types/propsTypes';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import MainBanner from '../../asset/MainBanner.png';
import DefaultGame from '../../asset/DefaultGame.png';

const RecommedGames = () => {

  const { categoryId } = useParams<{ categoryId: string }>();

  const [ currentSlideIndex, setCurrentSlideIndex ] = useState(0);
  const [ currentText, setCurrentText ] = useState('');
  const [ introduceMode, setIntroduceMode ] = useState(false);
  const [ isLastCurrent, setIsLastCurrent ] = useState(false);
  const [ gamesList, setGamesList ] = useState<GameType[]>([]);
  const [ currentSlide, isCurrentSlide ] = useState<GameType | undefined>(undefined);
  const [backgroundImage, setBackgroundImage] = useState(MainBanner);

  useEffect(() => {
    const fetchGamesData = async () => {
      try {
        const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/categories/${categoryId}/games?page=${1}&filter=POPULAR`
        );
        const gamesData = res.data.data;
        const sliceGameList = gamesData.slice(0, 5);
        setGamesList(sliceGameList);
      } catch (error) {
        console.log(error);
      };
    };
    fetchGamesData();
  }, [categoryId]);

  useEffect(() => {
    const filteredGames = gamesList
      .sort((a: { followerCount: number }, b: { followerCount: number }) => b.followerCount - a.followerCount)
      .slice(0, 5);
  
    isCurrentSlide(filteredGames[currentSlideIndex]);
    
  
    if (currentSlideIndex === 0) {
      setIntroduceMode(true);
      setIsLastCurrent(false);
      setCurrentText(BANNER_MESSAGE.FRONT);
      return;
    }
    if (currentSlideIndex === filteredGames.length - 1) {
      setIntroduceMode(true);
      setIsLastCurrent(true);
      setCurrentText(BANNER_MESSAGE.LAST);
      return;
    }
    setIntroduceMode(false);
    setIsLastCurrent(false);
  }, [currentSlideIndex, gamesList]);

  const handleSlideChange = (swiper: any) => {
    setCurrentSlideIndex(swiper.activeIndex);
  };

  const renderGameSlides = () => {
    return gamesList.map((item, index) => {
      const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        event.currentTarget.src = DefaultGame; // 이미지 로드 실패 시 디폴트 이미지로 대체
        setBackgroundImage(DefaultGame);
      };
  
      return (
        <StyledSwiperSlide key={index}>
          <Link to={`${PATH_URL.GAME}${item.gameId}`}>
            <StyledBadge>
              <StyledRecommend>추천 게임: </StyledRecommend>
              {item.gameName}
            </StyledBadge>
            <StyledSwiperSlideImg
              src={item.mainImgUrl}
              alt="slide_image"
              onError={handleImageError} // 이미지 로드 오류 이벤트 핸들러 추가
            />
          </Link>
        </StyledSwiperSlide>
      );
    });
  };

  return (
    <>
    <StyledIntroduceText 
      introduceMode={introduceMode}
      isLastCurrent={isLastCurrent}
      currentSlideIndex={currentSlideIndex}
    >
      <p>{currentText}</p>
    </StyledIntroduceText>
    <StyledContainer backgroundImage={currentSlide?.mainImgUrl || backgroundImage}>
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
        onSlideChange={handleSlideChange}
      >
        {renderGameSlides()}
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
  background-color: var(--cyan-dark-900);
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
  @media screen and (max-width: 1070px) {
    font-size: 18px;
    width: 250px;
  }
  @media screen and (max-width: 950px) {
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
  .swiper-pagination-bullet {
    background-color: var(--cyan-light-300);
    opacity: 0.4;
  }
  .swiper-pagination-bullet-active {
    opacity: 1;
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
  width: 400px;
  height: 350px;
  object-fit: cover;
  border-radius: 15px;
  cursor: pointer;
  background-color: #fff;
  @media screen and (max-width: 650px) {
    width: 250px;
    height: 240px;
  }
`;

const StyledBadge = styled.div`
  position: relative;
  padding: 10px 20px 10px 15px;
  word-break: keep-all;
  background-color: #fff;
  color: var(--cyan-dark-500);
  font-size: 16px;
  top: 50px;
  left: -30px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  text-align: left;
  font-weight: 700;
  opacity: 0.8;
  max-width: 200px;
  overflow-wrap: break-word;
  @media screen and (max-width: 650px) {
    position: absolute;
    top: 70px;
    left: -60px;
  }
`;

const StyledRecommend = styled.p`
  font-size: 13px;
  color: var(--cyan-light-900)
`;