import { CloseIcon } from '@/shared/ui/CloseIcon';
import { Modal } from '@/shared/ui/Modal';
import { useSuccessModal } from '@/store/successModalStore';
import { useTemplateStore } from '@/store/templateStore';
import Image from 'next/image';
import { twJoin } from 'tailwind-merge';

export const SuccessModal = () => {
  const successPopupData = useTemplateStore(
    (state) => state.data?.successPopup
  );
  const { open, toggle } = useSuccessModal((state) => ({
    open: state.open,
    toggle: state.toggle,
  }));
  return (
    <Modal
      open={open}
      onClose={toggle}
      closeOnOverlayClick={false}
      className='items-center w-full max-w-[800px] px-[16px] t-md:px-0'
      childrenClassName='w-full pt-[16px] rounded-[32px] px-[16px] pb-[70px] m-lg:pt-[24px] m-lg:px-[24px] m-lg:pb-[90px] overflow-hidden'
      contentBgColor={successPopupData?.bgColor}
    >
      <div>
        <button
          className={twJoin(
            'button',
            'flex justify-center items-center w-[36px] h-[36px] t-sm:w-[44px] t-sm:h-[44px] bg-[#0000000d] mb-[44px] m-lg:mb-[52px] rounded-full ml-auto'
          )}
          onClick={toggle}
        >
          <CloseIcon />
        </button>
        <div className='flex flex-col justify-center items-center text-center'>
          <div className='relative w-[100px] h-[100px] mb-[32px] m-lg:mb-[40px]'>
            <Image
              quality={100}
              fill
              className='object-contain'
              src={successPopupData?.img || ''}
              alt=''
            />
          </div>
          <p
            className={twJoin(
              'title',
              'font-[700] text-[32px] m-lg:text-[48px] mb-[16px] m-lg:mb-[32px]'
            )}
          >
            {successPopupData?.text.text}
          </p>
          <p
            className={twJoin(
              'subText',
              'font-[500] leading-[1.3] text-[16px] m-lg:text-[24px] whitespace-pre-wrap'
            )}
          >
            {successPopupData?.subText.text}
          </p>
        </div>
      </div>

      <style jsx>{`
        .button {
          color: ${successPopupData?.text.textColor};
        }

        .title {
          color: ${successPopupData?.text.textColor};
        }
        .subText {
          color: ${successPopupData?.subText.textColor};
        }
      `}</style>
    </Modal>
  );
};
