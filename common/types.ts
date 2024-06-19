export type CustomAPIResponse<T> = {
  status: number;
  data: T | Record<never, never>;
};

export interface SignInFormData {
  userName: string;
}

export interface SignUpFormData {
  userName: string;
}

export type SignInResponseData = {
  userName: string;
  lastLogin: Date;
};

export type SignUpResponseData = {
  userName: string;
  lastLogin: Date;
};
