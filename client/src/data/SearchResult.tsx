export interface EmptyData {
  data: object[];
  pageinfo: {
    page: 1;
    size: 10;
    totalSize: 0;
    totalPage: 0;
  };
}

export const emptyData = [
  {
    data: [],
    pageinfo: {
      page: 1,
      size: 10,
      totalSize: 0,
      totalPage: 0
    }
  },
  {
    data: [],
    pageinfo: {
      page: 1,
      size: 10,
      totalSize: 0,
      totalPage: 0
    }
  },
  {
    data: [],
    pageinfo: {
      page: 1,
      size: 10,
      totalSize: 0,
      totalPage: 0
    }
  }
];
