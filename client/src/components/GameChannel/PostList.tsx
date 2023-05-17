import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Pagination from 'react-js-pagination';
import styled from 'styled-components';
import PostItem from './PostItem';
import { type PostListProps } from '../../types/propsTypes';
import { type GamePagePostType } from '../../types/dataTypes';

const PostList: React.FC<PostListProps> = ({ isSelectTag, isSelectTab, isMappingTag }) => {
  const { gameId } = useParams();
  const memberId = useSelector((state: RootState) => state.user.memberId);

  const [ isFilteredPosts, setIsFilteredPosts ] = useState<GamePagePostType[]>([]);
  const [ isUserMessage, setIsUserMessage ] = useState('작성된 게시글이 없습니다.');

  const [ isPage, setIsPage ] = useState<number>(1);
  const [ isSize, setIsSize ] = useState<number>(0);
  const [ isTotalSize, setIsTotalSize ] = useState<number>(0);

  // todo: 내가 북마크한 게시글, 내가쓴 게시글 아직 필터링안됨, 태그선택시 요청 api처리 아직 안됨,
  // 내가 북마크한 게시글 페이지네이션없이 받아지면 북마크상태값 조회도 처리가능

  useEffect(() => {
    const fetchPostsData = async () => {
      try {
        let apiUrl = `${process.env.REACT_APP_API_URL}/api/games/${gameId}/posts?page=${isPage}`;

        switch (isSelectTab) {
          case '최신순': {
            apiUrl += '&filter=NEW';
            const res = await axios.get(apiUrl);
            const currentPosts = res.data.data;
            const pageInfo = res.data.pageInfo;

            setIsFilteredPosts([...currentPosts]);
            setIsSize(pageInfo.size);
            setIsTotalSize(pageInfo.totalSize);
            if (isFilteredPosts.length === 0) setIsUserMessage('작성된 게시글이 없습니다.');
            break;
          };
          case '인기순': {
            apiUrl += '&filter=LIKE';
            const res = await axios.get(apiUrl);
            const likePosts = res.data.data;
            const pageInfo = res.data.pageInfo;

            setIsFilteredPosts([...likePosts]);
            setIsSize(pageInfo.size);
            setIsTotalSize(pageInfo.totalSize);
            if (isFilteredPosts.length === 0) setIsUserMessage('작성된 게시글이 없습니다.');
            break;
          };
          case '조회순': {
            apiUrl += '&filter=MOST_VIEWS';
            const res = await axios.get(apiUrl);
            const mostViewPosts = res.data.data;
            const pageInfo = res.data.pageInfo;

            setIsFilteredPosts([...mostViewPosts]);
            setIsSize(pageInfo.size);
            setIsTotalSize(pageInfo.totalSize);
            if (isFilteredPosts.length === 0) setIsUserMessage('작성된 게시글이 없습니다.');
            break;
          };
          case '북마크 글': {
            if (memberId === -1) {
              setIsFilteredPosts([]);
              setIsUserMessage('로그인이 필요한 기능입니다.');
            } else {
              try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/members/${memberId}/bookmark`);
                const getLikePosts = res.data.data;

                if (getLikePosts.length > 0) {
                  setIsFilteredPosts([...getLikePosts]);
                } else {
                  setIsFilteredPosts([]);
                  setIsUserMessage('북마크한 게시글이 없습니다.');
                };
              } catch (error) {
                console.log(error);  
              }
            }
            break;
          };
          case '내가 쓴 글': {
            if (memberId === -1) {
              setIsFilteredPosts([]);
              setIsUserMessage('로그인이 필요한 기능입니다.');
            } else {
              try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/members/${memberId}/mypost`);
                const myPosts = res.data.data;

                if (myPosts.length > 0) {
                  setIsFilteredPosts([...myPosts]);
                } else {
                  setIsFilteredPosts([]);
                  setIsUserMessage('북마크한 게시글이 없습니다.');
                };
              } catch (error) {
                console.log(error);  
              }
            }
            break;
          }
          default:
            setIsFilteredPosts(isFilteredPosts);
            break;
          }

          if (isSelectTag !== '전체') {
            setIsFilteredPosts((prev) =>
            prev.filter((post) => post.postTag === isSelectTag)
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPostsData();

  }, [isSelectTab, isSelectTag, memberId, isPage]);

  const handlePageChange = (page: number) => {
    setIsPage(page);
  };

  return (
    <PostListWrapper>
      {
        isFilteredPosts.length > 0 ? (
          isFilteredPosts.map((post, index) => (
            <PostItem
              key={index}
              postId={post.postId}
              username={post?.member?.username}
              title={post.title}
              views={post.views}
              postTag={post.postTag}
              commentCount={post.commentCount}
              likeCount={post.likeCount}
              createdAt={post?.createdAt}
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
