import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PostItem from './PostItem';
import { dummyPostList } from '../../data/dummyPostList';

interface Props {
  gameId?: string;
  isSelectTab: string;
  isSelectTag: string;
}

const PostList: React.FC<Props> = ({ gameId, isSelectTag ,isSelectTab }) => {
  const [filteredPosts, setFilteredPosts] = useState(dummyPostList.post);

  useEffect(() => {
    const postData = dummyPostList.post;
  
    switch (isSelectTab) {
      case '최신순':
        setFilteredPosts([...postData].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
        break;
      case '인기순':
        setFilteredPosts([...postData].sort((a, b) => b.likeCount - a.likeCount));
        break;
      case '조회순':
        setFilteredPosts([...postData].sort((a, b) => b.view - a.view));
        break;
      default:
        setFilteredPosts(postData);
        break;
    }

    if (isSelectTag !== '전체') {
      setFilteredPosts((prev) => prev.filter((post) => post.tag === isSelectTag));
    }
  }, [isSelectTab, isSelectTag]);

  console.log(filteredPosts);

  return (
    <PostListWrapper>
      {
        filteredPosts.length > 0 ? 
        filteredPosts.map((post) => (
          <PostItem
            key={post.postId}
            postId={post.postId}
            title={post.title}
            tag={post.tag}
            createdAt={post.createdAt}
            updatedAt={post.updatedAt}
            view={post.view}
            userName={post.userName}
            memberStatus={post.memberStatus}
            likeCount={post.likeCount}
            commentCount={post.commentCount}
          />
        )) : 
        <StyledEmptyItem>
          작성된 게시글이 없습니다.
        </StyledEmptyItem>
      }
    </PostListWrapper>
  );
};

export default PostList;

const PostListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  max-height: 380px;
  @media screen and (max-width: 650px) {
    padding: 0px 5px;
    max-height: 100%;
  }
`;

const StyledEmptyItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
  font-size: 18px;
  font-weight: 700;
  color: var(--default-text-color);
`;
