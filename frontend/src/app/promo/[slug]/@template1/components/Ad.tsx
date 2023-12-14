import { useTemplateStore } from '@/store/templateStore';
import Image from 'next/image';
import { Fragment } from 'react';
import { twJoin } from 'tailwind-merge';
import { Container } from './Container';
import { Slider } from './Slider';

export const Ad = () => {
  const { data } = useTemplateStore.getState();
  return (
    <section className='wrapper pt-[20px] m-lg:pt-[40px] pb-[96px]'>
      <style jsx>{`
        .wrapper {
          background-color: ${data?.adBlock.bgColor};
        }
      `}</style>
      <Container>
        {data?.adBlock.ads?.map((item, index) => {
          return (
            <Fragment key={index}>
              <div
                className={twJoin(
                  'mb-[32px] m-lg:mb-[40px] flex gap-[16px] m-lg:gap-[20px] items-center font-[700]',
                  index > 0 && 'mt-[60px]'
                )}
              >
                {item.logo && (
                  <div className='relative w-[130px] h-[30px] m-lg:w-[200px] m-lg:h-[40px]'>
                    <Image
                      fill
                      className='object-contain'
                      src={item.logo}
                      alt=''
                    ></Image>
                  </div>
                )}
                {item.title && (
                  <div className=''>
                    <p
                      style={{ color: item.title.textColor }}
                      className='font-norms text-[20px] m-lg:text-[28px] font-[500]'
                    >
                      {item.title.text}
                    </p>
                  </div>
                )}
                {item.button && (
                  <a
                    href={item.button.url!}
                    style={{
                      backgroundColor: item.button.bgColor,
                      color: item.button.text.textColor,
                    }}
                    target='_blank'
                    className='py-[6px] px-[12px] rounded-[8px]'
                  >
                    <p className='font-norms text-[12px] font-[700]'>
                      {item.button.text.text}
                    </p>
                  </a>
                )}
              </div>
              <Slider items={item.list} />
            </Fragment>
          );
        })}
      </Container>
    </section>
  );
};
