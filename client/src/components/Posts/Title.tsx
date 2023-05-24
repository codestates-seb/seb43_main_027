import styled from 'styled-components';
import postOptionTags from '../../data/postOptionTags';
import convertTag from '../../utils/convertTag';
import CategoryTag from '../common/CategoryTag';
import { BiArrowBack } from 'react-icons/bi';
import { StarTwoTone } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { BookmarkType } from '../../types/dataTypes';
import { deleteData, postData } from '../../api/apiCollection';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import PATH_URL from '../../constants/pathUrl';

const Title = ({
  tag,
  title,
  bookmark,
  onBookmarkChange
}: {
  tag: string;
  title: string;
  bookmark: BookmarkType | null;
  onBookmarkChange: (s: any) => () => void;
}) => {
  const navigation = useNavigate();
  const user = useSelector((s: RootState) => s.user);
  const { gameId, postId } = useParams();
  const tagId = postOptionTags.findIndex(
    (option) => option.value === convertTag.asKR(tag)
  );

  const onBackClickHandler = () => {
    navigation(-1);
  };

  const onBackToGameClickHandler = () => {
    navigation(`${PATH_URL.GAME}${gameId}`);
  };

  const onBookmarkClick = (status: undefined | string) => () => {
    if (user.memberId === -1) {
      alert('로그인이 필요한 기능입니다.');
      return;
    }
    if (status !== 'ACTIVE') {
      postData(
        `${process.env.REACT_APP_API_URL}/api/posts/${postId}/bookmark`,
        JSON.stringify({
          bookmarkStatus: 'ACTIVE'
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('access_token')
          }
        },
        onBookmarkChange({ bookmark: { bookmarkStatus: 'ACTIVE' } }),
        (err) => {
          console.error(err);
        }
      );
    } else {
      deleteData(
        `${process.env.REACT_APP_API_URL}/api/posts/${postId}/unbookmark`,
        {
          headers: {
            Authorization: localStorage.getItem('access_token')
          }
        },
        onBookmarkChange({ bookmark: null }),
        (err) => {
          console.error(err);
        }
      );
    }
  };

  return (
    <StyledContainer>
      <BiArrowBack
        size={'3rem'}
        color='#999'
        cursor='pointer'
        onClick={onBackClickHandler}
      />

      <StyledTagContainer>
        <CategoryTag categoryId={tagId} categoryName={convertTag.asKR(tag)} />
        <StyledBackToGame onClick={onBackToGameClickHandler}>
          게임으로 돌아가기
        </StyledBackToGame>
      </StyledTagContainer>

      <StyledFlexWrapper>
        <StyledTitle>{title}</StyledTitle>
        <StarTwoTone
          twoToneColor={
            bookmark?.bookmarkStatus === 'ACTIVE' ? '#13A8A8' : '#b4b4b4'
          }
          onClick={onBookmarkClick(bookmark?.bookmarkStatus)}
        />
      </StyledFlexWrapper>
    </StyledContainer>
  );
};

export default Title;

const StyledContainer = styled.div``;
const StyledTagContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const StyledFlexWrapper = styled.div`
  margin-top: 2.5rem;
  font-size: 2.5rem;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  > :last-child {
    cursor: pointer;
    text-align: end;
  }
`;

const StyledBackToGame = styled.div`
  font-size: 1.2rem;
  cursor: pointer;
  color: var(--default-text-color);
  &:hover {
    color: var(--button-hover-color);
  }
`;

const StyledTitle = styled.h2``;
