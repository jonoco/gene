"use server";

import { signOut as _signOut } from "@/auth";

export async function signOut() {
  return await _signOut();
}
