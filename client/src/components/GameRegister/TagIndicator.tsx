import styled from 'styled-components';
// import { FiCircle } from 'react-icons/fi';
// import { FaCircle } from 'react-icons/fa';

interface TagIndicatorType {
  tagStages: boolean[];
}
const TagIndicator = ({ tagStages }: TagIndicatorType) => {
  const selectedNum = tagStages.filter((t) => t === true).length;
  return (
    <StyledIndicatorContainer>
      {/* {selectedNum === 0 ? (
        <FiCircle size={'3rem'} />
      ) : (
        <FaCircle size={'3rem'} color={'var(--cyan-light-400)'} />
      )}
      {selectedNum <= 1 ? (
        <FiCircle size={'3rem'} />
      ) : (
        <FaCircle size={'3rem'} color={'var(--cyan-light-400)'} />
      )}
      {selectedNum <= 2 ? (
        <FiCircle size={'3rem'} />
      ) : (
        <FaCircle size={'3rem'} color={'var(--cyan-light-400)'} />
      )}
      {selectedNum <= 3 ? (
        <FiCircle size={'3rem'} />
      ) : (
        <FaCircle size={'3rem'} color={'var(--cyan-light-400)'} />
      )}
      {selectedNum <= 4 ? (
        <FiCircle size={'3rem'} />
      ) : (
        <FaCircle size={'3rem'} color={'var(--cyan-light-400)'} />
      )} */}
      {selectedNum >= 0 && <StyledSpan>{selectedNum} / 5</StyledSpan>}
    </StyledIndicatorContainer>
  );
};

export default TagIndicator;

const StyledIndicatorContainer = styled.div`
  display: flex;
  margin-right: 1rem;
`;

const StyledSpan = styled.span`
  font-size: 2rem;
`;
