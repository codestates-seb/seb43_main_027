import ButtonEl from '../elements/Button';

const Badge = ({ text }: { text: string }) => {
  return <BadgeBtn onClick={() => console.log('test')}>{text}</BadgeBtn>;
};

const BadgeBtn = ButtonEl({
  fontSize: '.8rem',
  fontWeight: '400',
  border: 'none',
  padding: '.4rem 1.2rem',
  hoverBg: 'var(--cyan-dark-700)',
  margin: 'none'
});

export default Badge;
