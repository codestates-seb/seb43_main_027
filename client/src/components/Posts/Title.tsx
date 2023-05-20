import styled from 'styled-components';
import postOptionTags from '../../data/postOptionTags';
import convertTag from '../../utils/convertTag';
import CategoryTag from '../common/CategoryTag';
import { StarTwoTone } from '@ant-design/icons';

const Title = ({
  tag,
  title,
  isMarked
}: {
  tag: string;
  title: string;
  isMarked: boolean;
}) => {
  const tagId = postOptionTags.findIndex(
    (option) => option.value === convertTag.asKR(tag)
  );

  return (
    <StyledContainer>
      <CategoryTag categoryId={tagId} categoryName={convertTag.asKR(tag)} />
      <StyledFlexWrapper>
        <StyledTitle>{title}</StyledTitle>
        <StarTwoTone twoToneColor={isMarked ? '#13A8A8' : '#b4b4b4'} />
      </StyledFlexWrapper>
    </StyledContainer>
  );
};

export default Title;

const StyledContainer = styled.div``;

const StyledFlexWrapper = styled.div`
  margin-top: 2.5rem;
  font-size: 2.5rem;
  display: flex;
  justify-content: space-between;

  > :last-child {
    cursor: pointer;
  }
`;

const StyledTitle = styled.h2``;
