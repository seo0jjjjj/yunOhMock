import { User} from './index';

export interface AuthContextTypes extends AuthState {
    dispatch: React.Dispatch<AuthAction> | null;
}

export interface AuthState {
    user: User | null;
    isLoggedIn: boolean;
    error: string | null;
}

export interface AuthAction {
  payload: User | null,
  type: "LOGIN" | "LOGOUT" | "LOGIN_FAILURE" | "UPDATE_USER_DATA"
  error: Error | null;
}
