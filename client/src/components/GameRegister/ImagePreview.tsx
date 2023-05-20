import styled from 'styled-components';

const ImagePreview = ({
  url,
  index,
  onClick
}: {
  url: string;
  index: number;
  onClick: (index: number) => () => void;
}) => {
  return (
    <StyledContainer>
      <StyledDeleteButton onClick={onClick(index)}>X</StyledDeleteButton>
      <StyledImg src={url} />
    </StyledContainer>
  );
};

export default ImagePreview;

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

const StyledDeleteButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  width: 25px;
  height: 25px;
  color: white;
  background-color: #ff4d4f;
  border: none;
  font-size: 1rem;
  cursor: pointer;
`;
