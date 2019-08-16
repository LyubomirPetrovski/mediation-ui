
export class Paging {
  public static generateDefaultPaging(): Paging {
    return <Paging> { page: FIRST_PAGE, size: DEFAULT_PAGE_SIZE, total: 0 };
  }

  constructor(
    public page: number = FIRST_PAGE,
    public size: number = DEFAULT_PAGE_SIZE,
    public total?
  ) { }
}

export const DEFAULT_PAGE_SIZE = 25;
export const FIRST_PAGE = 1;

// Pagination is 1-based. (first page = 1)

export class Pagination {
  page: number;
  total: number;
  size: number;
  pageLinks: number[];

  constructor() {
    this.page = FIRST_PAGE;
    this.total = 0;
    this.size = DEFAULT_PAGE_SIZE;
    this.pageLinks = [];
  }
}



