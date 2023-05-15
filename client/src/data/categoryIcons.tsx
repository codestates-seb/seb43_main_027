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
  ACTION: ReactElement;
  ADVENTURE: ReactElement;
  CARD_AND_BOARD: ReactElement;
  COMEDY: ReactElement;
  FPS: ReactElement;
  HACK_AND_SLASH: ReactElement;
  HEALING: ReactElement;
  HORROR: ReactElement;
  MOBA: ReactElement;
  MOBILE: ReactElement;
  MULTIPLAYER: ReactElement;
  PLATFORMER: ReactElement;
  PUZZLE: ReactElement;
  ROGUELIKE: ReactElement;
  RPG: ReactElement;
  SHOOTING: ReactElement;
  SIMULATION: ReactElement;
  SPORTS: ReactElement;
  STORY: ReactElement;
  STRATEGY: ReactElement;
  SURVIVOR: ReactElement;
  THREE_D_PLATFORMER: ReactElement;
  TWO_D_PLATFORMER: ReactElement;
  TURN_BASED: ReactElement;
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
  THREE_D_PLATFORMER: <GiPlatform />,
  TWO_D_PLATFORMER: <GiLaddersPlatform />,
  TURN_BASED: <GiEmptyChessboard />
};

export default iconData;
