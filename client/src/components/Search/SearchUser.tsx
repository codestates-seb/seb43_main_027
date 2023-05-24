import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// import { type UserType } from '../../types/dataTypes';
import { type PageInfoType } from '../../types/dataTypes';
import GameItem from '../CategoryGames/GameItem';

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
  console.log(searchUserInfo);
  return (
    <StyledSearchUserWrapper isPreview={isSelectTab === '전체' ? true : false}>
      {searchUserInfo.data.length > 0 && searchUserInfo.data[0].memberId > 0 ? (
        isSelectTab === '전체' ? (
          <div>전체</div>
        ) : (
          <div>item</div>
        )
      ) : (
        <StyledEmptyItem>검색 결과가 없습니다.</StyledEmptyItem>
      )}
    </StyledSearchUserWrapper>
  );
};

export default SearchUser;

const StyledSearchUserWrapper = styled.div<SearchUserWrapperType>`
  display: flex;

  ${(p) => (p.isPreview ? 'height:20%; align-items:center;' : 'height: 80%;')};
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
