export interface UserSchema {
  id: string;
  name: string;
  email: string;
  kindeId: string;
  createdAt: string;
  updatedAt: string;
  totalStreak: Date[];
  tags: {
    name: string;
    id: string;
  }[];
}

export interface checkUserResponse {
  message: string;
  data: {
    user: UserSchema;
    found: boolean;
  };
}
