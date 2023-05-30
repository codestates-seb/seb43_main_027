import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';

// import { type UserType } from '../../types/dataTypes';
import { type PageInfoType } from '../../types/dataTypes';
import UserItem from '../UserInfo/UserItem';
import SearchUserTop from './SearchUserTop';

interface SearchUserType {
  isSelectTab: '전체' | '유저';
  searchUserInfo: SearchUserInfo;
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

const SearchUser = ({ isSelectTab, searchUserInfo }: SearchUserType) => {
  const [isMyFollowingList, setIsMyFollowingList] = useState<number[]>([]);

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
      const MyFollowingData = async () => {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/members/${loginedId}/following`
          );
          const followData = res.data.data;
          const followingIdList = followData.map((item: any) => item.memberId);
          setIsMyFollowingList([...followingIdList]);
        } catch (error) {
          console.log(error);
        }
      };
      MyFollowingData();
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
