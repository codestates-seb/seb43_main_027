import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperInstance, { EffectCoverflow } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

interface Swiper {
  swiper: SwiperInstance;
}

type Slide = {
  key: number;
  image: string;
};

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
  {
    key: 5,
    image:
      'https://m.gjcdn.net/game-thumbnail/1000/370565-crop0_3_616_350-hhcbzd8r-v4.webp'
  },
  {
    key: 6,
    image: 'https://m.gjcdn.net/game-thumbnail/1000/651214-rpywxctu-v4.webp'
  }
];

const RecommedGames = () => {
  const swiperRef = useRef<Swiper>(null);

  useEffect(() => {
    const swiper = swiperRef.current?.swiper;
    if (!swiper) return;

    const interval = setInterval(() => {
      swiper.slideNext();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <StyledContainer>
      <StyledSwiperContainer
        ref={swiperRef}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5
        }}
        modules={[EffectCoverflow]}
      >
        {slides.map((slide) => (
          <StyledSwiperSlide key={slide.key}>
            <StyledSwiperSlideImg src={slide.image} alt='slide_image' />
          </StyledSwiperSlide>
        ))}
      </StyledSwiperContainer>
    </StyledContainer>
  );
};

export default React.memo(RecommedGames);

const StyledContainer = styled.div`
  font-size: 1.6rem;
  background: var(--cyan-dark-1000);
  scroll-behavior: smooth;
  max-width: 132rem;
  padding: 1rem 1rem;
  margin: 0 auto;

  .swiper {
    z-index: 0;
  }
`;

const StyledSwiperContainer = styled(Swiper)`
  height: 44rem;
  padding: 1rem 0;
  position: relative;
  @media screen and (max-width: 650px) {
    height: 40rem;
  }
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  width: 37rem;
  height: 42rem;
  position: relative;
  @media screen and (max-width: 650px) {
    width: 28rem !important;
    height: 36rem !important;
  }
`;

const StyledSwiperSlideImg = styled.img`
  width: 37rem;
  height: 42rem;
  border-radius: 2rem;
  object-fit: cover;
  cursor: pointer;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1), 0px 6px 6px rgba(0, 0, 0, 0.1);
  filter: drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.1));
  @media (max-width: 650px) {
    width: 28rem !important;
    height: 36rem !important;
  }
`;
