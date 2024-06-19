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
