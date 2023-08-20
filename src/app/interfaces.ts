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

// nodes: is the data source.
// The 'id' property is mandatory.
// pids: are the partner ids, represents connection between two partners (wife and husband).
// mid: mother id.
// fid: father id.
// gender: male or female.
// nodeBinding: 'name' property form the data source will be bound to 'field_0' ui element from the template.
