export interface UserSchema {
  id: string;
  name: string;
  email: string;
  kindeId: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export interface checkUserResponse {
  message: string;
  data: {
    user: UserSchema;
    found: boolean;
  };
}
