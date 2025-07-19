export type TRegisterState = {
  success?: boolean;
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
  success?: boolean;
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
  success?: boolean;
  error?: {
    errors: string[];
  };
  state?: {};
};

export type TNewContentState = {
  success?: boolean;
  error?: {
    errors: string[];
  };
  state?: {};
};

export type TSettingsState = {
  success?: boolean;
  error?: {
    errors: string[];
    properties?: {
      name?: { errors: string[] };
      date?: { errors: string[] };
      time?: { errors: string[] };
    };
  };
  state?: {
    name: string;
    date: string;
    time: string;
  };
};

export type TDeleteContentState = {
  success?: boolean;
  error?: {
    errors: string[];
  };
  state?: {};
};

export type TDeleteWorkspaceState = {
  success?: boolean;
  error?: {
    errors: string[];
  };
  state?: {};
};
