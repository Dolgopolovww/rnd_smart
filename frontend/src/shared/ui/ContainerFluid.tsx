import { FC, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface ContainerFluidProps extends HTMLAttributes<HTMLDivElement> {}

export const ContainerFluid: FC<ContainerFluidProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        `w-[1440px] max-w-full mx-auto px-[14px] m-lg:px-[32px] d-xs:px-[80px]`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
