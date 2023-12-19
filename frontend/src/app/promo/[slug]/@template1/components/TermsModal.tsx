'use client';

import { CloseIcon } from '@/shared/ui/CloseIcon';
import { Modal } from '@/shared/ui/Modal';
import { useTemplateStore } from '@/store/templateStore';
import { useTermsModal } from '@/store/termsModalStore';

export const TermsModal = () => {
  const termsPopupData = useTemplateStore((state) => state.data?.termsPopup);
  const { open, toggle } = useTermsModal((state) => ({
    open: state.open,
    toggle: state.toggle,
  }));
  return (
    <Modal
      contentBgColor={termsPopupData?.bgColor}
      open={open}
      onClose={toggle}
      className='items-center w-full max-w-[800px] px-[16px] t-md:px-0'
      childrenClassName='p-[16px] max-h-[812px] m-lg:p-[32px] rounded-[32px] max-w-[800px] w-full h-[85vh] overflow-hidden'
    >
      <div>
        <div className='flex items-center justify-between ml-auto mb-[14px]'>
          <p className='font-[500] text-[24px] m-lg:text-[32px]'>Условия</p>
          <button
            onClick={toggle}
            className='flex justify-center items-center w-[36px] h-[36px] t-sm:w-[44px] t-sm:h-[44px] bg-[#0000000d] rounded-full'
          >
            <CloseIcon />
          </button>
        </div>
        <div className='scrollbar-thin scrollbar-thumb-rounded-full overflow-auto scrollbar-thumb-[#0000001f] max-h-[720px] h-[calc(100vh-210px)] pr-[4px] m-lg:h-[calc(85vh-122px)] m-lg:pr-[14px]'>
          <p
            style={{ color: termsPopupData?.textColor }}
            className='text-[16px] whitespace-pre-wrap'
          >
            {termsPopupData?.text}
          </p>
        </div>
      </div>
    </Modal>
  );
};
