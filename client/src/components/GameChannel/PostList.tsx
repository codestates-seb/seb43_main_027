import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import styled from 'styled-components';
import PostItem from './PostItem';
import { type PostListProps } from '../../types/propsTypes';
import { type GamePagePostType } from '../../types/dataTypes';

const PostList: React.FC<PostListProps> = ({ isSelectTag, isSelectTab, isMappingTag }) => {
  const { gameId } = useParams();
  const getMemberData = localStorage.getItem('user');
  const memberData = getMemberData ? JSON.parse(getMemberData) : { memberId: -1 };
  const memberId = memberData.memberId;

  const [ isFilteredPosts, setIsFilteredPosts ] = useState<GamePagePostType[]>([]);
  const [ isUserMessage, setIsUserMessage ] = useState('작성된 게시글이 없습니다.');

  const [ isPage, setIsPage ] = useState<number>(1);
  const [ isSize, setIsSize ] = useState<number>(10);
  const [ isTotalSize, setIsTotalSize ] = useState<number>(0);
  const [ isBookmarkedList, setIsBookmarkedList ] = useState<number[]>([]);
 
  useEffect(() => {
    setIsPage(1);
  }, [isSelectTab, isSelectTag]);

  useEffect(() => {
    if (memberId !== -1) {
    const BookmarkedData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/members/${memberId}/bookmark`, {
          headers: {
            Authorization: `${localStorage.getItem('access_token')}`,
          }
        });
        const fetchedData = res.data.data;
        const filteredPosts = fetchedData.filter((post:any) => post.gameId.toString() === gameId);
        const postIdList = filteredPosts.map((post:any) => post.postId);
        setIsBookmarkedList([...postIdList]);

      } catch (error) {
        console.log(error);
      };
    };
      BookmarkedData();
    };

  }, [memberId]);

  useEffect(() => {
    const fetchPostsData = async () => {
      try {
        let apiUrl = `${process.env.REACT_APP_API_URL}/api/games/${gameId}/posts?page=${isPage}&size=${isSize}`;
        let headers = {};

        switch (isSelectTab) {
          case '최신순': {
            apiUrl += '&filter=NEW';
            break;
          };
          case '인기순': {
            apiUrl += '&filter=LIKE';
            break;
          };
          case '조회순': {
            apiUrl += '&filter=MOST_VIEWS';
            break;
          };
          case '북마크 글': {
            if (memberId === -1) {
              setIsFilteredPosts([]);
              return setIsUserMessage('로그인이 필요한 기능입니다.');
            } else {
              apiUrl =  `${process.env.REACT_APP_API_URL}/api/members/${memberId}/bookmark`;
              headers = {
                Authorization: `${localStorage.getItem('access_token')}`,
              };
              setIsUserMessage('북마크한 게시글이 없습니다.');
            };
            break;
          };
          case '내가 쓴 글': {
            if (memberId === -1) {
              setIsFilteredPosts([]);
              return setIsUserMessage('로그인이 필요한 기능입니다.');
            } else {
              apiUrl = `${process.env.REACT_APP_API_URL}/api/members/${memberId}/mypost`;
              setIsUserMessage('작성된 게시글이 없습니다.');
            }
            break;
          };
          default:
            setIsFilteredPosts(isFilteredPosts);
            break;
        };

        if (isSelectTag !== '전체') {
          if (isSelectTab === '북마크 글' || isSelectTab === '내가 쓴 글') {
            apiUrl += `?postTag=${isMappingTag}`;
          } else {
            apiUrl += `&postTag=${isMappingTag}`;
          }
        };
        
        const res = await axios.get(apiUrl, { headers });
        const currentPosts = res.data.data;
        const pageInfo = res.data.pageInfo;

        const filteredPosts = currentPosts.filter((post:any) => post.gameId.toString() === gameId);
        
        if (isSelectTab === '북마크 글' || isSelectTab === '내가 쓴 글') {
          const totalPostsCount = filteredPosts.length;
          const startIndex = (isPage - 1) * isSize; // 시작 인덱스 계산
          const endIndex = startIndex + isSize; // 종료 인덱스 계산
          const currentPosts = filteredPosts.slice(startIndex, endIndex); // 현재 페이지에 해당하는 데이터 추출
          setIsTotalSize(totalPostsCount);
          setIsFilteredPosts([...currentPosts]);

        } else {
          if (isFilteredPosts.length === 0) setIsUserMessage('작성된 게시글이 없습니다.');
          setIsSize(pageInfo.size);
          setIsTotalSize(pageInfo.totalSize);
          setIsFilteredPosts([...filteredPosts]);
        };
      
      } catch (error) {
        setIsFilteredPosts([]);
        console.log(error);
      };
    };

    fetchPostsData();

  }, [isSelectTab, isSelectTag, memberId, isPage, gameId]);

  const handlePageChange = (page: number) => {
    setIsPage(page);
    window.scrollTo(0, 0);
  };

  const isPostIdIncluded = (postId: number) => {
    return isBookmarkedList.includes(postId);
  };

  return (
    <PostListWrapper>
      {
        isFilteredPosts.length > 0 ? (
          isFilteredPosts.map((post, index) => (
            <PostItem
              key={index}
              gameId={post.gameId}
              postId={post.postId}
              userName={post.userName}
              title={post.title}
              views={post.views}
              postTag={post.postTag}
              commentCount={post.commentCount}
              likeCount={post.likeCount}
              createdAt={post.createdAt}
              isPostIdIncluded={isPostIdIncluded(post.postId)}
            />
          ))
        ) : (
          <StyledEmptyItem>{isUserMessage}</StyledEmptyItem>
        )
      }
      {
        isFilteredPosts.length > 0 &&
          <StyledPagination>
            <Pagination
              activePage={isPage}
              itemsCountPerPage={isSize}
              totalItemsCount={isTotalSize}
              pageRangeDisplayed={5}
              prevPageText={'‹'}
              nextPageText={'›'}
              onChange={handlePageChange}
            />
          </StyledPagination>
      }
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
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0px;
  font-size: 18px;
  font-weight: 700;
  color: var(--default-text-color);
`;

const StyledPagination = styled.div`
  padding: 20px;
`;
