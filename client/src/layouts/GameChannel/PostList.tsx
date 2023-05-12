import React from 'react';
import styled from 'styled-components';
import PostItem from './PostItem';

const PostList = ()  => {
  return (
    <PostListWrapper>
      <PostItem />
      <PostItem />
      <PostItem />
      <PostItem />
      <PostItem />
      <PostItem />
      <PostItem />
      <PostItem />
      <PostItem />
      <PostItem />
    </PostListWrapper>
  )
}

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
