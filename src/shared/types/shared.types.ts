export enum StatusValue {
  'success' = 1,
  'failed' = 0,
}
export type Status = {
  status: StatusValue;
  message?: string;
};
