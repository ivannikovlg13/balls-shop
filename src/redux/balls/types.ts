export type Ball = {
  id: string;
  name: string;
  imageUrl: string;
  sizes: number[];
  types: number[];
  price: number;
};
export enum STATUS {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface BallsSliceState {
  items: Ball[];
  status: STATUS;
}
export type SearchBallParams = {
  currentPage: string;
  category: string;
  sortBy: string;
  order: string;
  search: string;
};
