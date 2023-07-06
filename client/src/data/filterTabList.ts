export const gameChannelFilterTab: string[] = [
  '최신순',
  '인기순',
  '조회순',
  '북마크 글',
  '내가 쓴 글'
];

export const categoryFilterTab: string[] = [
  '전체 게임',
  '인기 게임',
  '신규 게임',
  '생성 게임',
  '팔로우 게임'
];

export const searchFilterTab: string[] = ['전체', '유저', '게임', '게시글'];

export const userInfoTab: string[] = [
  '팔로워',
  '팔로잉',
  '생성 게임',
  '팔로우 게임',
  '작성글',
  '북마크 글'
];

export const otherInfoTab: string[] = [
  '팔로워',
  '팔로잉',
  '생성 게임',
  '팔로우 게임',
  '작성글'
];

export const getFilterPath = (memberId: number): { [key: string]: string } =>
  memberId === -1
    ? {
        인기: '/api/games/?filter=POPULAR',
        신규: '/api/games/?filter=NEW'
      }
    : {
        인기: '/api/games/?filter=POPULAR',
        신규: '/api/games/?filter=NEW',
        생성: `/api/members/${memberId}/creategame`,
        팔로우: `/api/members/${memberId}/mygame`
      };
