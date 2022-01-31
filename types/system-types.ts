export interface RequestResult<T> {
  data: T | null;
  error: string | null;
}

export interface Validators {
  emptyStringValidator?: boolean;
  minLengthValidator?: number;
  maxLengthValidator?: number;
}

export interface PostRequestOptions {
  token?: string | null;
  contentType?: string;
  serialize?: boolean;
}
