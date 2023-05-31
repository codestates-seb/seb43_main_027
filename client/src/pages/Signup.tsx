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
import Loading from '../components/common/Loading';

const Signup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenFail, setIsOpenFail] = useState(false);
  const [isOpenError, setIsOpenError] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [isConfirmSent, setIsConfirmSent] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const userinfo = useSelector((state: RootState) => state.user);
  const signupinfo = useSelector((state: RootState) => state.signup);
  const emailconfirmed = useSelector(
    (state: RootState) => state.signupvalid.emailconfirmed
  );

  const emailSignup: React.MouseEventHandler = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!emailconfirmed && !isConfirmSent) {
      setIsOpenConfirm(true);
      try {
        await axios
          .post(
            `${process.env.REACT_APP_API_URL}/api/email?email=${signupinfo.email}`,
            {
              email: signupinfo.email
            }
          )
          .then(() => {
            setIsConfirmSent(true);
            return setTimeout(() => {
              setIsConfirmSent(false);
            }, 180000);
          });
      } catch (error: any) {
        // 오류에 따라서 필요하면 다른 모달 제작... ㅠ
        if (error.response && error.response.status === 400) {
          setIsConfirmSent(true);
          setIsConfirming(true);
          dispatch(
            setSignupValidity({
              key: 'usernamevalid',
              value: false
            })
          );
        }
        if (error.response && error.response.status === 409) {
          setIsOpenFail(true);
          setIsOpenConfirm(false);
          dispatch(
            setSignupValidity({
              key: 'usernamevalid',
              value: false
            })
          );
        } else {
          setIsOpenError(true);
          dispatch(
            setSignupValidity({
              key: 'usernamevalid',
              value: false
            })
          );
        }
        setIsOpenConfirm(false);
        setIsConfirmSent(false);
      }
    }

    if (emailconfirmed) {
      e.stopPropagation();
      try {
        await axios
          .post(`${process.env.REACT_APP_API_URL}/api/members/signup`, {
            username: signupinfo.username,
            email: signupinfo.email,
            password: signupinfo.password
          })
          .then(() => {
            setIsOpen(true);
            dispatch(
              setSignupValidity({ key: 'emailconfirmed', value: false })
            );
            setIsLoading(false);
          });
      } catch (error: any) {
        if (error.response && error.response.status === 409) {
          setIsOpenFail(true);
          setIsConfirmSent(false);
          setIsOpenConfirm(false);
        } else {
          setIsOpenError(true);
          setIsConfirmSent(false);
        }
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
    setIsLoading(true);
    try {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/api/email/confirm`, {
          email: signupinfo.email,
          code: value
        })
        .then((res) => {
          setIsLoading(false);
          if (res.data === true) {
            setIsConfirmSent(false);
            return dispatch(
              setSignupValidity({ key: 'emailconfirmed', value: true })
            );
          } else if (res.data === false) {
            return alert('인증번호를 확인해주세요');
          }
        });
    } catch (error: any) {
      // 여기는 인증번호를 똑바로 입력하라는 모달 있어야함.
      if (error.response && error.response.status === 409) {
        setIsOpenFail(true);
      } else {
        setIsOpenError(true);
      }
      setIsLoading(false);
    }
  };

  return (
    <>
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
        {isConfirming && (
          <SignupFailModal
            isOpen={isOpenFail}
            confirmMessage={'3분 뒤 이메일 인증 요청을 다시 시도하세요.'}
            closeHandler={modalCloseFail}
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
            <SignupFieldsContainer setIsConfirmSent={setIsConfirmSent} />
            {/* Button - components */}
            <SignupConfirmModal
              isOpen={isOpenConfirm}
              confirmMessage={'인증번호:'}
              closeHandler={modalCloseConfirm}
            >
              <SignupButtonsContainer onClick={emailSignup} />
            </SignupConfirmModal>
          </StyledSignupFormContainer>
        </StyledSignupFormWrapper>
      </StyledSignupContainer>
      {isLoading && <Loading />}
    </>
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
