export type TRegisterState = {
  error?: {
    errors: string[];
    properties?: {
      name?: { errors: string[] };
      email?: { errors: string[] };
      password?: { errors: string[] };
    };
  };
  state?: {
    name: string;
    email: string;
    password: string;
  };
};

export type TLoginState = {
  error?: {
    errors: string[];
    properties?: {
      email?: { errors: string[] };
      password?: { errors: string[] };
    };
  };
  state?: {
    email: string;
    password: string;
  };
};

export type TNewWorkspaceState = {
  errors: string[];
};
