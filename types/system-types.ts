export interface RequestResult<T> {
  data: T | null;
  error: string | null;
}

export interface FormData {
  [key: string]: {
    value: string;
    errors: string[];
    touched: boolean;
  };
}

export interface Validators {
  emptyStringValidator?: boolean;
  minLengthValidator?: number;
  maxLengthValidator?: number;
}
