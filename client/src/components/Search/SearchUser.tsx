import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

import { type PageInfoType } from '../../types/dataTypes';
import UserItem from '../UserInfo/UserItem';
import SearchUserTop from './SearchUserTop';
import Pagination from 'react-js-pagination';

interface SearchUserType {
  isSelectTab: '전체' | '유저';
  searchUserInfo: SearchUserInfo;
  searchQuery: string | null;
}

export interface UserType {
  memberId: number;
  email: string;
  userName: string;
  imageUrl: string;
  followerCount: number;
  followingCount: number;
}

export interface SearchUserInfo {
  data: UserType[];
  pageInfo: PageInfoType;
}

interface SearchUserWrapperType {
  isPreview: boolean;
}

const SearchUser = ({
  isSelectTab,
  searchUserInfo,
  searchQuery
}: SearchUserType) => {
  const [isMyFollowingList, setIsMyFollowingList] = useState<number[]>([]);
  const [reordered, setReordered] = useState<UserType[]>([]);
  const [isPage, setPage] = useState<number>(1);
  const [isSize, setSize] = useState<number>(20);
  const [isToTalSize, setTotalSize] = useState<number>(0);
  const navigate = useNavigate();
  useEffect(() => {
    setPage(1);
  }, [isSelectTab]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (searchUserInfo.data.length === 0) {
        try {
          if (searchQuery) {
            setSize(searchUserInfo.pageInfo.size);
            setTotalSize(searchUserInfo.pageInfo.totalSize);
          } else {
            const apiUrl = `${process.env.REACT_APP_API_URL}/api/members/search?q=&page=${isPage}&size=${isSize}`;

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
            searchUserInfo.data = reordered;
          }
        } catch (error) {
          return navigate('/error');
        }
      } else {
        setSize(searchUserInfo.pageInfo.size);
        setTotalSize(searchUserInfo.pageInfo.totalSize);
      }
    };
    fetchUserData();
  }, [searchUserInfo, isPage]);

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const isFollowingIdIncluded = (memberId: number) => {
    return isMyFollowingList.includes(memberId);
  };
  let loginedId = -1;
  const token = localStorage.getItem('access_token');
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      loginedId = Number(JSON.parse(user).memberId);
    }
  }, [token]);

  useEffect(() => {
    if (loginedId !== -1) {
      if (
        searchUserInfo.data.length > 0 &&
        searchUserInfo.data[0].memberId !== -1
      ) {
        const MyFollowingData = async () => {
          try {
            const res = await axios.get(
              `${process.env.REACT_APP_API_URL}/api/members/${loginedId}/following`
            );
            const followData = res.data.data;
            const followingIdList = followData.map(
              (item: any) => item.memberId
            );
            setIsMyFollowingList([...followingIdList]);
          } catch (error) {
            console.log(error);
          }
        };
        MyFollowingData();
      }
    }
  }, [searchUserInfo, loginedId]);

  return (
    <StyledSearchUserWrapper isPreview={isSelectTab === '전체' ? true : false}>
      {isSelectTab === '전체' && <SearchUserTop />}
      <StyledProfileContainer isPreview={isSelectTab === '전체' ? true : false}>
        {searchUserInfo.data.length > 0 &&
        searchUserInfo.data[0].memberId > 0 ? (
          isSelectTab === '전체' ? (
            searchUserInfo.data.slice(0, 5).map((item, index) => {
              return (
                <UserItem
                  key={index}
                  imageUrl={item.imageUrl}
                  userName={item.userName}
                  followerCount={item.followerCount}
                  followingCount={item.followingCount}
                  memberId={String(item.memberId)}
                  isFollowingIdIncluded={isFollowingIdIncluded(item.memberId)}
                />
              );
            })
          ) : (
            searchUserInfo.data.map((item, index) => {
              return (
                <UserItem
                  key={index}
                  imageUrl={item.imageUrl}
                  userName={item.userName}
                  followerCount={item.followerCount}
                  followingCount={item.followingCount}
                  memberId={String(item.memberId)}
                  isFollowingIdIncluded={isFollowingIdIncluded(item.memberId)}
                />
              );
            })
          )
        ) : (
          <StyledEmptyItem>검색 결과가 없습니다.</StyledEmptyItem>
        )}
      </StyledProfileContainer>
      <StyledPaginationBox>
        {searchUserInfo.data.length > 0 &&
          searchUserInfo.data[0].memberId > 0 &&
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
    </StyledSearchUserWrapper>
  );
};

export default SearchUser;

const StyledSearchUserWrapper = styled.div<SearchUserWrapperType>`
  display: flex;
  flex-direction: column;
  background-color: #cfecee;
  margin: 3rem;
  border-radius: 25px;
  ${(p) => (p.isPreview ? 'height:30%; align-items:center;' : 'height: 80%;')};
`;

const StyledProfileContainer = styled.div<SearchUserWrapperType>`
  display: flex;
  justify-content: flex-start;
  ${({ isPreview }) =>
    isPreview ? 'padding: 0 3rem 2rem 3rem;' : 'padding: 3rem;'}
  gap: 2rem;
  width: 100%;
  flex-wrap: wrap;
  > div {
    background-color: white;
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

const StyledPaginationBox = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledPagination = styled.div`
  padding: 0px 30px 50px 30px;
`;
