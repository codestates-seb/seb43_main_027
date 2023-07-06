import React from 'react';
import { PageInfoType } from '../../types/dataTypes';
import Pagination from 'react-js-pagination';
import styled from 'styled-components';

const GameCardPagination = ({
  curPage,
  gameLength,
  pageInfo,
  onPageClickHandler
}: {
  curPage: number;
  gameLength: number;
  pageInfo: PageInfoType;
  onPageClickHandler: (page: number) => void;
}) => {
  if (gameLength <= 0) return <></>;
  return (
    <StyledPagination>
      <Pagination
        activePage={curPage}
        itemsCountPerPage={pageInfo.size}
        totalItemsCount={pageInfo.totalSize}
        pageRangeDisplayed={5}
        prevPageText={'‹'}
        nextPageText={'›'}
        onChange={onPageClickHandler}
      />
    </StyledPagination>
  );
};

export default GameCardPagination;

const StyledPagination = styled.div`
  padding: 20px;
`;
