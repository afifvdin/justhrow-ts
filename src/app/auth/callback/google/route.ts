import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { googleOAuth } from "@/lib/auth";
import {
  GOOGLE_OAUTH_USER_INFO_URL,
  IS_PROD,
  SESSION_LIFETIME_IN_DAYS,
} from "@/lib/constant";
import { createSession } from "@/services/session";
import { createUser, getUserByEmail } from "@/services/user";
import { TGoogleUser } from "@/types/oauth";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();

  const code = request.nextUrl.searchParams.get("code");
  const codeVerifier = cookieStore.get("googleCodeVerifier")?.value;

  if (!code || !codeVerifier) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  try {
    const tokens = await googleOAuth.validateAuthorizationCode(
      code,
      codeVerifier,
    );
    const accessToken = tokens.accessToken();

    const response = await fetch(GOOGLE_OAUTH_USER_INFO_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const user: TGoogleUser = await response.json();

    const existingUser = await getUserByEmail({ email: user.email });

    if (existingUser) {
      const session = await createSession({ userId: existingUser.id });
      cookieStore.set("session", session.id, {
        httpOnly: true,
        secure: IS_PROD,
        maxAge: 60 * 60 * 24 * SESSION_LIFETIME_IN_DAYS,
        path: "/",
      });
    } else {
      const newUser = await createUser({
        email: user.email,
        name: user.name,
        avatarUrl: user.picture,
      });

      const session = await createSession({ userId: newUser.id });
      cookieStore.set("session", session.id, {
        httpOnly: true,
        secure: IS_PROD,
        maxAge: 60 * 60 * 24 * SESSION_LIFETIME_IN_DAYS,
        path: "/",
      });
    }

    return NextResponse.redirect(new URL("/", request.url));
  } catch (error) {
    console.log("[ERROR] Google Callback:", error);
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}
