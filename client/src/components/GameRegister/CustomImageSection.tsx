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
    const file = e.target.files?.[0] || null;
    if (file) setFiles([file]);
  };

  const onDeleteClickHandler = (index: number) => () => {
    setFiles(files.filter((_, i) => i !== index));
  };
  return (
    <>
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
        accept='image/*'
        onChange={onUploadHandler}
      />
    </>
  );
};

export default ImageSection;

const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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
