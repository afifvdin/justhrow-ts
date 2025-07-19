import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({
    error: "Invalid email address",
  }),
  password: z
    .string()
    .min(8, {
      error: "Password must be at least 8 characters long",
    })
    .max(100, {
      error: "Password must be less than 100 characters long",
    }),
});

export const signUpSchema = z.object({
  name: z.string().min(3),
  email: z.email({
    error: "Invalid email address",
  }),
  password: z
    .string()
    .min(8, {
      error: "Password must be at least 8 characters long",
    })
    .max(100, {
      error: "Password must be less than 100 characters long",
    }),
});

export const updateUserSchema = z.object({
  name: z.string().min(3, {
    error: "Name must be at least 3 characters long",
  }),
  avatar: z
    .any()
    .optional()
    .refine(
      (file) => {
        if (file === undefined || file === null) return true;
        if (
          typeof File !== "undefined" &&
          file instanceof File &&
          file.size <= 2 * 1024 * 1024 && // 2MB limit
          ["image/jpeg", "image/png", "image/webp"].includes(file.type)
        ) {
          return true;
        }
        return false;
      },
      {
        error:
          "Avatar must be a JPEG, PNG, or WEBP image and less than 2MB in size",
      },
    ),
});

export const workspaceSettingsSchema = z.object({
  name: z
    .string()
    .min(3, { error: "Name must be at least 3 characters long" })
    .max(100, { error: "Name must be less than 100 characters long" }),
  date: z.date({ error: "Invalid date" }),
  time: z.string().regex(/^\d{2}:\d{2}:\d{2}$/, {
    error: "Invalid time format. Please use HH:mm:ss.",
  }),
});
