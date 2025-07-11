"server-only";

import { S3Client } from "@aws-sdk/client-s3";
import {
  CLOUDFLARE_R2_ACCESS_KEY_ID,
  CLOUDFLARE_R2_REGION,
  CLOUDFLARE_R2_S3_ENDPOINT,
  CLOUDFLARE_R2_SECRET_ACCESS_KEY,
} from "./constant";

const R2_CONFIG = {
  region: CLOUDFLARE_R2_REGION,
  endpoint: CLOUDFLARE_R2_S3_ENDPOINT,
  credentials: {
    accessKeyId: CLOUDFLARE_R2_ACCESS_KEY_ID,
    secretAccessKey: CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  },
};

export const r2Client = new S3Client(R2_CONFIG);
