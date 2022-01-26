export interface RequestResult<T> {
  data: T | null;
  error: string | null;
}
