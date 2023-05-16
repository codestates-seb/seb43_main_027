import { AiOutlineUpload } from 'react-icons/ai';
import styled from 'styled-components';

const ImageSection = () => {
  return (
    <>
      <StyledContainer>ImageSection</StyledContainer>
      <StyledUploadButton htmlFor='file-upload'>
        <AiOutlineUpload />
        <span>Upload</span>
      </StyledUploadButton>
      <StyledFileInput type='file' id='file-upload' />
    </>
  );
};

export default ImageSection;

const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
`;

const StyledUploadButton = styled.label`
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
