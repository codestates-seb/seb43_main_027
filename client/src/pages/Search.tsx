import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { useSearchParams } from 'react-router-dom';

import SearchUser, {
  SearchUserInfo,
  UserType
} from '../components/Search/SearchUser';
import SearchGame, { SearchGameInfo } from '../components/Search/SearchGame';
import SearchContents, {
  SearchContentsInfo
} from '../components/Search/SearchContents';
import SearchPagination from '../components/Search/SearchPagination';
import FilterTap from '../components/common/FilterTap';
import { searchFilterTab } from '../data/filterTapList';
import SkeletonComponent from '../components/common/SkeletonComponent';
import { EmptyData, emptyData } from '../data/SearchResult';

export interface SingleResponse {
  data: SearchGameInfo | SearchContentsInfo | SearchUserInfo;
  pageInfo: object;
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

  console.log(searchParams.get('q'));
  console.log(searchQuery);

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
        const slicedsearchQuery = searchQuery.slice(5);
        console.log(slicedsearchQuery);

        const fetchFilteredData = async () => {
          try {
            // Filter로 선택된 요청만 보냅니다.
            await axios(
              `${process.env.REACT_APP_API_URL}/api/${filtered}/search?q=${slicedsearchQuery}`
            ).then((res) => {
              setIsLoading(false);
              console.log(res.data);
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
              `${process.env.REACT_APP_API_URL}/api/members/search?q=${searchQuery}`
            );
            const getRequestGame = axios(
              `${process.env.REACT_APP_API_URL}/api/games/search?q=${searchQuery}`
            );
            const getRequestContents = axios(
              `${process.env.REACT_APP_API_URL}/api/posts/search?q=${searchQuery}`
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
            console.log('여기도 동작');
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
            `${process.env.REACT_APP_API_URL}/api/members/search?q=${searchQuery}`
          );
          const getRequestGame = axios(
            `${process.env.REACT_APP_API_URL}/api/games/search?q=${searchQuery}`
          );
          const getRequestContents = axios(
            `${process.env.REACT_APP_API_URL}/api/posts/search?q=${searchQuery}`
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
  height: 100%;
`;

const StyledFilterWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
