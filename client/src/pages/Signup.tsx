import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import SignupFieldsContainer from '../components/Signup/SignupFieldsContainer';
import SignupTopWrapper from '../components/Signup/SignupTopWrapper';
import SignupOauthContainer from '../components/Signup/SignupOauthContainer';
import SignupButtonsContainer from '../components/Signup/SignupButtonsContainer';
import SignupModal from '../components/Signup/SignupModal';
import SignupFailModal from '../components/Signup/SignupFailModal';
import SignupErrorModal from '../components/Signup/SignupErrorModal';
import SignupConfirmModal from '../components/Signup/SignupConfirmModal';

import oauthSignup from '../utils/OauthSignUpFunction';

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setSignupValidity } from '../slice/signupValiditySlice';
import { RootState } from '../store/store';

const Signup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenFail, setIsOpenFail] = useState(false);
  const [isOpenError, setIsOpenError] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const userinfo = useSelector((state: RootState) => state.user);
  const signupinfo = useSelector((state: RootState) => state.signup);
  const emailconfirmed = useSelector(
    (state: RootState) => state.signupvalid.emailconfirmed
  );

  const emailSignup: React.MouseEventHandler = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!emailconfirmed) {
      try {
        await axios
          .post(
            `${process.env.REACT_APP_API_URL}/api/email?email=${signupinfo.email}`,
            {
              email: signupinfo.email
            },
            {
              headers: {
                'ngrok-skip-browser-warning': '69420'
              }
            }
          )
          .then(() => {
            console.log('1단계 성공');
            return setIsOpenConfirm(true);
          });
      } catch (error: any) {
        // 오류에 따라서 필요하면 다른 모달 제작... ㅠ
        if (error.response && error.response.status === 409) {
          setIsOpenFail(true);
        } else {
          setIsOpenError(true);
        }
      }
      return setIsOpenConfirm(true);
    }

    try {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/api/members/signup`, {
          username: signupinfo.username,
          email: signupinfo.email,
          password: signupinfo.password
        })
        .then(() => {
          setIsOpen(true);
        });
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        setIsOpenFail(true);
      } else {
        setIsOpenError(true);
      }
    }
  };

  useEffect(() => {
    if (userinfo.memberId !== -1) {
      navigation('/');
    }
  }, [userinfo]);

  const modalClose = () => {
    navigation('/login');
  };
  const modalCloseFail = () => {
    setIsOpenFail(false);
  };
  const modalCloseError = () => {
    navigation('/error');
  };
  const modalCloseConfirm = async (value: string) => {
    try {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/api/email/confirm`, {
          email: signupinfo.email,
          code: value
        })
        .then(() => {
          setIsOpenConfirm(false);
          dispatch(setSignupValidity({ key: 'emailconfirmed', value: true }));
        });
    } catch (error: any) {
      // 여기는 인증번호를 똑바로 입력하라는 모달 있어야함.
      if (error.response && error.response.status === 409) {
        setIsOpenFail(true);
      } else {
        setIsOpenError(true);
      }
    }
  };

  return (
    <StyledSignupContainer>
      {isOpen && (
        <SignupModal
          isOpen={isOpen}
          confirmMessage={'저희의 친구가 되주셔서 감사합니다!'}
          closeHandler={modalClose}
        />
      )}
      {isOpenFail && (
        <SignupFailModal
          isOpen={isOpenFail}
          confirmMessage={'이미 사용중인 닉네임,또는 아이디입니다.'}
          closeHandler={modalCloseFail}
        />
      )}
      {isOpenError && (
        <SignupErrorModal
          isOpen={isOpenError}
          confirmMessage={'알 수 없는 오류가 발생했습니다.'}
          closeHandler={modalCloseError}
        />
      )}

      <StyledSignupFormWrapper>
        {/* top - component */}
        <SignupTopWrapper />
        {/* Form - component */}
        <StyledSignupFormContainer>
          {/* Oauth - component */}
          <SignupOauthContainer onClick={oauthSignup} />
          {/* Input - components */}
          <SignupFieldsContainer />
          {/* Button - components */}
          {isOpenConfirm ? (
            <SignupConfirmModal
              isOpen={isOpenConfirm}
              confirmMessage={'인증번호:'}
              closeHandler={modalCloseConfirm}
            >
              <SignupButtonsContainer onClick={emailSignup} />
            </SignupConfirmModal>
          ) : (
            <SignupButtonsContainer onClick={emailSignup} />
          )}
        </StyledSignupFormContainer>
      </StyledSignupFormWrapper>
    </StyledSignupContainer>
  );
};

export default Signup;

const StyledSignupContainer = styled.div`
  flex: 1 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`;

const StyledSignupFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .cover {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  p {
    font-size: 1.6rem;
    margin: 0.3rem;
    white-space: nowrap;
  }
`;

const StyledSignupFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 85%;

  @media screen and (max-width: 650px) {
    width: 70%;
  }
`;
