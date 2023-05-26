import { memo } from 'react';
import { AiOutlineUpload } from 'react-icons/ai';
import styled from 'styled-components';
import ImagePreview from './ImagePreview';

const ImageSection = ({
  files,
  onUploadHandler,
  onDeleteFileClickHandler,
  onDeleteUrlClickHandler,
  urls
}: {
  files: File[];
  onUploadHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteFileClickHandler: (i: number) => () => void;
  onDeleteUrlClickHandler: (i: number) => () => void;
  urls: string[] | undefined;
}) => {
  return (
    <>
      <StyledTitle>이미지 미리보기</StyledTitle>
      <StyledContainer>
        {urls?.map((url, i) => (
          <ImagePreview
            url={url}
            key={url}
            index={i}
            onClick={onDeleteUrlClickHandler}
          />
        ))}
        {files.map((file, i) => {
          const url = URL.createObjectURL(file);
          return (
            <ImagePreview
              url={url}
              key={url}
              index={i}
              onClick={onDeleteFileClickHandler}
            />
          );
        })}
      </StyledContainer>
      <StyledUploadLabel htmlFor='file-upload'>
        <AiOutlineUpload />
        <span>Upload</span>
      </StyledUploadLabel>
      <StyledFileInput
        type='file'
        id='file-upload'
        accept='image/*'
        multiple
        onChange={onUploadHandler}
      />
    </>
  );
};

export default memo(ImageSection);

const StyledTitle = styled.h4`
  font-weight: 500;
  font-size: 1.6rem;
  margin-top: 1rem;
`;
const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
  gap: 3rem 5%;
`;

const StyledUploadLabel = styled.label`
  display: flex;
  width: fit-content;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 1rem;
  gap: 0.5rem;
  &:hover {
    background-color: #eee;
  }
`;

const StyledFileInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
`;
