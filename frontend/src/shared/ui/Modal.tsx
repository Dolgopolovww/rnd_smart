'use client';

import {
  ReactNode,
  useState,
  MouseEvent,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import { Portal } from './Portal';
import { htmlOverflowHidden } from '@/utils';
import { twJoin } from 'tailwind-merge';

export interface ModalProps {
  parentClassName?: string;
  className?: string;
  childrenClassName?: string;
  children?: ReactNode;
  open: boolean;
  onClose?: () => void;
  closeOnOverlayClick?: boolean;
  contentBgColor?: string;
}

export const Modal = (props: ModalProps) => {
  const {
    parentClassName,
    className,
    childrenClassName,
    onClose,
    open,
    children,
    closeOnOverlayClick = true,
    contentBgColor = 'white',
  } = props;

  const handleClose = useCallback(() => {
    onClose && onClose();
  }, [onClose]);

  const onContentClick = useCallback((e: MouseEvent) => {
    e.stopPropagation();
  }, []);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    },
    [handleClose]
  );

  useEffect(() => {
    htmlOverflowHidden(open);
  }, [open]);

  useEffect(() => {
    if (open) {
      window.addEventListener('keydown', onKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onKeyDown]);

  return open ? (
    <Portal>
      <div
        onClick={closeOnOverlayClick ? handleClose : undefined}
        className={twJoin(
          'fixed inset-0 overflow-x-hidden overflow-y-auto z-10 w-full h-full flex justify-center items-center bg-[#00000099]',
          parentClassName
        )}
      >
        <div
          role='dialog'
          className={twJoin(
            'flex flex-col relative min-w-[320px] m-auto',
            className
          )}
        >
          <div
            className={twJoin(childrenClassName)}
            style={{ backgroundColor: contentBgColor }}
            onClick={onContentClick}
          >
            {children}
          </div>
        </div>
      </div>
    </Portal>
  ) : null;
};
