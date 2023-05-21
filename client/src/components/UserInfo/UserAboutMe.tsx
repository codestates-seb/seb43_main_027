import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const UserAboutMe = () => {

  const [ isAboutMeText, setIsAboutMeText ] = useState<string>('');
  const { memberId } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/members/${memberId}/profile`);
        const fetchedAboutMe = res.data.data.aboutMe;
        setIsAboutMeText(fetchedAboutMe);

      } catch (error) {
        console.log(error);
      };
    };

    fetchUserData();
  } , [memberId]);

  if (isAboutMeText === null) {
    setIsAboutMeText('아직 작성한 소개글이 없습니다.');
  };

  return (
    <StyledWrapper>
      { isAboutMeText }
    </StyledWrapper>
  );
};

export default UserAboutMe;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  background-color: #fff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  padding: 50px;
  border-radius: 15px;
  word-break: keep-all;
  overflow-wrap: break-word;
`;