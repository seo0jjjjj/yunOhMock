import { Message } from "./models";

// using in UserContext.tsx
export interface WithChildrenProps {
    children: React.ReactNode;
}


/**
 * Component props Area
 */

// AsyncButton Props
export interface AsyncButtonProps extends WithChildrenProps{
  styleObj?: React.CSSProperties;
  className?: string;
  onClick?: (e: React.MouseEvent) => Promise<void>;
}

// InputField Props
export interface InputFieldProps {
  label: string;
  type: string;
  id: string;
  state: [string, React.Dispatch<React.SetStateAction<string>>];
  autoFocus?: boolean;
  children?: React.ReactNode;
  rep?: React.RefObject<HTMLInputElement>;
}

//MessageSpan Props

export interface MessageSpanProps {
  message: Message;
  mySessionId: string;
}