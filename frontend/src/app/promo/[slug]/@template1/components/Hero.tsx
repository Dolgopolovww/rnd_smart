import { useTemplateStore } from '@/store/templateStore';
import { useTermsModal } from '@/store/termsModalStore';
import { useWindowWidth } from '@react-hook/window-size';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';
import { twJoin } from 'tailwind-merge';
import { Container } from './Container';
import { GeometryLine } from './GeometryLine';

export const Hero = ({ onButtonClick }: { onButtonClick: () => void }) => {
  const router = useRouter();
  const windowWidth = useWindowWidth();
  const [showBgImage, setShowBgImage] = useState(false);
  const { data } = useTemplateStore.getState();
  const toggleTermsModal = useTermsModal((state) => state.toggle);

  useLayoutEffect(() => {
    setShowBgImage(windowWidth >= 991);
  }, [windowWidth]);

  return (
    <section className='wrapper'>
      <style jsx>{`
        .wrapper {
          background-color: ${data?.heroBlock?.bgColor || '#fff'};
        }
      `}</style>
      <Container
        style={{
          backgroundImage: showBgImage ? `url(${data?.heroBlock.bgImg})` : '',
        }}
        className='bg-no-repeat bg-right-bottom bg-auto min-h-[600px]'
      >
        <div className='py-[60px] w-full t-md:py-[126px] flex justify-center  t-md:justify-start'>
          <div className='flex flex-col gap-[32px] t-md:gap-[40px] text-center items-center t-md:text-left t-md:items-start'>
            <div className={twJoin('heroText', 'relative w-fit  h-[33px]')}>
              <GeometryLine />
            </div>
            <p
              className={twJoin(
                'heroText',
                'font-panton italic font-extrabold text-[24px] m-lg:text-[32px] t-md:text-[48px] max-w-[650px] uppercase'
              )}
            >
              {data?.heroBlock.text}
            </p>
            <div className='max-w-[280px] w-full flex items-center flex-col'>
              <button
                type='button'
                onClick={
                  data?.heroBlock.heroButton.url
                    ? () => router.push(data?.heroBlock.heroButton.url!)
                    : onButtonClick
                }
                className={twJoin(
                  'button',
                  data?.heroBlock.heroButton.variant === 'skewed' && 'skewed',
                  'font-panton rounded-[12px] py-[18px] w-full flex justify-center items-center'
                )}
              >
                <p
                  className={twJoin(
                    'buttonText',
                    'italic text-[20px] uppercase font-[800] leading-[1.2]'
                  )}
                >
                  {data?.heroBlock.heroButton.text}
                </p>
              </button>
              {data?.heroBlock.termsBtn && (
                <button
                  onClick={toggleTermsModal}
                  className={twJoin(
                    'termsButtonText',
                    'font-panton italic mt-[18px] text-[20px] font-[600]'
                  )}
                >
                  {data.heroBlock.termsBtn.text}
                </button>
              )}
            </div>
          </div>
        </div>
        <div className='relative block t-md:hidden w-full h-[240px] m-md:h-[350px]'>
          <Image
            className='object-contain object-bottom'
            fill
            src={data?.heroBlock.bgImg || ''}
            alt=''
          />
        </div>
      </Container>
      <style jsx>{`
        .heroText {
          color: ${data?.heroBlock.textColor || '#fff'};
        }

        .button {
          background-color: ${data?.heroBlock.heroButton.bgColor};
          transition: all 0.15s linear;
        }

        .button:hover {
          background-color: ${data?.heroBlock.heroButton.textColor};

          .buttonText {
            color: ${data?.heroBlock.heroButton.bgColor};
          }
        }

        .button.skewed {
          transform: skew(-12deg);
        }
        .button.skewed p {
          transform: skew(12deg);
        }

        .buttonText {
          color: ${data?.heroBlock.heroButton.textColor};
        }

        .termsButtonText {
          color: ${data?.heroBlock.termsBtn?.textColor};
        }
      `}</style>
    </section>
  );
};
