type CategoryType = {
  categoryId: number;
  categoryName: string;
};

// 모든 카테고리 조회 api 대체 api/categories
export const dummyCategories : CategoryType[] = [
  {
    categoryId: 1,
    categoryName: 'FPS'
  },
  {
    categoryId: 2,
    categoryName: 'ACTION'
  },
  {
    categoryId: 3,
    categoryName: 'RPG'
  },
  {
    categoryId: 4,
    categoryName: 'ACTION'
  },
  {
    categoryId: 5,
    categoryName: 'HORRER'
  }
];

// 특정 카테고리의 모든 게임 조회 더미- api/categories/{ctegory_id}/games
// 데이터에 팔로우 수가 빠져있음 followerCount 데이터가 필요함

export const dummyCategoriesGames = {
  'data': [
    {
      gameId: 1,
      gameName: '게임1',
      downloadUrl: 'downloadUrl',
      mainImgUrl: 'https://m.gjcdn.net/game-thumbnail/1000/435648-bcpdubiq-v4.webp',
      followerCount: 1,
      categories: [
        {
          categoryId: 1,
          categoryName: 'FPS'
        },
        {
          categoryId: 2,
          categoryName: 'SPORTS'
        },
        {
          categoryId: 3,
          categoryName: 'RPG'
        },
        {
          categoryId: 4,
          categoryName: 'ACTION'
        },
        {
          categoryId: 5,
          categoryName: 'HORRER'
        },
        {
          categoryId: 6,
          categoryName: 'COMIC'
        }
      ],
    },
    {
      gameId: 2,
      gameName: '게임2',
      downloadUrl: 'downloadUrl',
      mainImgUrl: 'https://m.gjcdn.net/game-thumbnail/1000/164227-f2fvqeih-v4.webp',
      followerCount: 2,
      categories: [
        {
          categoryId: 1,
          categoryName: 'FPS'
        },
        {
          categoryId: 2,
          categoryName: 'SPORTS'
        },
        {
          categoryId: 3,
          categoryName: 'RPG'
        },
      ],
    },
    {
      gameId: 3,
      gameName: '게임3',
      downloadUrl: 'downloadUrl',
      mainImgUrl: 'https://m.gjcdn.net/game-thumbnail/1000/352743-an4gjy3v-v4.webp',
      followerCount: 3,
      categories: [
        {
          categoryId: 1,
          categoryName: 'FPS'
        },
        {
          categoryId: 4,
          categoryName: 'ACTION'
        },
      ],
    },
    {
      gameId: 4,
      gameName: '게임4',
      downloadUrl: 'downloadUrl',
      mainImgUrl: 'https://m.gjcdn.net/game-thumbnail/1000/348021-crop10_0_598_331-w5vedzau-v4.webp',
      followerCount: 4,
      categories: [
        {
          categoryId: 1,
          categoryName: 'FPS'
        },
        {
          categoryId: 4,
          categoryName: 'ACTION'
        },
        {
          categoryId: 5,
          categoryName: 'HORRER'
        }
      ],
    },
    {
      gameId: 5,
      gameName: '게임5',
      downloadUrl: 'downloadUrl',
      mainImgUrl: 'https://m.gjcdn.net/game-thumbnail/1000/415163-pm6dqtkg-v4.webp',
      followerCount: 5,
      categories: [
        {
          categoryId: 1,
          categoryName: 'FPS'
        },
        {
          categoryId: 4,
          categoryName: 'ACTION'
        },
        {
          categoryId: 5,
          categoryName: 'HORRER'
        }
      ],
    },
    {
      gameId: 6,
      gameName: '게임6',
      downloadUrl: 'downloadUrl',
      mainImgUrl: 'https://m.gjcdn.net/game-thumbnail/900/372753-weg49mcv-v4.webp',
      followerCount: 6,
      categories: [
        {
          categoryId: 1,
          categoryName: 'FPS'
        },
        {
          categoryId: 2,
          categoryName: 'SPORTS'
        },
      ],
    },
  ]
};