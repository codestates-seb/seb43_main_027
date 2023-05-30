import styled from 'styled-components';

const SkeletonComponent = () => {
  return <StyledBox />;
};

export default SkeletonComponent;

const StyledBox = styled.div`
  display: flex;
  margin: 1rem;
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: gray;
`;
