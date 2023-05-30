import styled from 'styled-components';
import { Link } from 'react-router-dom';

type HeaderProps = {
  path: string;
  text: string;
  isSignupBtn: boolean;
};

const HeaderBtn = ({ path, text, isSignupBtn }: HeaderProps) => {
  return (
    <Link to={path}>
      <StyledBtn isSignup={isSignupBtn}>{text}</StyledBtn>
    </Link>
  );
};

export default HeaderBtn;
const StyledBtn = styled.button`
  width: fit-content;
  word-break: keep-all;
  background-color: ${(props: { isSignup: boolean }) =>
    props.isSignup ? 'white' : 'var(--cyan-dark-500)'};
  color: ${(props: { isSignup: boolean }) =>
    props.isSignup ? 'var(--cyan-dark-500)' : 'white'};
  border: ${(props: { isSignup: boolean }) =>
    `1px solid ${props.isSignup ? 'var(--cyan-dark-500)' : 'white'}`};
  padding: 0.5rem 1.3rem;
  border-radius: 20px;
`;
