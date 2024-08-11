export interface IApiResource {
  url: string;
  name: string;
}

export interface IApiResourceList {
  count: number;
  next: string;
  previous: string;
  results: IApiResource[];
}
