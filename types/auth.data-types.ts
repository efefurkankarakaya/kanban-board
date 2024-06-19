export interface SignInFormData {
  userName: string;
}

export interface SignUpFormData {
  userName: string;
}

export type SignInResponse = {
  userName: string;
  lastLogin: Date;
};
