import { CLOUDFLARE_R2_BUCKET } from "@/lib/constant";
import { r2Client } from "@/lib/s3";
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createId } from "@paralleldrive/cuid2";

export async function uploadFile({
  file,
  folder,
}: {
  file: File;
  folder: string;
}) {
  const ext = file.name.split(".").at(-1);
  const name = file.name.split(".").slice(0, -1).join(".");
  const filename = `${name}-${createId()}.${ext}`;

  const path = `${folder}/${filename}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  try {
    await r2Client.send(
      new PutObjectCommand({
        Bucket: CLOUDFLARE_R2_BUCKET,
        Key: path,
        ContentType: file.type,
        Body: buffer,
      }),
    );
    return path;
  } catch (error) {
    console.log("[S3] Upload failed. error: ", error);
    return null;
  }
}

export async function uploadManyFile({
  files,
  folder,
}: {
  files: File[];
  folder: string;
}) {
  return await Promise.all(files.map((file) => uploadFile({ file, folder })));
}

export async function getPresignedUrl({
  path,
  expiresIn = 3600,
}: {
  path: string;
  expiresIn?: number;
}): Promise<string> {
  try {
    const command = new GetObjectCommand({
      Bucket: CLOUDFLARE_R2_BUCKET,
      Key: path,
    });

    return await getSignedUrl(r2Client as any, command, { expiresIn });
  } catch (error) {
    console.log("[S3] Get presigned URL failed. error: ", error);
    return "";
  }
}

export async function removeFile({ path }: { path: string }) {
  try {
    const command = new DeleteObjectCommand({
      Bucket: CLOUDFLARE_R2_BUCKET,
      Key: path,
    });

    await r2Client.send(command);
  } catch (error) {
    console.log("[S3] Delete failed. error: ", error);
  }
}

export async function removeManyFile({ paths }: { paths: string[] }) {
  try {
    return await Promise.all(paths.map((path) => removeFile({ path })));
  } catch (error) {
    console.log("[S3] Delete failed. error: ", error);
  }
}
