import styled from 'styled-components';

const PostContent = ({ content }: { content: string }) => {
  return <StyledContainer>{content}</StyledContainer>;
};

export default PostContent;

const StyledContainer = styled.div`
  padding: 3rem 0;
  font-size: 1.6rem;
`;
