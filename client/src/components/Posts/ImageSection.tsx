import styled from 'styled-components';
import ImageItem from './ImageItem';

const ImageSection = ({ urls }: { urls: [] }) => {
  return (
    <StyledContainer>
      {urls.map((a: string) => (
        <ImageItem url={a} key={a} />
      ))}
    </StyledContainer>
  );
};

export default ImageSection;

const StyledContainer = styled.div`
  padding: 1rem;
`;
