"server-only";

import { GitHub, Google } from "arctic";
import {
  GITHUB_OAUTH_CALLBACK_URL,
  GITHUB_OAUTH_CLIENT_ID,
  GITHUB_OAUTH_CLIENT_SECRET,
  GOOGLE_OAUTH_CALLBACK_URL,
  GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_CLIENT_SECRET,
} from "./constant";

const googleClientId = GOOGLE_OAUTH_CLIENT_ID;
const googleClientSecret = GOOGLE_OAUTH_CLIENT_SECRET;
const googleCallbackUrl = GOOGLE_OAUTH_CALLBACK_URL;

export const googleOAuth = new Google(
  googleClientId,
  googleClientSecret,
  googleCallbackUrl,
);

const githubClientId = GITHUB_OAUTH_CLIENT_ID;
const githubClientSecret = GITHUB_OAUTH_CLIENT_SECRET;
const githubCallbackUrl = GITHUB_OAUTH_CALLBACK_URL;

export const githubOAuth = new GitHub(
  githubClientId,
  githubClientSecret,
  githubCallbackUrl,
);
