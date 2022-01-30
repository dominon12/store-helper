export interface RequestResult<T> {
  data: T | null;
  error: string | null;
}

export interface Validators {
  emptyStringValidator?: boolean;
  minLengthValidator?: number;
  maxLengthValidator?: number;
}
