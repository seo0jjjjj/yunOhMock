// using in UserContext.tsx
export interface OnlyChildrenProps {
    children: React.ReactNode;
}


/**
 * Component props Area
 */

// AsyncButton Props
export interface AsyncButtonProps extends OnlyChildrenProps{
  styleObj?: React.CSSProperties;
  className?: string;
  onClick?: (e: React.MouseEvent) => Promise<void>;
}