import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getData } from '../api/apiCollection';
import { PostDataType } from '../types/dataTypes';
import Title from '../components/Posts/Title';
import styled from 'styled-components';
import PostInfo from '../components/Posts/PostInfo';
import PostContent from '../components/Posts/PostContent';
import ImageSection from '../components/Posts/ImageSection';
import CommentSection from '../components/Posts/CommentSection';
import Reaction from '../components/Posts/Reaction';
import PATH_URL from '../constants/pathUrl';
import { postInitValue } from '../data/initialData';
import Modal from '../components/common/Modal';
import {
  BookmarkDataType,
  CommentDataType,
  ReactionDataType
} from '../types/parameterTypes';

const Posts = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<PostDataType>(postInitValue);
  const navigation = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const changePostState =
    (newState: BookmarkDataType | ReactionDataType | CommentDataType) => () => {
      setPost((prev) => ({ ...prev, ...newState }));
    };

  useEffect(() => {
    getData(
      `${process.env.REACT_APP_API_URL}/api/posts/${postId}`,
      (res) => {
        setPost({ ...res.data.data });
      },
      (err) => {
        if (err?.response?.status === 401) {
          setIsOpen(true);
          navigation(PATH_URL.LOGIN);
        }
      },
      {
        headers: {
          Authorization: localStorage.getItem('access_token')
        }
      }
    );
  }, [postId]);
  return (
    <StyledContainer>
      <Title
        title={post.title}
        tag={post.postTag}
        bookmark={post.bookmark}
        onBookmarkChange={changePostState}
      />
      <PostInfo
        member={post.member}
        createdAt={post.createdAt}
        updatedAt={post.updatedAt}
        views={post.views}
      />
      <PostContent content={post.content} />
      <ImageSection urls={post.fileUrlList} />
      <Reaction
        reaction={post.reaction}
        likeCount={post.likeCount}
        unlikeCount={post.unlikeCount}
        onReactionChange={changePostState}
      />
      <CommentSection
        commentCount={post.commentCount}
        comments={post.comments}
        onCommentSubmit={changePostState}
      />
      <Modal
        isOpen={isOpen}
        closeModalHandlerWithConfirm={() => setIsOpen(false)}
        confirmMessage='유효하지 않은 토큰입니다.'
      />
    </StyledContainer>
  );
};

export default Posts;

const StyledContainer = styled.div`
  width: 100%;
  padding: 5rem 2rem 3rem;
`;
