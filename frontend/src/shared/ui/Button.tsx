'use client';

import { ButtonVariants } from '@/types/template';
import { ButtonHTMLAttributes, FC } from 'react';
import { twJoin } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
  childrenClassname?: string;
}

export const Button: FC<ButtonProps> = ({
  children,
  variant = 'rounded',
  childrenClassname,
  className,
  ...props
}) => {
  return (
    <button
      className={twJoin(
        'rounded-[12px]',

        variant === 'skewed' && 'skew-x-[-12deg]',

        className && className
      )}
      {...props}
    >
      <p
        className={twJoin(
          childrenClassname,
          variant === 'skewed' && 'skew-x12deg]'
        )}
      >
        {children}
      </p>
    </button>
  );
};
