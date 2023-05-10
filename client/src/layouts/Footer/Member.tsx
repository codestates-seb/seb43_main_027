import styled from 'styled-components';

import { AiOutlineGithub } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import { MemberType } from '../../types/propsTypes';

const Member = ({ info }: { info: MemberType }) => {
  return (
    <StyledContainer>
      <Link to={info.src}>
        <AiOutlineGithub size={'3rem'} />
      </Link>
      <StyledSpan>{info.name}</StyledSpan>
      <StyledBadge>{info.type}</StyledBadge>
    </StyledContainer>
  );
};

export default Member;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const StyledSpan = styled.span`
  color: white;
`;
const StyledBadge = styled.div`
  border: 1px solid var(--cyan-dark-500);
  border-radius: 50px;
  color: var(--cyan-dark-500);
  padding: 0.2rem 0.8rem;
`;
