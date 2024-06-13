import { Users } from './index';

export interface AuthContext extends AuthState {
    dispatch: React.Dispatch<AuthAction> | null;
}

export interface AuthState {
    user: Users | null;
    isLoggedIn: boolean;
    error: string | null;
}

export interface AuthAction {
  payload: Users | null,
  type: "LOGIN" | "LOGOUT" | "LOGIN_FAILURE" | "UPDATE_USER_DATA"
  error: Error | null;
}

export interface OnlyChildrenProps {
    children: React.ReactNode;
}
