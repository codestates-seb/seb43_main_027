import { ReactElement } from 'react';
import {
  Gi3DHammer,
  GiAk47,
  GiCardJackSpades,
  GiCastle,
  GiCaveEntrance,
  GiChessKing,
  GiDiamondsSmile,
  GiEmptyChessboard,
  GiFaceToFace,
  GiFlatPlatform,
  GiGhost,
  GiGroundSprout,
  GiHealthNormal,
  GiHumanTarget,
  GiIsland,
  GiKnifeThrust,
  GiLaddersPlatform,
  GiNestedHearts,
  GiOutbackHat,
  GiPlatform,
  GiPunch,
  GiPuzzle,
  GiSportMedal
} from 'react-icons/gi';
import { GoDeviceMobile } from 'react-icons/go';

type IconType = {
  [key: string]: ReactElement;
};

const iconData: IconType = {
  ACTION: <GiPunch />,
  ADVENTURE: <GiOutbackHat />,
  CARD_AND_BOARD: <GiCardJackSpades />,
  COMEDY: <GiDiamondsSmile />,
  FPS: <GiHumanTarget />,
  HACK_AND_SLASH: <Gi3DHammer />,
  HEALING: <GiHealthNormal />,
  HORROR: <GiGhost />,
  MOBA: <GiCastle />,
  MOBILE: <GoDeviceMobile />,
  MULTIPLAYER: <GiFaceToFace />,
  PLATFORMER: <GiFlatPlatform />,
  PUZZLE: <GiPuzzle />,
  ROGUELIKE: <GiCaveEntrance />,
  RPG: <GiKnifeThrust />,
  SHOOTING: <GiAk47 />,
  SIMULATION: <GiGroundSprout />,
  SPORTS: <GiSportMedal />,
  STORY: <GiNestedHearts />,
  STRATEGY: <GiChessKing />,
  SURVIVOR: <GiIsland />,
  THREE_D_GAME: <GiPlatform />,
  TWO_D_GAME: <GiLaddersPlatform />,
  TURN_BASED: <GiEmptyChessboard />
};

export const categoryText: { [key: string]: string } = {
  FPS: 'FPS',
  RPG: 'RPG',
  ADVENTURE: '어드벤쳐',
  SHOOTING: '슈팅',
  SIMULATION: '시뮬레이션',
  ACTION: '액션',
  SPORTS: '스포츠',
  STRATEGY: '전략',
  CARD_AND_BOARD: '카드 및 보드게임',
  PUZZLE: '퍼즐',
  STORY: '스토리',
  HEALING: '힐링',
  HORROR: '공포',
  COMEDY: '개그',
  HACK_AND_SLASH: '핵앤슬',
  TURN_BASED: '턴제',
  SURVIVAL: '생존',
  MULTIPLAYER: '멀티',
  ROGUELIKE: '로그라이크',
  PLATFORMER: '플랫포머',
  TWO_D_GAME: '2D 게임',
  THREE_D_GAME: '3D 게임',
  MOBA: 'MOBA',
  MOBILE: '모바일',
  OTHER: '기타'
};

const categoryData: { [key: string]: { text: string; icon: ReactElement } } =
  {};

for (const [k, v] of Object.entries(categoryText)) {
  categoryData[k] = {
    text: v,
    icon: iconData[k]
  };
}

export default categoryData;
