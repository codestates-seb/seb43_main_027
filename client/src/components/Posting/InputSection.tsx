import styled from 'styled-components';
import SelectTag from '../common/SelectTag';
import ButtonEl from '../elements/Button';
import ImageSection from './ImageSection';
import { useState } from 'react';

const optionsTag = [
  { value: '전체', label: '전체' },
  { value: '모집', label: '모집' },
  { value: '공략', label: '공략' },
  { value: '완료', label: '완료' }
];

const InputSection = () => {
  const [post, setPost] = useState({});
  const [files, setFiles] = useState<File[]>([]);

  const onTagChangeHandler = (postTag: string) => {
    setPost((prev) => ({ ...prev, postTag }));
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
    console.log(post);
  };
  return (
    <form onSubmit={onSubmitHandler}>
      <StyledContainer>
        <SelectTag options={optionsTag} onChange={onTagChangeHandler} />
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
          <SubmitButton onClick={onSubmitHandler}>작성하기</SubmitButton>
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

const SubmitButton = ButtonEl({
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
