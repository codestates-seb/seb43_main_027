import styled from 'styled-components';
import Member from './Member';
import { MemberType } from '../../types/propsTypes';
import {
  Gi3DHammer,
  GiCastle,
  GiDiamondsSmile,
  GiGroundSprout,
  GiHumanTarget,
  GiKnifeThrust
} from 'react-icons/gi';

const MemberList: MemberType[] = [
  {
    src: 'https://github.com/crowwan',
    name: '김진완',
    type: 'Front-End',
    icon: <GiDiamondsSmile size={'3rem'} />
  },
  {
    src: 'https://github.com/nincoding',
    name: '한수지',
    type: 'Front-End',
    icon: <GiCastle size={'3rem'} />
  },
  {
    src: 'https://github.com/UseonJ',
    name: '정우선',
    type: 'Front-End',
    icon: <GiGroundSprout size={'3rem'} />
  },
  {
    src: 'https://github.com/yeonssu',
    name: '이연수',
    type: 'Back-End',
    icon: <GiHumanTarget size={'3rem'} />
  },
  {
    src: 'https://github.com/zini9188',
    name: '박호제',
    type: 'Back-End',
    icon: <GiKnifeThrust size={'3rem'} />
  },
  {
    src: 'https://github.com/wooniverse7',
    name: '우성일',
    type: 'Back-End',
    icon: <Gi3DHammer size={'3rem'} />
  }
];

const Footer = () => {
  return (
    <StyledContainer>
      <StyledTitle>Code Jesus</StyledTitle>
      <StyledDescription>
        Codestates Front-End & Back-End Bootcamp 43th
      </StyledDescription>
      <StyledFlexBox>
        {MemberList.map((member) => (
          <Member info={member} key={member.name} />
        ))}
      </StyledFlexBox>
    </StyledContainer>
  );
};

export default Footer;

const StyledContainer = styled.footer`
  display: flex;
  width: 100vw;
  background-color: var(--cyan-dark-900);
  color: white;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  gap: 1rem;
  flex-direction: column;
`;
const StyledTitle = styled.h2`
  font-weight: bold;
  font-size: 1.5rem;
`;
const StyledDescription = styled.p`
  font-size: 1.2rem;
  color: var(--cyan-dark-500);
`;
const StyledFlexBox = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: space-around;
  margin-top: 1rem;
  flex-wrap: wrap;
`;
