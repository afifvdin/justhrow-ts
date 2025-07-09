import { S3Client } from "@aws-sdk/client-s3";

const R2_CONFIG = {
  region: process.env.CLOUDFLARE_R2_REGION,
  endpoint: process.env.CLOUDFLARE_R2_S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
  },
};

export const r2Client = new S3Client(R2_CONFIG);
