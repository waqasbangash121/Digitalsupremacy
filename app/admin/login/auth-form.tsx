"use client";

import { useActionState } from "react";
import { loginAction, setupAction, type AuthState } from "../actions";

const initialState: AuthState = { error: "" };

export default function AuthForm({ setup }: { setup: boolean }) {
  const [state, action, pending] = useActionState(setup ? setupAction : loginAction, initialState);

  return (
    <form action={action} className="admin-auth-form">
      <label>
        Email address
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        Password
        <input name="password" type="password" autoComplete={setup ? "new-password" : "current-password"} minLength={setup ? 12 : undefined} required />
      </label>
      {setup && (
        <label>
          Confirm password
          <input name="confirmation" type="password" autoComplete="new-password" minLength={12} required />
        </label>
      )}
      {state.error && <p className="admin-form-error" role="alert">{state.error}</p>}
      <button type="submit" disabled={pending}>{pending ? "Please wait..." : setup ? "Create admin account" : "Sign in"}</button>
    </form>
  );
}
