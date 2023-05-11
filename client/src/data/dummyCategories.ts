type CategoryType = {
  categoryId: number;
  categoryName: string;
};

type Game = {
  gameId: number;
  gameName: string;
  downloadUrl: string;
  mainImgUrl: string;
  categories: CategoryType[];
};

type Slide = {
  key: number;
  image: string;
};

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
];

export const dummyGameData : Game[] = [
  {
    gameId: 1,
    gameName: '피파',
    downloadUrl: 'downloadUrl',
    mainImgUrl: 'https://m.gjcdn.net/game-thumbnail/1000/435648-bcpdubiq-v4.webp',
    categories: [
      {
        categoryId: 6,
        categoryName: 'RPG'
      },
      {
        categoryId: 7,
        categoryName: '아케이드'
      }
    ],
  },
  {
    gameId: 2,
    gameName: '던파',
    downloadUrl: 'downloadUrl',
    mainImgUrl: 'https://m.gjcdn.net/game-thumbnail/1000/164227-f2fvqeih-v4.webp',
    categories: [
      {
        categoryId: 1,
        categoryName: 'FPS'
      },
      {
        categoryId: 2,
        categoryName: '힐링'
      },
      {
        categoryId: 3,
        categoryName: '공포'
      }
    ],
  },
  {
    gameId: 3,
    gameName: '리그오브레전드',
    downloadUrl: 'downloadUrl',
    mainImgUrl: 'https://m.gjcdn.net/game-thumbnail/1000/348021-crop10_0_598_331-w5vedzau-v4.webp',
    categories: [
      {
        categoryId: 1,
        categoryName: 'FPS'
      },
      {
        categoryId: 2,
        categoryName: '힐링'
      },
      {
        categoryId: 3,
        categoryName: '공포'
      }
    ],
  },
];

export const slides : Slide[] = [
  {
    key: 0,
    image: 'https://m.gjcdn.net/game-thumbnail/1000/435648-bcpdubiq-v4.webp'
  },
  {
    key: 1,
    image: 'https://m.gjcdn.net/game-thumbnail/1000/164227-f2fvqeih-v4.webp'
  },
  {
    key: 2,
    image:
      'https://m.gjcdn.net/game-thumbnail/1000/348021-crop10_0_598_331-w5vedzau-v4.webp'
  },
  {
    key: 3,
    image: 'https://m.gjcdn.net/game-thumbnail/1000/352743-an4gjy3v-v4.webp'
  },
  {
    key: 4,
    image: 'https://m.gjcdn.net/game-thumbnail/1000/415163-pm6dqtkg-v4.webp'
  },
];