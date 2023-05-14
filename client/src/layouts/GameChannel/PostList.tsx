import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Pagination from 'react-js-pagination';
import PostItem from './PostItem';
import { dummyPostList } from '../../data/dummyPostList';

interface Props {
  gameId?: string;
  isSelectTab: string;
  isSelectTag: string;
}

const PostList: React.FC<Props> = ({ gameId, isSelectTag ,isSelectTab }) => {
  const [filteredPosts, setFilteredPosts] = useState(dummyPostList.post);
  const [page, setPage] = useState(1);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    setPage(1);
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

  const ITEMS_PER_PAGE = 10;
  const lastIndex = page * ITEMS_PER_PAGE;
  const firstIndex = lastIndex - ITEMS_PER_PAGE;
  const currentPagePosts = filteredPosts.slice(firstIndex, lastIndex);

  return (
    <PostListWrapper>
      {
        currentPagePosts.length > 0 ? 
        currentPagePosts.map((post, index) => (
          <PostItem
            key={index}
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
      <StyledPagination>
      <Pagination
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={filteredPosts.length}
        pageRangeDisplayed={5}
        prevPageText={'‹'}
        nextPageText={'›'}
        onChange={handlePageChange}
    />
    </StyledPagination>
    </PostListWrapper>
  );
};

export default PostList;

const PostListWrapper = styled.div`
  display: flex;
  flex-direction: column;
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

const StyledPagination = styled.div`
  padding: 20px;
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid var(--loding-bg);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }

  ul.pagination li:first-child{
    border-radius: 5px 0 0 5px;
  }

  ul.pagination li:last-child{
    border-radius: 0 5px 5px 0;
  }
  
  ul.pagination li a {
    text-decoration: none;
    color: var(--cyan-light-600);
    font-size: 1rem;
  }
  
  ul.pagination li.active a {
    color: white;
  }

  ul.pagination li.active {
    background-color: var(--cyan-light-800);
  }
  
  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: var(--cyan-light-300);
  }
  
  .page-selection {
    width: 48px;
    height: 30px;
    color: var(--cyan-light-800);
  }
`;