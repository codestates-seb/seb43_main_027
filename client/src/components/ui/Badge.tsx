import styled from 'styled-components';

const Badge = ({ text }: { text: string }) => {
  return <StyledTag onClick={() => console.log('test')}>{text}</StyledTag>;
};

const StyledTag = styled.span`
  font-size: 12px;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 5px;
  color: var(--cyan-dark-500);
  background-color: var(--cyan-dark-100);
`;

export default Badge;
