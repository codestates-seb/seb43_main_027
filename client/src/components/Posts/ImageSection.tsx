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
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
  gap: 3rem 5%;
`;
