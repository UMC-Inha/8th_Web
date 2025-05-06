export type CommonResponse<T> = {
  status: BigIntToLocaleStringOptions;
  statusCode: number;
  message: string;
  data: T;
};
