import styled from 'styled-components';
import SelectTag from '../common/SelectTag';
import ButtonEl from '../elements/Button';
import ImageSection from './ImageSection';
import { useState } from 'react';
import postOptionTags from '../../data/postOptionTags';
import axios from 'axios';
import convertTag from '../../utils/convertTag';
import { PostType } from '../../types/dataTypes';

const InputSection = () => {
  const [post, setPost] = useState<PostType>({});
  const [files, setFiles] = useState<File[]>([]);

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
    (async () => {
      const formData = new FormData();
      formData.append(
        'post',
        new Blob([JSON.stringify(post)], {
          type: 'application/json'
        })
      );
      try {
        const res = axios.post(
          `${process.env.REACT_APP_API_URL}/api/games/1/posts`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MUBuYXZlci5jb20iLCJyb2xlcyI6WyJST0xFX1VTRVIiXSwiZXhwIjoxNjk3MjQ4Mzk2fQ.a-wJ69y5hGHaKcqEQ7QTMGbJO0RxdCt3FaC_L19f4Jo'
            }
          }
        );
        console.log(res);
      } catch (err) {
        console.error(err);
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
