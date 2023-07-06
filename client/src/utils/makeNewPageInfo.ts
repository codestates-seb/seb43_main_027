import { GameType, PageInfoType } from '../types/dataTypes';

export const makeNewPageInfo = (
  data: GameType[],
  pageInfo: PageInfoType,
  curPage: number
): [number, number, PageInfoType] => {
  const newPageInfo = {
    ...pageInfo,
    page: curPage !== pageInfo.page ? curPage : 1,
    totalSize: data.length,
    totalPage: Math.ceil(data.length / 14)
  };

  const startInd = (newPageInfo.page - 1) * newPageInfo.size;
  const endInd = startInd + newPageInfo.size;
  return [startInd, endInd, newPageInfo];
};
