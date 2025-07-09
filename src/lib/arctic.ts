import { GitHub, Google } from "arctic";

const googleClientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
const googleCallbackUrl = process.env.GOOGLE_OAUTH_CALLBACK_URL;

export const googleOAuth = new Google(
  googleClientId!,
  googleClientSecret!,
  googleCallbackUrl!
);

const githubClientId = process.env.GITHUB_OAUTH_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;
const githubCallbackUrl = process.env.GITHUB_OAUTH_CALLBACK_URL;

export const githubOAuth = new GitHub(
  githubClientId!,
  githubClientSecret!,
  githubCallbackUrl!
);
