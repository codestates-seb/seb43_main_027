import ButtonEl from '../elements/Button';

const CreateChannelButton = ({ text, onClick } : { text: string, onClick: React.MouseEventHandler }) => {
  return (
    <StyledCreateChannelButton
      onClick={onClick}
    >
      { text }
    </StyledCreateChannelButton>
  );
};

export default CreateChannelButton;

const StyledCreateChannelButton = ButtonEl({
  fontSize: '17px',
  fontWeight: '600',
  padding: '10px 20px',
  hoverBg: 'var(--button-hover-color)',
});