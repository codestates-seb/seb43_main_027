import styled from 'styled-components';
import postOptionTags from '../../data/postOptionTags';
import convertTag from '../../utils/convertTag';
import CategoryTag from '../common/CategoryTag';
import { BiArrowBack } from 'react-icons/bi';
import { StarTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Title = ({
  tag,
  title,
  isMarked
}: {
  tag: string;
  title: string;
  isMarked: boolean;
}) => {
  const navigation = useNavigate();

  const tagId = postOptionTags.findIndex(
    (option) => option.value === convertTag.asKR(tag)
  );

  const onBackClickHandler = () => {
    navigation(-1);
  };

  return (
    <StyledContainer>
      <BiArrowBack
        size={'3rem'}
        color='#999'
        cursor='pointer'
        onClick={onBackClickHandler}
      />
      <StyledFlexWrapper>
        <StyledTitle>{title}</StyledTitle>
        <CategoryTag categoryId={tagId} categoryName={convertTag.asKR(tag)} />
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
  gap: 1rem;
  > :last-child {
    cursor: pointer;
    flex: 1 0 0;
    text-align: end;
  }
`;

const StyledTitle = styled.h2``;
