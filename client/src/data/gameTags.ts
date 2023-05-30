//  데이터 패칭 받는 것과 순서가 다름. refactoring 필요.
const gameTags: string[] = [
  '액션',
  '어드벤쳐',
  '카드 및 보드게임',
  '개그',
  'FPS',
  '핵앤슬',
  '힐링',
  '공포',
  'MOBA',
  '모바일',
  '멀티',
  '플랫포머',
  '퍼즐',
  '로그라이크',
  'RPG',
  '슈팅',
  '시뮬레이션',
  '스포츠',
  '스토리',
  '전략',
  '생존',
  '3D 게임',
  '2D 게임',
  '턴제',
  '기타'
];

const textTranslate: { [key: string]: string } = {
  FPS: 'FPS',
  RPG: 'RPG',
  어드벤쳐: 'ADVENTURE',
  슈팅: 'SHOOTING',
  시뮬레이션: 'SIMULATION',
  액션: 'ACTION',
  스포츠: 'SPORTS',
  전략: 'STRATEGY',
  '카드 및 보드게임': 'CARD_AND_BOARD',
  퍼즐: 'PUZZLE',
  스토리: 'STORY',
  힐링: 'HEALING',
  공포: 'HORROR',
  개그: 'COMEDY',
  핵앤슬: 'HACK_AND_SLASH',
  턴제: 'TURN_BASED',
  생존: 'SURVIVAL',
  멀티: 'MULTIPLAYER',
  로그라이크: 'ROGUELIKE',
  플랫포머: 'PLATFORMER',
  '2D 게임': 'TWO_D_GAME',
  '3D 게임': 'THREE_D_GAME',
  MOBA: 'MOBA',
  모바일: 'MOBILE',
  기타: 'OTHER'
};

export const gameTagInfo = {
  gameTags,
  textTranslate
};
