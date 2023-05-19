import Label from '../components/elements/Label';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import styled from 'styled-components';

import GameTagsContainer from '../components/GameRegister/GameTagsContainer';
import GameRegisterImageSection from '../components/GameRegister/GameRegisterImageSection';

import { gameTagInfo } from '../data/gameTags';
const { gameTags, textTranslate } = gameTagInfo;

const GameRegister = () => {
  const navigation = useNavigate();
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [url, setUrl] = useState('');
  const [tagStates, setTagStates] = useState<boolean[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const titleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    console.log(title);
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
  }

  const submitFormData = (e: React.FormEvent) => {
    e.preventDefault();
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
      categoryNames: translatedTags
    };

    const formData = new FormData();
    formData.append(
      'post',
      new Blob([JSON.stringify(postData)], {
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
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/games`, formData, { headers })
      .then((response) => {
        alert('등록에 성공하였습니다');
        navigation(-1);
      })
      .catch((error) => {
        console.error(error);
        navigation('/error');
      });
  };

  return (
    <StyledFormContainer>
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
            rows={6}
            placeholder='ex)Crypt of Necrodancer는 주인공이 리듬에 맞춰 던젼을 탐험하며 아버지의 유산과 자신의 존재의미를 찾는 여정을 담은 rpg와 로그라이크 요소가 결합된 리듬게임입니다.'
            maxLength={600}
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
        <GameRegisterImageSection files={files} setFiles={setFiles} />

        {/* 확인/취소 버튼 */}
        <StyledButtonsContainer>
          <button type='submit' className='enroll'>
            등록
          </button>
          <button type='button' className='cancel' onClick={cancelHandler}>
            취소
          </button>
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
  height: (100%-50px);
  margin-top: 1rem;
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
  margin: 1rem;
  > form {
    display: flex;
    flex: 1;
  }

  > label {
    margin: 0.5rem 1rem;
  }

  > input {
    margin: 0.5rem 1rem;
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
  textarea {
    min-height: 20rem;
  }
  @media screen and (max-width: 650px) {
    flex-direction: column;
    > label {
      margin: 0rem 1rem;
    }
    textarea {
      min-height: 30rem;
    }
  }
`;

const StyledButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

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
