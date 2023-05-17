import styled from 'styled-components';
import SelectTag from '../common/SelectTag';
import ButtonEl from '../elements/Button';
import ImageSection from './ImageSection';
import { useState } from 'react';
import postOptionTags from '../../data/postOptionTags';
import axios from 'axios';
import convertTag from '../../utils/convertTag';
import { PostType } from '../../types/dataTypes';
import { validatePost } from '../../utils/validatePost';
import { useNavigate, useParams } from 'react-router-dom';

const InputSection = () => {
  const [post, setPost] = useState<PostType>({
    postTag: '',
    title: '',
    content: ''
  });
  const [files, setFiles] = useState<File[]>([]);
  const { gameId } = useParams();
  const navigation = useNavigate();

  const onTagChangeHandler = (postTag: string) => {
    const convertedTag = convertTag.asEN(postTag);
    setPost((prev) => ({ ...prev, postTag: convertedTag }));
  };
  const onInputChangeHandler =
    (type: string) =>
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      setPost((prev) => ({ ...prev, [type]: e.target.value }));
    };

  const onSubmitHandler = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent
  ) => {
    e.preventDefault();

    if (!validatePost(post)) {
      alert('입력값을 정확히 입력해주세요');
      return;
    }

    (async () => {
      const formData = new FormData();
      formData.append(
        'post',
        new Blob([JSON.stringify(post)], {
          type: 'application/json'
        })
      );
      if (files.length !== 0) {
        files.forEach((file) => {
          formData.append('files', file);
        });
      }

      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/games/${gameId}/posts`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: localStorage.getItem('access_token')
            }
          }
        );
        navigation(`/game/${gameId}`);
      } catch (err) {
        alert('게시글 작성에서 오류가 발생하였습니다.');
      }
    })();

    console.log(post);
  };
  return (
    <form onSubmit={onSubmitHandler} encType='multipart/form-data'>
      <StyledContainer>
        <SelectTag options={postOptionTags} onChange={onTagChangeHandler} />
        <StyledTitleInput
          placeholder='제목을 입력하세요.'
          onChange={onInputChangeHandler('title')}
        />
        <StyledTextarea
          placeholder='내용을 입력하세요.'
          onChange={onInputChangeHandler('content')}
        />
        <ImageSection files={files} setFiles={setFiles} />
        <StyledButtonContainer>
          <StyledSubmitButton onClick={onSubmitHandler}>
            작성하기
          </StyledSubmitButton>
        </StyledButtonContainer>
      </StyledContainer>
    </form>
  );
};

export default InputSection;

const StyledButtonContainer = styled.div`
  width: 100%;
  display: flex;
  @media screen and (min-width: 650px) {
    display: block;
    text-align: end;
  }
`;

const StyledSubmitButton = ButtonEl({
  flex: '1',
  padding: '1rem'
});

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledTitleInput = styled.input`
  font-size: 2rem;
  border: none;
  border-bottom: 1px solid #ddd;
  outline: none;
  padding: 1rem;
`;

const StyledTextarea = styled.textarea`
  font-size: 1.6rem;
  resize: none;
  height: 45vh;
  padding: 1rem;
  outline: none;
  border-radius: 5px;
  border-color: #ddd;
`;
