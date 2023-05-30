import { memo } from 'react';
import styled from 'styled-components';
import CustomImageSection from './CustomImageSection';

const GameRegisterImageSection = ({
  files,
  setFiles,
  url,
  setImageUrl
}: {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  url?: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <StyledImageContainer>
      <StyledTitle>게임대표사진</StyledTitle>
      <CustomImageSection
        files={files}
        setFiles={setFiles}
        url={url}
        setImageUrl={setImageUrl}
      />
    </StyledImageContainer>
  );
};

export default memo(GameRegisterImageSection);

const StyledImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  title {
    display: flex;
    font-size: 1.6rem;
  }

  > label {
    display: flex;
    margin: 0.5rem 1rem;
  }

  > form {
    display: flex;
  }

  button {
    &:hover {
      color: var(--cyan-dark-400) !important;
      border-color: var(--cyan-dark-400) !important;
    }
  }

  > svg {
    &:hover {
      background-color: var(--cyan-dark-400);
    }
  }
`;

const StyledTitle = styled.title``;
