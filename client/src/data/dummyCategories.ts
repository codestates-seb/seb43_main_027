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
        },
        {
          categoryId: 16,
          categoryName: 'TURN_BASED'
        },
        {
          categoryId: 21,
          categoryName: 'TWO_D_PLATFORMER'
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

// 특정 게임 조회 더미- api/games/{game_id}
export const dummyGameData = {
  data: {
    gameId: 1,
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
      },
      {
        categoryId: 16,
        categoryName: 'TURN_BASED'
      },
      {
        categoryId: 21,
        categoryName: 'TWO_D_PLATFORMER'
      },
    ],
    followerCount: 30,
    createdAt: '2023-03-01T18:38:39'
  }
};

export const dummyFollowedGames = {
  data: [
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
        },
        {
          categoryId: 16,
          categoryName: 'TURN_BASED'
        },
        {
          categoryId: 21,
          categoryName: 'TWO_D_PLATFORMER'
        },
      ],
      followerCount: 30,
      createdAt: '2023-03-01T18:38:39'
    },
    {
      gameId: 1,
      gameName: '두달전게임',
      downloadUrl: 'download',
      mainImgUrl: 'https://m.gjcdn.net/game-thumbnail/1000/415163-pm6dqtkg-v4.webp',
      categories: [
        {
            categoryId: 1,
            categoryName: 'FPS'
        },
        {
          categoryId: 2,
          categoryName: 'RPG'
        },
        {
          categoryId: 16,
          categoryName: 'TURN_BASED'
        },
      ],
      followerCount: 30,
      createdAt: '2023-03-01T18:38:39'
    }
  ]
};

