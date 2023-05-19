import styled from 'styled-components';
import CustomImageSection from './CustomImageSection';

const GameRegisterImageSection = ({
  files,
  setFiles
}: {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}) => {
  return (
    <StyledImageContainer>
      <StyledTitle>게임대표사진</StyledTitle>
      <CustomImageSection files={files} setFiles={setFiles} />
    </StyledImageContainer>
  );
};

export default GameRegisterImageSection;

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
