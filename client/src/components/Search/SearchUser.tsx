import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// import { type UserType } from '../../types/dataTypes';

import GameItem from '../CategoryGames/GameItem';

interface SearchUserType {
  isSelectTab: '전체' | '유저';
  searchUserInfo: any[];
}

interface SearchUserWrapperType {
  isPreview: boolean;
}

const SearchUser = ({ isSelectTab, searchUserInfo }: SearchUserType) => {
  return (
    <StyledSearchUserWrapper isPreview={isSelectTab === '전체' ? true : false}>
      {searchUserInfo.length > 0 ? (
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
  flex-direction: ${(p) => (p.isPreview ? 'row' : 'column')};
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
