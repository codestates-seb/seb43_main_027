type CategoryType = {
  categoryId: number;
  categoryName: string;
};

// 모든 카테고리 조회 api 대체 api/categories
export const dummyCategories : CategoryType[] = [
  {
    categoryId: 6,
    categoryName: 'ACTION'
  },
  {
    categoryId: 3,
    categoryName: 'ADVENTURE'
  },
  {
    categoryId: 9,
    categoryName: 'CARD_AND_BOARD'
  },
  {
    categoryId: 14,
    categoryName: 'COMEDY'
  },
  {
    categoryId: 1,
    categoryName: 'FPS'
  },
  {
    categoryId: 15,
    categoryName: 'HACK_AND_SLASH'
  },
  {
    categoryId: 12,
    categoryName: 'HEALING'
  },
  {
    categoryId: 13,
    categoryName: 'HORROR'
  },
  {
    categoryId: 23,
    categoryName: 'MOBA'
  },
  {
    categoryId: 24,
    categoryName: 'MOBILE'
  },
  {
    categoryId: 18,
    categoryName: 'MULTIPLAYER'
  },
  {
    categoryId: 25,
    categoryName: 'OTHER'
  },
  {
    categoryId: 20,
    categoryName: 'PLATFORMER'
  },
  {
    categoryId: 10,
    categoryName: 'PUZZLE'
  },
  {
    categoryId: 19,
    categoryName: 'ROGUELIKE'
  },
  {
    categoryId: 2,
    categoryName: 'RPG'
  },
  {
    categoryId: 4,
    categoryName: 'SHOOTING'
  },
  {
    categoryId: 5,
    categoryName: 'SIMULATION'
  },
  {
    categoryId: 7,
    categoryName: 'SPORTS'
  },
  {
    categoryId: 11,
    categoryName: 'STORY'
  },
  {
    categoryId: 8,
    categoryName: 'STRATEGY'
  },
  {
    categoryId: 17,
    categoryName: 'SURVIVAL'
  },
  {
    categoryId: 22,
    categoryName: 'THREE_D_PLATFORMER'
  },
  {
    categoryId: 16,
    categoryName: 'TURN_BASED'
  },
  {
    categoryId: 21,
    categoryName: 'TWO_D_PLATFORMER'
  }
];

// 특정 카테고리의 모든 게임 조회 더미- api/categories/{ctegory_id}/games
export const dummyGamesData = {
  data: [
  {
      gameId: 1,
      gameName: '게임2',
      downloadUrl: 'download',
      mainImgUrl: 'https://codejejus-deploy.s3.ap-northeast-2.amazonaws.com/images/defaultGameImg.png',
      categories: [
          {
              categoryId: 1,
              categoryName: 'FPS'
          },
          {
              'categoryId': 2,
              'categoryName': 'RPG'
          }
      ],
      followerCount: 0,
      createdAt: '2023-05-15T18:38:39'
  },
  {
    gameId: 2,
    gameName: '몇일전게임',
    downloadUrl: 'download',
    mainImgUrl: 'https://m.gjcdn.net/game-thumbnail/900/372753-weg49mcv-v4.webp',
    categories: [
        {
            categoryId: 1,
            categoryName: 'FPS'
        },
        {
            'categoryId': 2,
            'categoryName': 'RPG'
        }
    ],
    followerCount: 5,
    createdAt: '2023-05-10T18:38:39'
  },
  {
    gameId: 3,
    gameName: '한달전게임',
    downloadUrl: 'download',
    mainImgUrl: 'https://m.gjcdn.net/game-thumbnail/1000/415163-pm6dqtkg-v4.webp',
    categories: [
        {
            categoryId: 1,
            categoryName: 'FPS'
        },
        {
            'categoryId': 2,
            'categoryName': 'RPG'
        }
    ],
    followerCount: 30,
    createdAt: '2023-03-01T18:38:39'
  },
],
pageInfo: {
    page: 1,
    size: 10,
    totalSize: 1,
    totalPage: 1
  }
}