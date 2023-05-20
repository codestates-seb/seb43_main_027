import styled from 'styled-components';
import { PostMemberType } from '../../types/dataTypes';
import { AiFillEye } from 'react-icons/ai';
import { elapsedText } from '../../utils/elapsedText';
import { Link, useParams } from 'react-router-dom';
import PATH_URL from '../../constants/pathUrl';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const PostInfo = ({
  member,
  views,
  createdAt
}: {
  member: PostMemberType;
  views: number;
  createdAt: string;
}) => {
  const { memberId } = useSelector((s: RootState) => s.user);
  const { gameId, postId } = useParams();
  return (
    <StyledContainer>
      <StyledImg src={member.imageUrl} />
      <StyledInfoFlexBox>
        <span>{member.username}</span>
        <StyledFlexBox>
          <StyledInfoBox>
            <StyledIconBox>
              <AiFillEye />
              <span>{views}</span>
            </StyledIconBox>
            <span>{elapsedText(new Date(createdAt))}</span>
          </StyledInfoBox>
          {memberId === member.memberId && (
            <StyledTextContainer>
              <Link
                to={`${PATH_URL.GAME}${gameId}${PATH_URL.POSTING}/${postId}${PATH_URL.EDIT}`}
              >
                <StyledText>수정</StyledText>
              </Link>
              <StyledText>삭제</StyledText>
            </StyledTextContainer>
          )}
        </StyledFlexBox>
      </StyledInfoFlexBox>
    </StyledContainer>
  );
};

export default PostInfo;

const StyledContainer = styled.div`
  display: flex;
  gap: 2rem;
  padding: 1.6rem 0;
  border-bottom: 1px solid #ddd;
`;

const StyledImg = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
`;

const StyledFlexBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledInfoFlexBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  font-size: 1.4rem;
  gap: 1rem;
`;

const StyledInfoBox = styled.div`
  display: flex;
  color: #999;
  font-weight: normal;
  font-size: 1.2rem;
  gap: 2rem;
`;
const StyledIconBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const StyledText = styled.span`
  cursor: pointer;
  color: #999;
`;

const StyledTextContainer = styled.div`
  display: flex;
  font-size: 1.2rem;
  gap: 1rem;
  align-items: center;
`;