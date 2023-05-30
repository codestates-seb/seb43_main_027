import Label from '../components/elements/Label';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import styled from 'styled-components';

import GameTagsContainer from '../components/GameRegister/GameTagsContainer';
import GameRegisterImageSection from '../components/GameRegister/GameRegisterImageSection';
import GameRegisterModal from '../components/GameRegister/GameRegisterModal';
import GameRegisterFailModal from '../components/GameRegister/GameRegisterFailModal';
import GameRegisterErrorModal from '../components/GameRegister/GameRegisterErrorModal';
import GameTitleModal from '../components/GameRegister/GameTitleModal';
import GameTagModal from '../components/GameRegister/GameTagModal';

import { gameTagInfo } from '../data/gameTags';
import { getData } from '../api/apiCollection';
import convertCategory from '../utils/convertCategory';
const { gameTags, textTranslate } = gameTagInfo;

const GameRegister = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenFail, setIsOpenFail] = useState(false);
  const [isOpenError, setIsOpenError] = useState(false);
  const [isTitle, setIsTitle] = useState(false);
  const [isTag, setIsTag] = useState(false);

  const navigation = useNavigate();
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [url, setUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tagStates, setTagStates] = useState<boolean[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const { gameId } = useParams();

  const titleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const detailOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDetail(e.target.value);
  };
  const urlOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const cancelHandler = () => {
    navigation(-1);
  };

  interface PostDataType {
    gameName: string;
    downloadUrl: string;
    categoryNames: string[];
    description: string;
  }

  const submitFormData = (e: React.FormEvent) => {
    e.preventDefault();
    const isUpdated = !!gameId;
    if (title === '' || tagStates.filter((a) => a === true).length === 0) {
      if (title === '') {
        return setIsTitle(true);
      }
      return setIsTag(true);
    }

    const reducer = (a: number[], c: boolean, i: number) => {
      if (c === true) a.push(i);
      return a;
    };
    const selectedTagsIndex = tagStates.reduce(reducer, []);
    const selectedTags = selectedTagsIndex.map((i) => gameTags[i]);
    const translatedTags = selectedTags.map((i) => textTranslate[i]);
    const postData: PostDataType = {
      gameName: title,
      downloadUrl: url,
      categoryNames: translatedTags,
      description: detail
    };
    const patchData = {
      gameName: title,
      downloadUrl: url,
      categoryNames: translatedTags,
      description: detail
    };

    const formData = new FormData();
    formData.append(
      isUpdated ? 'patch' : 'post',
      new Blob([JSON.stringify(isUpdated ? patchData : postData)], {
        type: 'application/json'
      })
    );

    for (const afile of files) {
      formData.append('file', afile);
    }

    const token = localStorage.getItem('access_token');

    const headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: `${token}` // 토큰을 헤더에 추가
    };

    // formData를 axios를 사용하여 POST합니다.
    if (isUpdated) {
      console.log(patchData);
      axios
        .patch(
          `${process.env.REACT_APP_API_URL}/api/games/${gameId}`,
          formData,
          { headers }
        )
        .then(() => {
          setIsOpen(true);
        })
        .catch((error) => {
          if (error.response && error.response.status === 409) {
            setIsOpenFail(true);
          } else {
            setIsOpenError(true);
          }
        });
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/games`, formData, {
          headers
        })
        .then(() => {
          setIsOpen(true);
        })
        .catch((error) => {
          if (error.response && error.response.status === 409) {
            setIsOpenFail(true);
          } else {
            setIsOpenError(true);
          }
        });
    }
  };

  const modalClose = () => {
    navigation(-1);
  };
  const modalCloseFail = () => {
    setIsOpenFail(false);
  };
  const modalCloseError = () => {
    navigation('/error');
  };
  const modalCloseTitle = () => {
    setIsTitle(false);
  };
  const modalCloseTag = () => {
    setIsTag(false);
  };

  useEffect(() => {
    if (!gameId) return;
    getData(
      `${process.env.REACT_APP_API_URL}/api/games/${gameId}`,
      (res) => {
        console.log(res.data.data);
        setTitle(res.data.data.gameName);
        setDetail(res.data.data.description);
        setUrl(res.data.data.downloadUrl);
        setImageUrl(res.data.data.mainImgUrl);

        const newTags = new Array(gameTags.length).fill(false);
        const categories = res.data.data.categories.map(
          (a: { categoryName: string; categoryId: number }) =>
            convertCategory.asKR(a.categoryName)
        );

        categories.forEach((category: string) => {
          const ind = Object.values(gameTags).findIndex(
            (value) => value === category
          );
          if (ind !== -1) {
            newTags[ind] = true;
          } else {
            alert('없는 카테고리입니다.');
          }
        });
        setTagStates(newTags);
      },
      (err) => {
        console.error(err);
      }
    );
  }, []);

  return (
    <StyledFormContainer>
      {isOpen && (
        <GameRegisterModal
          isOpen={isOpen}
          confirmMessage={'등록에 성공하였습니다!'}
          closeHandler={modalClose}
        />
      )}
      {isOpenFail && (
        <GameRegisterFailModal
          isOpen={isOpenFail}
          confirmMessage={'중복된 게임이름입니다'}
          closeHandler={modalCloseFail}
        />
      )}
      {isOpenError && (
        <GameRegisterErrorModal
          isOpen={isOpenError}
          confirmMessage={'알 수 없는 오류가 발생했습니다.'}
          closeHandler={modalCloseError}
        />
      )}
      {isTitle && (
        <GameTitleModal
          isOpen={isTitle}
          confirmMessage={'제목을 입력해야합니다.'}
          closeHandler={modalCloseTitle}
        />
      )}
      {isTag && (
        <GameTagModal
          isOpen={isTag}
          confirmMessage={'태그를 최소 1개 이상 선택해주세요!'}
          closeHandler={modalCloseTag}
        />
      )}
      <StyledForm onSubmit={submitFormData}>
        {/* 게임 제목 */}
        <StyledGameNameContainer>
          <Label htmlFor='channeltitle'>채널(게임) 이름</Label>
          <input
            name='channeltitle'
            placeholder='ex)Crypt of Necrodancer'
            className='colorchange'
            onChange={titleOnChange}
            value={title}
          />
        </StyledGameNameContainer>
        {/* 태그 선택 */}
        <GameTagsContainer tagStates={tagStates} setTagStates={setTagStates} />
        {/* 게임 설명 */}
        <StyledGameDetailContainer>
          <Label htmlFor='channeltitle'>게임 설명</Label>
          <textarea
            placeholder='ex)Crypt of Necrodancer는 주인공이 리듬에 맞춰 던젼을 탐험하며 아버지의 유산과 자신의 존재의미를 찾는 여정을 담은 rpg와 로그라이크 요소가 결합된 리듬게임입니다.'
            maxLength={1000}
            className='colorchange'
            onChange={detailOnChange}
            value={detail}
          />
        </StyledGameDetailContainer>
        {/* 다운로드 URL */}
        <StyledGameNameContainer>
          <Label htmlFor='downloadurl'>다운로드 링크</Label>
          <input
            name='downloadurl'
            placeholder='ex)게임 홈페이지 주소'
            className='colorchange'
            onChange={urlOnChange}
            type='url'
            value={url}
          />
        </StyledGameNameContainer>
        {/* 게임 대표이미지 */}
        <GameRegisterImageSection
          files={files}
          setFiles={setFiles}
          url={imageUrl}
          setImageUrl={setImageUrl}
        />

        {/* 확인/취소 버튼 */}
        <StyledButtonsContainer>
          <StyledSubmitButton type='submit' className='enroll'>
            등록
          </StyledSubmitButton>
          <StyledCancelButton
            type='button'
            className='cancel'
            onClick={cancelHandler}
          >
            취소
          </StyledCancelButton>
        </StyledButtonsContainer>
      </StyledForm>
    </StyledFormContainer>
  );
};

export default GameRegister;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: (100%-0px);
  margin-top: 0rem;
  > form {
    width: 50rem;
    @media screen and (max-width: 650px) {
      width: 40rem;
      margin-top: 5rem;
      margin-bottom: 5rem;
    }
  }
`;

const StyledGameNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  white-space: nowrap;
  width: 100%;
  margin: 1rem;
  > form {
    display: flex;
    flex: 1;
  }

  > label {
    margin: 0.5rem 1rem;
  }

  > input {
    margin: 0.2rem 0 0.5rem 0 !important;
    width: 100%;
    font-size: 1.4rem;
    font-family: 'yg-jalnan';
  }

  .colorchange {
    margin: 1rem;
    &:hover {
      border-color: var(--cyan-light-400);
    }
    &:focus {
      border-color: var(--cyan-light-400);
      box-shadow: 0 0 0 2px var(--cyan-light-200);
    }
  }

  @media screen and (max-width: 650px) {
    flex-direction: row;
    > label {
      margin: 0rem 1rem;
    }
    > input {
      margin: 1rem;
    }
  }
`;

const StyledGameDetailContainer = styled(StyledGameNameContainer)`
  width: 100%;
  textarea {
    min-height: 15rem;
    width: 100%;
    margin: 0.2rem 0 0.3rem 0 !important;
    padding: 1rem;
    font-size: 1.2rem;
    font-family: 'yg-jalnan';
  }
  @media screen and (max-width: 650px) {
    flex-direction: column;
    > label {
      margin: 0rem 1rem;
    }
    textarea {
      min-height: 20rem;
    }
  }
`;

const StyledButtonsContainer = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-around;

  .enroll {
    background-color: var(--cyan-dark-400);
    &:hover {
      background-color: var(--cyan-dark-500);
    }
  }
  .cancel {
    &:hover {
      color: white;
      background-color: var(--button-inactive-hover-color);
      border-color: var(--button-inactive-hover-color);
    }
  }
`;

const StyledSubmitButton = styled.button`
  color: white;
  border-style: none;
  border-radius: 5px;
  width: 20rem;
  height: 4rem;
  font-size: 1.6rem;
  font-weight: bold;
`;

const StyledCancelButton = styled.button`
  background-color: var(--button-inactive-color);
  color: white;
  border-style: none;
  border-radius: 5px;
  width: 20rem;
  height: 4rem;
  font-size: 1.6rem;
  font-weight: bold;
`;
