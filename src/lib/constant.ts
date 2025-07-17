export const IS_PROD = process.env.NODE_ENV === "production";

export const DATABASE_URL = process.env.DATABASE_URL || "";

export const GOOGLE_OAUTH_CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID || "";
export const GOOGLE_OAUTH_CLIENT_SECRET =
  process.env.GOOGLE_OAUTH_CLIENT_SECRET || "";
export const GOOGLE_OAUTH_CALLBACK_URL =
  process.env.GOOGLE_OAUTH_CALLBACK_URL || "";
export const GOOGLE_OAUTH_USER_INFO_URL =
  process.env.GOOGLE_OAUTH_USER_INFO_URL || "";

export const GITHUB_OAUTH_CLIENT_ID = process.env.GITHUB_OAUTH_CLIENT_ID || "";
export const GITHUB_OAUTH_CLIENT_SECRET =
  process.env.GITHUB_OAUTH_CLIENT_SECRET || "";
export const GITHUB_OAUTH_CALLBACK_URL =
  process.env.GITHUB_OAUTH_CALLBACK_URL || "";
export const GITHUB_OAUTH_USER_INFO_URL =
  process.env.GITHUB_OAUTH_USER_INFO_URL || "";
export const GITHUB_OAUTH_USER_EMAIL_INFO_URL =
  process.env.GITHUB_OAUTH_USER_EMAIL_INFO_URL || "";

export const CLOUDFLARE_R2_BUCKET = process.env.CLOUDFLARE_R2_BUCKET || "";
export const CLOUDFLARE_R2_REGION = process.env.CLOUDFLARE_R2_REGION || "";
export const CLOUDFLARE_R2_S3_ENDPOINT =
  process.env.CLOUDFLARE_R2_S3_ENDPOINT || "";
export const CLOUDFLARE_R2_ACCESS_KEY_ID =
  process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || "";
export const CLOUDFLARE_R2_SECRET_ACCESS_KEY =
  process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || "";
export const CLOUDFLARE_R2_DEFAULT_PRESIGNED_EXPIRES_IN = Number(
  process.env.CLOUDFLARE_R2_DEFAULT_PRESIGNED_EXPIRES_IN || 3600,
);

export const SESSION_LIFETIME_IN_DAYS = Number(
  process.env.SESSION_LIFETIME_IN_DAYS || 30,
);
