import { ContainerFluid } from '@/shared/ui/ContainerFluid';
import { FC, HTMLAttributes, ReactNode } from 'react';
import { twJoin } from 'tailwind-merge';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
}

export const Container: FC<ContainerProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <ContainerFluid
      className={twJoin('px-[14px] m-lg:px-[20px] d-xs:px-[120px]', className)}
      {...props}
    >
      {children}
    </ContainerFluid>
  );
};
