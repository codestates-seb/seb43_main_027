import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { useSearchParams } from 'react-router-dom';

import SearchUser from '../components/Search/SearchUser';
import SearchGame from '../components/Search/SearchGame';
import SearchContents from '../components/Search/SearchContents';
import SearchPagination from '../components/Search/SearchPagination';
import FilterTap from '../components/common/FilterTap';
import { searchFilterTab } from '../data/filterTapList';
import SkeletonComponent from '../components/common/SkeletonComponent';

import { type GameType } from '../types/dataTypes';

interface SingleResponse {
  data: any[];
  pageinfo: object;
}

const Search = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q');
  //  '전체' = all, 1 = user, 2 = game, 3 = contents
  const [isSelectTab, setIsSelectTab] = useState<string>(searchFilterTab[0]);

  const handleClick = (item: string) => {
    setIsSelectTab(item);
  };

  const [data, setData] = useState<SingleResponse[]>([]);

  // const searchEngine = () => {
  //   console.log(searchParams);
  // };

  useEffect(() => {
    const fetchMultipleData = async () => {
      try {
        // 여러 개의 POST 요청을 준비합니다.
        const getRequestUser = axios(
          `${process.env.REACT_APP_API_URL}/api/members/search?${searchQuery}`
        );
        const getRequestGame = axios(
          `${process.env.REACT_APP_API_URL}/api/games/search?${searchQuery}`
        );
        const getRequestContents = axios(
          `${process.env.REACT_APP_API_URL}/api/posts/search?${searchQuery}`
        );

        const responses = await Promise.all([
          getRequestUser,
          getRequestGame,
          getRequestContents
        ]);
        const extractedData = responses.map((response: any) => {
          return { data: [...response.data], pageinfo: response.pageinfo };
        });
        setData(extractedData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMultipleData();
  }, []);

  console.log(`user data: ${data[0]}`);
  console.log(`game data: ${data[1]}`);
  console.log(`contents data: ${data[2]}`);

  return (
    <StyledSearchWrapper>
      <StyledFilterWrapper>
        <FilterTap filterList={searchFilterTab} onClickFilter={handleClick} />
      </StyledFilterWrapper>
      {(isSelectTab === '전체' || isSelectTab === '유저') &&
        (isLoading || !data[0] || !data[0].data ? (
          <SkeletonComponent />
        ) : (
          <SearchUser isSelectTab={isSelectTab} searchUserInfo={data[0].data} />
        ))}
      {(isSelectTab === '전체' || isSelectTab === '게임') &&
        (isLoading || !data[1] || !data[1].data ? (
          <SkeletonComponent />
        ) : (
          <SearchGame isSelectTab={isSelectTab} searchGameInfo={data[1].data} />
        ))}
      {(isSelectTab === '전체' || isSelectTab === '게시글') &&
        (isLoading || !data[2] || !data[2].data ? (
          <SkeletonComponent />
        ) : (
          <SearchContents
            isSelectTab={isSelectTab}
            searchContentsInfo={data[2].data}
          />
        ))}
      {isSelectTab !== '전체' && <SearchPagination />}
    </StyledSearchWrapper>
  );
};

export default Search;

const StyledSearchWrapper = styled.div`
  width: 100%;
`;

const StyledFilterWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
