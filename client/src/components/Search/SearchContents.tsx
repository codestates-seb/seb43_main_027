import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { type GamePagePostType, PageInfoType } from '../../types/dataTypes';

import PostItem from '../GameChannel/PostItem';
import SearchContentsTop from './SearchContentsTop';
import Pagination from 'react-js-pagination';

interface SearchContentsType {
  isSelectTab: '전체' | '게시글';
  searchContentsInfo: SearchContentsInfo;
  searchQuery: string | null;
}

export interface SearchContentsInfo {
  data: GamePagePostType[];
  pageInfo: PageInfoType;
}
interface SearchContentsWrapperType {
  isPreview: boolean;
}

const SearchContents = ({
  isSelectTab,
  searchContentsInfo,
  searchQuery
}: SearchContentsType) => {
  const [reordered, setReordered] = useState<GamePagePostType[]>([]);
  const [isPage, setPage] = useState<number>(1);
  const [isSize, setSize] = useState<number>(20);
  const [isToTalSize, setTotalSize] = useState<number>(0);
  const navigate = useNavigate();
  useEffect(() => {
    setPage(1);
  }, [isSelectTab]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (searchContentsInfo.data.length === 0) {
        try {
          if (searchQuery) {
            setSize(searchContentsInfo.pageInfo.size);
            setTotalSize(searchContentsInfo.pageInfo.totalSize);
          } else {
            const apiUrl = `${process.env.REACT_APP_API_URL}/api/posts/search?q=&page=${isPage}&size=${isSize}`;

            const res = await axios.get(apiUrl);
            const userData = res.data.data.sort(
              (a: { createdAt: string }, b: { createdAt: string }) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
            const pageInfo = res.data.pageInfo;
            setReordered([...userData]);
            setSize(pageInfo.size);
            setTotalSize(pageInfo.totalSize);
            searchContentsInfo.data = reordered;
          }
        } catch (error) {
          return navigate('/error');
        }
      } else {
        setSize(searchContentsInfo.pageInfo.size);
        setTotalSize(searchContentsInfo.pageInfo.totalSize);
      }
    };
    fetchUserData();
  }, [searchContentsInfo, isPage]);

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <StyledSearchContentsWrapper
      isPreview={isSelectTab === '전체' ? true : false}
    >
      <StyledContentsBox isPreview={isSelectTab === '전체' ? true : false}>
        {isSelectTab === '전체' && <SearchContentsTop />}
        {searchContentsInfo.data.length > 0 &&
        searchContentsInfo.data[0].postId > 0 ? (
          isSelectTab === '전체' ? (
            <StyledContentsContainer isPreview={true}>
              {searchContentsInfo.data.slice(0, 10).map((post, index) => (
                <PostItem
                  key={index}
                  postId={post.postId}
                  userName={post.userName}
                  title={post.title}
                  views={post.views}
                  postTag={post.postTag}
                  commentCount={post.commentCount}
                  likeCount={post.likeCount}
                  createdAt={post.createdAt}
                />
              ))}
            </StyledContentsContainer>
          ) : (
            <StyledContentsContainer isPreview={false}>
              {searchContentsInfo.data.map((post, index) => (
                <PostItem
                  key={index}
                  postId={post.postId}
                  userName={post.userName}
                  title={post.title}
                  views={post.views}
                  postTag={post.postTag}
                  commentCount={post.commentCount}
                  likeCount={post.likeCount}
                  createdAt={post.createdAt}
                />
              ))}
            </StyledContentsContainer>
          )
        ) : (
          <StyledEmptyItem isPreview={isSelectTab === '전체' ? true : false}>
            <StyledStyleBox isPreview={isSelectTab === '전체' ? true : false}>
              검색 결과가 없습니다.
            </StyledStyleBox>
          </StyledEmptyItem>
        )}
      </StyledContentsBox>
      <StyledPaginationBox>
        {searchContentsInfo.data.length > 0 &&
          searchContentsInfo.data[0].postId > 0 &&
          isSelectTab !== '전체' && (
            <StyledPagination>
              <Pagination
                activePage={isPage}
                itemsCountPerPage={isSize}
                totalItemsCount={isToTalSize}
                pageRangeDisplayed={5}
                prevPageText={'‹'}
                nextPageText={'›'}
                onChange={handlePageChange}
              />
            </StyledPagination>
          )}
      </StyledPaginationBox>
    </StyledSearchContentsWrapper>
  );
};

export default SearchContents;

const StyledSearchContentsWrapper = styled.div<SearchContentsWrapperType>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3rem;
  border-radius: 15px;
  ${(p) =>
    p.isPreview
      ? 'flex-direction: column; height:30%; background-color: #cfecee;'
      : 'flex-direction: column; height:80%; width:80%'};
`;

const StyledContentsBox = styled.div<SearchContentsWrapperType>`
  display: flex;
  flex-wrap: wrap;
  background-color: #cfecee;
  border-radius: 15px;
  width: 100%;
`;

const StyledContentsContainer = styled.div<SearchContentsWrapperType>`
  padding: 3rem;
  width: 100%;
  ${(p) =>
    p.isPreview
      ? '@media screen and (min-width: 1200px) {column-count: 2; column-gap: calc((100% - 1020px) / 4);}'
      : '@media screen and (min-width: 1400px) {column-count: 2; column-gap: calc((100% - 1020px) / 4);}'};

  > a {
    background-color: white;
    border-radius: 10px;
    width: 51rem;
    display: inline-block;
    break-inside: avoid;
  }
`;

const StyledEmptyItem = styled.div<SearchContentsWrapperType>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ isPreview }) =>
    isPreview ? 'padding: 0 0 20px 0px;' : 'padding: 40px 0px;'}
  font-size: 18px;
  font-weight: 700;
  color: var(--default-text-color);
`;
const StyledStyleBox = styled.div<SearchContentsWrapperType>`
  ${({ isPreview }) => (isPreview ? 'width: 90%;' : 'width: 85%;')}
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  padding: 50px 0px;
  font-size: 18px;
  font-weight: 700;
  color: var(--default-text-color);
  background-color: white;
`;

const StyledPaginationBox = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledPagination = styled.div`
  padding: 0px 30px 50px 30px;
`;
