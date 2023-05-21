import styled from 'styled-components';

import { useParams } from 'react-router-dom';

interface SearchType {
  searchFilter?: string;
}

const Search = ({ searchFilter }: SearchType) => {
  const searchParams = useParams();

  const searchEngine = () => {
    console.log(searchParams);
  };
  return <></>;
};

export default Search;
