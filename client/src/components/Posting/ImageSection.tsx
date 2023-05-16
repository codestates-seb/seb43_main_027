import { AiOutlineUpload } from 'react-icons/ai';
import styled from 'styled-components';
import ImagePreview from './ImagePreview';

const ImageSection = ({
  files,
  setFiles
}: {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}) => {
  const onUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    if (e.target.files !== null) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files as FileList)]);
    }
  };

  const onDeleteClickHandler = (index: number) => () => {
    setFiles(files.filter((_, i) => i !== index));
  };
  return (
    <>
      <StyledTitle>이미지 미리보기</StyledTitle>
      <StyledContainer>
        {files.map((file, i) => {
          const url = URL.createObjectURL(file);
          return (
            <ImagePreview
              url={url}
              key={url}
              index={i}
              onClick={onDeleteClickHandler}
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
        multiple
        onChange={onUploadHandler}
      />
    </>
  );
};

export default ImageSection;

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
