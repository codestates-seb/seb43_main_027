import styled from 'styled-components';

const ImageItem = ({ url }: { url: string }) => {
  return (
    <StyledContainer>
      <StyledImg src={url} />
    </StyledContainer>
  );
};

export default ImageItem;

const StyledContainer = styled.div`
  width: fit-content;
  position: relative;
  @media screen and (min-width: 650px) {
    width: 20%;
  }
`;

const StyledImg = styled.img`
  width: 100%;
`;
