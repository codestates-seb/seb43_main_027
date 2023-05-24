import styled from 'styled-components';

import { IoIosRefresh } from 'react-icons/io';
import { gameTagInfo } from '../../data/gameTags';
const { gameTags } = gameTagInfo;

import TagButton, { StyledButton } from './TagButton';
import TagIndicator from './TagIndicator';

interface TagsContainer {
  tagStates: boolean[];
  setTagStates: React.Dispatch<React.SetStateAction<boolean[]>>;
}

const GameTagsContainer = ({ tagStates, setTagStates }: TagsContainer) => {
  // 태그 초기화
  const initializeTags = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const tagsInitialStates: boolean[] = new Array(gameTags.length).fill(false);
    setTagStates(tagsInitialStates);
    console.log(tagStates);
  };

  return (
    <StyledButtonContainer>
      <StyledResetButton styleId={11} onClick={initializeTags}>
        <IoIosRefresh size={'2rem'} className='icon' />
      </StyledResetButton>
      {gameTags.map((tag, index) => (
        <TagButton
          key={index}
          tagIndex={index}
          tagStates={tagStates}
          setTagStates={setTagStates}
        >
          {tag}
        </TagButton>
      ))}
      {/* 태그 마지막 줄 간격 조절을 위한 투명 블럭 */}
      <StyledBlock />
      {/* 태그가 몇 개 선택되었는지 알려주는 indicator */}
      <TagIndicator tagStages={tagStates} />
    </StyledButtonContainer>
  );
};

export default GameTagsContainer;

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  .inactive {
    background-color: var(--category-tag-bg-default);
    color: var(--category-tag-color-default);

    &:hover {
      background-color: gold;
    }
  }

  svg {
    @media screen and (max-width: 650px) {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
`;

const StyledResetButton = styled(StyledButton)`
  height: 3rem;

  &:hover {
    background-color: var(--button-inactive-hover-color);
  }

  @media screen and (max-width: 650px) {
    height: 2.5rem;
  }
`;

//  태그 마지막 줄 간격 조절을 위한 투명 블럭
const StyledBlock = styled.div`
  width: 15rem;
`;
