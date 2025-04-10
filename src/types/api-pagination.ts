export interface ApiPagination<T> {
  data: T[];
  // pageData: {
  //   total: {
  //     elements: number;
  //     pages: number;
  //   };
  //   currentPage: {
  //     elements: number;
  //     pageIndex: number;
  //     pageSize: number;
  //     isFirst: boolean;
  //     isLast: boolean;
  //     hasNext: boolean;
  //     hasPrevious: boolean;
  //   };
  // };
}
