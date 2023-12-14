'use client ';

import { useSuccessModal } from '@/store/successModalStore';
import { useTemplateStore } from '@/store/templateStore';
import Image from 'next/image';
import { Fragment, forwardRef, useState } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';
import { Container } from './Container';

export const Main = forwardRef<HTMLDivElement>((_, ref) => {
  const { data } = useTemplateStore.getState();
  const [userSelection, setUserSelection] = useState<string[] | null>(null);
  const [isUserParticipating, setIsUserParticipating] = useState(false);
  const toggleSuccessModal = useSuccessModal((state) => state.toggle);

  const handleUserSelection = (key: string) => {
    setUserSelection((prev) => {
      const updatedItems = prev?.includes(key)
        ? prev.filter((el) => el !== key)
        : [...(prev || []), key];
      return updatedItems.length === 0 ? null : updatedItems;
    });
  };

  const resetUserSelection = () => {
    setUserSelection((prev) => {
      return prev?.length === 0 ? null : [];
    });
  };

  const handleSendData = () => {
    toggleSuccessModal();
    setIsUserParticipating(true);
  };

  return (
    <section
      className={twJoin('wrapper ', 'py-[40px] m-lg:py-[60px] t-md:py-[80px]')}
    >
      <style jsx>{`
        .wrapper {
          background-color: ${data?.mainBlock.bgColor};
        }

        .mainText {
          color: ${data?.mainBlock.mainText.textColor};
        }

        .skewed {
          transform: skew(-12deg);
        }
        .skewed p {
          transform: skew(12deg);
        }
      `}</style>
      <Container>
        <p
          ref={ref}
          className={twJoin(
            'mainText',
            'font-norms whitespace-pre-wrap text-[14px] m-lg:text-[18px] t-md:text-[24px] t-md mb-[36px] text-center t-md:text-left'
          )}
        >
          {data?.mainBlock.mainText.text}
        </p>
        {data?.mainBlock.interactive.map((interactive, index) => {
          const interactiveBlockStyles = twJoin(
            'h-[60px] m-lg:h-[80px] t-md:h-[120px] bg-[#00000008] rounded-[12px] p-[12px] pl-[20px] flex items-center justify-center grayscale transition-all border-solid border-transparent border-[3px]',
            !isUserParticipating && 'hover:grayscale-0'
          );
          return (
            <Fragment key={index}>
              <div
                className={twJoin(
                  'grid grid-cols-2 t-md:grid-cols-4 gap-[12px] text-center will-change-contents',
                  index > 0 && 'mt-[60px]'
                )}
              >
                {interactive.blocks.map((block, index) => (
                  <button
                    disabled={isUserParticipating}
                    onClick={() => handleUserSelection(block.key)}
                    className={twMerge(
                      interactiveBlockStyles,
                      userSelection?.includes(block.key) &&
                        'border-[#cccccc] grayscale-0'
                    )}
                    key={index}
                  >
                    {block.img ? (
                      <div className='relative w-[80px] h-[30px] m-lg:w-[102px] m-lg:h-[40px] t-md:w-[128px] t-md:h-[50px]'>
                        <Image fill src={block.img} alt='' />
                      </div>
                    ) : (
                      <p>{block.text}</p>
                    )}
                  </button>
                ))}
                {interactive.resetBtn && (
                  <button
                    disabled={isUserParticipating}
                    onClick={resetUserSelection}
                    className={twMerge(
                      interactiveBlockStyles,
                      userSelection?.length === 0 &&
                        '!border-[#cccccc] grayscale-0'
                    )}
                  >
                    {interactive.resetBtn?.img ? (
                      <div className='relative w-[80px] h-[30px] m-lg:w-[102px] m-lg:h-[40px] t-md:w-[128px] t-md:h-[50px]'>
                        <Image fill src={interactive.resetBtn.img} alt='' />
                      </div>
                    ) : (
                      <p className='text-[16px] m-lg:text-[24px] font-[500] leading-[1.4]'>
                        {interactive.resetBtn?.text}
                      </p>
                    )}
                  </button>
                )}
              </div>
            </Fragment>
          );
        })}
        <button
          onClick={handleSendData}
          disabled={!userSelection || isUserParticipating}
          style={{
            backgroundColor: data?.mainBlock.participationBtn.bgColor,
            color: data?.mainBlock.participationBtn.text.textColor,
          }}
          className={twJoin(
            data?.mainBlock.participationBtn.variant === 'skewed' && 'skewed',
            'font-panton h-[50px] m-lg:h-[80px] rounded-[12px] mt-[40px] disabled:opacity-30 disabled:cursor-not-allowed w-full text-center'
          )}
        >
          <p className='text-[16px] m-lg:text-[20px] italic uppercase font-[800]'>
            {data?.mainBlock.participationBtn.text.text}
          </p>
        </button>
        {data?.mainBlock.termsBtn && (
          <button
            className='font-panton mt-[16px] m-lg:mt-[24px] mx-auto w-full text-center'
            style={{ color: data?.mainBlock.termsBtn.textColor }}
          >
            <p className='text-[16px] m-lg:text-[24px] font-[600] italic '>
              {data?.mainBlock.termsBtn.text}
            </p>
          </button>
        )}
      </Container>
    </section>
  );
});
