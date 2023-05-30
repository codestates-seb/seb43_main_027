import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { useSearchParams } from 'react-router-dom';

import SearchUser, { SearchUserInfo } from '../components/Search/SearchUser';
import SearchGame, { SearchGameInfo } from '../components/Search/SearchGame';
import SearchContents, {
  SearchContentsInfo
} from '../components/Search/SearchContents';
import SearchPagination from '../components/Search/SearchPagination';
import FilterTap from '../components/common/FilterTap';
import { searchFilterTab } from '../data/filterTapList';
import SkeletonComponent from '../components/common/SkeletonComponent';

export interface SingleResponse {
  data: SearchGameInfo | SearchContentsInfo | SearchUserInfo;
  pageInfo: object;
}

const Search = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  let searchQuery = searchParams.get('q');
  //  '전체' = all, 1 = user, 2 = game, 3 = contents
  const [isSelectTab, setIsSelectTab] = useState<string>(searchFilterTab[0]);

  const handleClick = (item: string) => {
    setIsSelectTab(item);
  };

  type ResponseTuple = [
    SearchUserInfoData,
    SearchGameInfoData,
    SearchContentsInfoData
  ];
  interface SearchUserInfoData {
    data: SearchUserInfo;
  }
  interface SearchGameInfoData {
    data: SearchGameInfo;
  }
  interface SearchContentsInfoData {
    data: SearchContentsInfo;
  }

  const dummyUserData: SearchUserInfoData = {
    data: {
      data: [
        {
          memberId: -1,
          email: '',
          userName: '',
          imageUrl: '',
          followerCount: -1,
          followingCount: -1
        }
      ],
      pageInfo: { page: -1, size: -1, totalSize: -1, totalPage: -1 }
    }
  };

  const dummyGameData: SearchGameInfoData = {
    data: {
      data: [
        {
          gameId: -1,
          gameName: '',
          downloadUrl: '',
          mainImgUrl: '',
          followerCount: -1,
          categories: [],
          createdAt: ''
        }
      ],
      pageInfo: { page: -1, size: -1, totalSize: -1, totalPage: -1 }
    }
  };

  const dummyContentsData: SearchContentsInfoData = {
    data: {
      data: [
        {
          postId: -1,
          gameId: -1,
          userName: '',
          title: '',
          content: '',
          postTag: '',
          views: -1,
          commentCount: -1,
          likeCount: -1,
          createdAt: '',
          username: ''
        }
      ],
      pageInfo: { page: -1, size: -1, totalSize: -1, totalPage: -1 }
    }
  };

  const [data, setData] = useState<ResponseTuple>([
    dummyUserData,
    dummyGameData,
    dummyContentsData
  ]);
  const [filteredData, setFilteredData] = useState();

  useEffect(() => {
    const searchFilterOn = (
      searchQuery: string | null
    ): 'games' | 'members' | 'posts' | '' => {
      const games = /^game:/;
      const users = /^user:/;
      const posts = /^post:/;
      if (searchQuery === null) return '';
      if (games.test(searchQuery)) return 'games';
      if (users.test(searchQuery)) return 'members';
      if (posts.test(searchQuery)) return 'posts';
      return '';
    };

    if (searchQuery) {
      const filtered = searchFilterOn(searchQuery);
      if (
        filtered === 'games' ||
        filtered === 'members' ||
        filtered === 'posts'
      ) {
        // 원래 slicedsearchQuery라고 새로 변수만들어서 할당했는데 자식으로 넘겨주기에 두 종류이면 너무 넘겨주기가 어려워서 하나로 통일.
        searchQuery = searchQuery.slice(5);

        const fetchFilteredData = async () => {
          try {
            await axios(
              `${process.env.REACT_APP_API_URL}/api/${filtered}/search?q=${searchQuery}&page=1&size=20`
            ).then((res) => {
              setIsLoading(false);

              setData([dummyUserData, { data: res.data }, dummyContentsData]);
            });
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };

        fetchFilteredData();
      } else {
        const fetchMultipleData = async () => {
          try {
            // 여러 개의 POST 요청을 준비합니다.
            const getRequestUser = axios(
              `${process.env.REACT_APP_API_URL}/api/members/search?q=${searchQuery}&page=1&size=20`
            );
            const getRequestGame = axios(
              `${process.env.REACT_APP_API_URL}/api/games/search?q=${searchQuery}&page=1&size=20`
            );
            const getRequestContents = axios(
              `${process.env.REACT_APP_API_URL}/api/posts/search?q=${searchQuery}&page=1&size=20`
            );

            const responses = await Promise.all([
              getRequestUser,
              getRequestGame,
              getRequestContents
            ]);
            const extractedData: any = responses.map((response: any) => {
              return { data: response.data, pageInfo: response.pageinfo };
            });
            setData(extractedData);

            setIsLoading(false);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };

        fetchMultipleData();
      }
    } else {
      const fetchMultipleData = async () => {
        try {
          // 여러 개의 POST 요청을 준비합니다.
          const getRequestUser = axios(
            `${process.env.REACT_APP_API_URL}/api/members/search?q=${searchQuery}&page=1&size=20`
          );
          const getRequestGame = axios(
            `${process.env.REACT_APP_API_URL}/api/games/search?q=${searchQuery}&page=1&size=20`
          );
          const getRequestContents = axios(
            `${process.env.REACT_APP_API_URL}/api/posts/search?q=${searchQuery}&page=1&size=20`
          );

          const responses = await Promise.all([
            getRequestUser,
            getRequestGame,
            getRequestContents
          ]);
          const extractedData: any = responses.map((response: any) => {
            return { data: response.data, pageinfo: response.pageinfo };
          });
          setData(extractedData);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchMultipleData();
    }
  }, [searchQuery]);

  return (
    <StyledSearchWrapper>
      <StyledFilterWrapper>
        <FilterTap filterList={searchFilterTab} onClickFilter={handleClick} />
      </StyledFilterWrapper>
      {(isSelectTab === '전체' || isSelectTab === '유저') &&
        (isLoading || !data[0] || !data[0].data ? (
          <SkeletonComponent />
        ) : (
          <SearchUser
            isSelectTab={isSelectTab}
            searchUserInfo={data[0].data}
            searchQuery={searchQuery}
          />
        ))}
      {(isSelectTab === '전체' || isSelectTab === '게임') &&
        (isLoading || !data[1] || !data[1].data ? (
          <SkeletonComponent />
        ) : (
          <SearchGame
            isSelectTab={isSelectTab}
            searchGameInfo={data[1].data}
            searchQuery={searchQuery}
          />
        ))}
      {(isSelectTab === '전체' || isSelectTab === '게시글') &&
        (isLoading || !data[2] || !data[2].data ? (
          <SkeletonComponent />
        ) : (
          <SearchContents
            isSelectTab={isSelectTab}
            searchContentsInfo={data[2].data}
            searchQuery={searchQuery}
          />
        ))}
      {isSelectTab !== '전체' && <SearchPagination />}
    </StyledSearchWrapper>
  );
};

export default Search;

const StyledSearchWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledFilterWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
