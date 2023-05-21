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

const initValue: PostDataType = {
  content: '',
  commentCount: 0,
  createdAt: '',
  title: '',
  fileUrlList: [],
  reaction: null,
  member: {
    memberId: -1,
    email: '',
    followerCount: 0,
    followingCount: 0,
    imageUrl: '',
    userName: ''
  },
  comments: [],
  gameId: -1,
  likeCount: 0,
  unlikeCount: 0,
  postId: -1,
  updatedAt: '',
  views: 0,
  postTag: ''
};

const Posts = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<PostDataType>(initValue);
  const [isMarked, setIsMarked] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigation = useNavigate();

  const needFetch = () => {
    setIsSubmitted(true);
  };
  console.log('render');
  useEffect(() => {
    // TODO: 북마크 여부 검사
    if (post.postId !== -1 && isSubmitted === false) return;
    getData(
      `${process.env.REACT_APP_API_URL}/api/posts/${postId}`,
      (res) => {
        console.log(res.data.data);
        setPost({ ...res.data.data });
        setIsSubmitted(false);
      },
      (err) => {
        if (err?.response?.status === 401) {
          alert('유효하지 않은 토큰입니다.');
          navigation(PATH_URL.LOGIN);
        }
      },
      {
        headers: {
          Authorization: localStorage.getItem('access_token')
        }
      }
    );
  }, [isSubmitted]);
  return (
    <StyledContainer>
      <Title title={post.title} tag={post.postTag} isMarked={isMarked} />
      <PostInfo
        member={post.member}
        createdAt={post.createdAt}
        views={post.views}
      />
      <PostContent content={post.content} />
      <ImageSection urls={post.fileUrlList} />
      <Reaction
        reaction={post.reaction}
        likeCount={post.likeCount}
        unlikeCount={post.unlikeCount}
        onReactionChange={needFetch}
      />
      <CommentSection
        commentCount={post.commentCount}
        comments={post.comments}
        onCommentSubmit={needFetch}
      />
    </StyledContainer>
  );
};

export default Posts;

const StyledContainer = styled.div`
  width: 100%;
  padding: 5rem 2rem 3rem;
`;
