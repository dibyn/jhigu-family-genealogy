export interface Root {
  id: string | number;
  gender: string;
  name?: string;
  pids?: (number | string)[];
  mid?: string | number;
  fid?: string | number;
}
export type ResponseError = {
  message: string
}
