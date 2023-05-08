import styled from 'styled-components';

type Hint = {
  title: string;
  value: string;
};

const searchHintList: Hint[] = [
  {
    title: 'game',
    value: '게임에서 검색하기'
  },
  {
    title: 'user',
    value: '유저에서 검색하기'
  },
  {
    title: 'content',
    value: '게시글에서 검색하기'
  }
];

const SearchHint = () => {
  return (
    <StyledContainer>
      {searchHintList.map((item) => (
        <SearchHintItem item={item} key={item.title + item.value} />
      ))}
    </StyledContainer>
  );
};

const SearchHintItem = ({ item }: { item: Hint }) => {
  return (
    <StyledListItem key={item.title + item.value}>
      <strong>
        {item.title}:{item.title}
      </strong>{' '}
      {item.value}
    </StyledListItem>
  );
};

export default SearchHint;

const StyledContainer = styled.div`
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.06), 0 2px 6px hsla(0, 0%, 0%, 0.06),
    0 3px 8px hsla(0, 0%, 0%, 0.09);
  background-color: #fff;
  width: 100%;
  min-width: 250px;
  padding: 1rem;
  border-radius: 3px;
  transform: translateY(1rem);
  border: 1px solid var(--cyan-dark-500);
`;
const StyledListItem = styled.li`
  list-style: none;
  padding: 0.5rem 0;
  width: 50%;
  font-size: 1.2rem;
  color: rgba(0, 0, 0, 0.5);
  > strong {
    font-weight: bold;
    color: black;
  }
  @media screen and (max-width: 780px) {
    width: 100%;
  }
`;
