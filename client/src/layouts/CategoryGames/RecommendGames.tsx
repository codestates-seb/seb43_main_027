import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperInstance, { Autoplay, FreeMode, Pagination, EffectCoverflow } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

interface Swiper {
  swiper: SwiperInstance;
}

type Slide = {
  key: number;
  image: string;
};

interface StyledContainerProps {
  backgroundImage: string;
}

interface StyledIntroduceTextProps {
  introduceMode: boolean;
  currentSlideKey: number;
}

const slides: Slide[] = [
  {
    key: 0,
    image: 'https://m.gjcdn.net/game-thumbnail/1000/435648-bcpdubiq-v4.webp'
  },
  {
    key: 1,
    image: 'https://m.gjcdn.net/game-thumbnail/1000/164227-f2fvqeih-v4.webp'
  },
  {
    key: 2,
    image:
      'https://m.gjcdn.net/game-thumbnail/1000/348021-crop10_0_598_331-w5vedzau-v4.webp'
  },
  {
    key: 3,
    image: 'https://m.gjcdn.net/game-thumbnail/1000/352743-an4gjy3v-v4.webp'
  },
  {
    key: 4,
    image: 'https://m.gjcdn.net/game-thumbnail/1000/415163-pm6dqtkg-v4.webp'
  },
];

const RecommedGames = () => {

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [introduceMode, setIntroduceMode] = useState(false);
  const currentSlide = slides[currentSlideIndex];

  const firstMessage = '인디벗에서 다양한 커뮤니티를 함께 즐겨보세요!';
  const lastMessage = '원하는 게임이 없다면 지금 바로 게임채널을 만들어보세요!';

  useEffect (() => {
    if (currentSlide.key === 0) {
      setIntroduceMode(true);
      setCurrentText(firstMessage);
      return;
    }
    if (currentSlide.key === slides[slides.length - 1].key) {
      setIntroduceMode(true);
      setCurrentText(lastMessage);
      return;
    } else {
      setIntroduceMode(false);
    }
  }, [currentSlide]);

  return (
    <>
    <StyledIntroduceText introduceMode={introduceMode} currentSlideKey={currentSlide.key}>
      <p>{currentText}</p>
    </StyledIntroduceText>
    <StyledContainer backgroundImage={currentSlide.image}>
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
        {slides.map((slide) => (
          <StyledSwiperSlide key={slide.key}>
            <StyledBadge>TOP</StyledBadge>
            <StyledSwiperSlideImg src={slide.image} alt='slide_image' />
          </StyledSwiperSlide>
        ))}
      </StyledSwiperContainer>
    </StyledContainer>
    </>
  );
};

export default React.memo(RecommedGames);

const StyledContainer = styled.div<StyledContainerProps>`
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

const StyledIntroduceText = styled.div<StyledIntroduceTextProps>`
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
  right: ${({currentSlideKey}) => currentSlideKey === slides[slides.length - 1].key ? '50px' : ''};
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
  padding: 10px 20px 10px 15px;
  word-break: keep-all;
  background-color: #fff;
  color: var(--cyan-dark-500);
  font-size: 16px;
  position: relative;
  top: -120px;
  left: 50px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  text-align: center;
  font-weight: 700;
  opacity: 0.8;
  @media screen and (max-width: 650px) {
    position: absolute;
    top: 50px;
    left: -60px;
  }
`;