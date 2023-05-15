import { useState } from 'react';

import { gameTags } from '../../data/gameTags';

import TagButton from './TagButton';

const GameTagsContainer = () => {
  const [tagStates, setTagStates] = useState<boolean[]>([]);

  // 태그 초기화
  const initializeTags = () => {
    const tagsInitialStates: boolean[] = new Array(gameTags.length).fill(false);
    setTagStates(tagsInitialStates);
  };

  // 컴포넌트 렌더링
  return (
    <div>
      <button onClick={initializeTags}>태그 초기화</button>
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
    </div>
  );
};

export default GameTagsContainer;
