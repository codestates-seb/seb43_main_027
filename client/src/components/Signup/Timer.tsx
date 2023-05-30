import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import styled from 'styled-components';

const Timer = () => {
  const cookieTimeKey = 'timer_end_time';
  const initialTime = () => {
    const endTime = Cookies.get(cookieTimeKey);
    if (endTime) {
      const remainingTime = Math.floor(
        (new Date(endTime).getTime() - Date.now()) / 1000
      );
      return remainingTime > 0 ? remainingTime : 0;
    }

    // Set new timer if there is no existing timer in the cookie
    const newTime = 180;
    Cookies.set(
      cookieTimeKey,
      new Date(Date.now() + newTime * 1000).toISOString(),
      { expires: 0.125 }
    );
    return newTime;
  };

  const [time, setTime] = useState(initialTime);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  useEffect(() => {
    if (time <= 0) {
      Cookies.remove(cookieTimeKey);
      return;
    }

    const timer = setTimeout(() => {
      setTime(time - 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [time]);

  return (
    <StyledDiv>
      <StyledSpan>{minutes.toString().padStart(2, '0')}:</StyledSpan>
      <StyledSpan>{seconds.toString().padStart(2, '0')}</StyledSpan>
    </StyledDiv>
  );
};

export default Timer;

const StyledDiv = styled.div`
  font-size: 1.4rem;
  padding-bottom: 1rem;
`;

const StyledSpan = styled.span`
  font-size: 1.4rem;
`;
