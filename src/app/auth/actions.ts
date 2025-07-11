"use server";

import { googleOAuth } from "@/lib/auth";
import { IS_PROD, SESSION_LIFETIME_IN_DAYS } from "@/lib/constant";
import { loginSchema, signUpSchema } from "@/lib/schema";
import { verifyPassword } from "@/services/auth";
import { createSession } from "@/services/session";
import { createUser, getUserByEmail } from "@/services/user";
import { TLoginState, TRegisterState } from "@/types/state";
import * as arctic from "arctic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/");
}

export async function loginAction(
  _: any,
  formData: FormData,
): Promise<TLoginState> {
  const cookieStore = await cookies();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const state = {
    email,
    password,
  };

  const validationResult = loginSchema.safeParse(state);

  if (!validationResult.success) {
    return {
      error: z.treeifyError(validationResult.error),
      state,
    };
  }

  try {
    const user = await getUserByEmail({ email, password: true });
    if (!user) {
      return { error: { errors: ["User not found"] }, state };
    }

    const isPasswordValid = await verifyPassword(password, user.password!);
    if (!isPasswordValid) {
      return { error: { errors: ["Invalid password"] }, state };
    }

    const session = await createSession(user.id);
    cookieStore.set("session", session.id, {
      httpOnly: true,
      secure: IS_PROD,
      maxAge: 60 * 60 * 24 * SESSION_LIFETIME_IN_DAYS,
      path: "/",
    });
  } catch (error) {
    console.log("[ERROR] Login Action:", error);
    return {
      error: {
        errors: ["Something went wrong"],
      },
      state,
    };
  }

  redirect("/");
}

export async function registerAction(
  _: any,
  formData: FormData,
): Promise<TRegisterState> {
  const cookieStore = await cookies();

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const state = {
    name,
    email,
    password,
  };

  const validationResult = signUpSchema.safeParse(state);

  if (!validationResult.success) {
    return {
      error: z.treeifyError(validationResult.error),
      state,
    };
  }

  try {
    const currentUser = await getUserByEmail({ email });

    if (currentUser) {
      return {
        error: {
          errors: ["User already exists"],
        },
        state: { name, email, password },
      };
    }

    const user = await createUser({ name, email, password });

    const session = await createSession(user.id);
    cookieStore.set("session", session.id, {
      httpOnly: true,
      secure: IS_PROD,
      maxAge: 60 * 60 * 24 * SESSION_LIFETIME_IN_DAYS,
      path: "/",
    });
  } catch (error) {
    console.log("[ERROR] Register Action:", error);
    return {
      error: {
        errors: ["Something went wrong"],
      },
    };
  }

  redirect("/");
}

export async function googleLoginAction() {
  const cookieStore = await cookies();

  const state = arctic.generateState();
  const codeVerifier = arctic.generateCodeVerifier();
  const scopes = ["openid", "profile", "email"];
  const url = googleOAuth.createAuthorizationURL(state, codeVerifier, scopes);

  redirect(url.toString());
}
