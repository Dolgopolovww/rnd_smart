'use client';

import { useTemplateStore } from '@/store/templateStore';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from './Container';

export const Header = () => {
  const { data } = useTemplateStore.getState();
  return (
    <header className='wrapper'>
      <style jsx>{`
        .wrapper {
          background-color: ${data?.header?.bgColor || '#fff'};
        }
      `}</style>
      <Container>
        <div className='py-[24px] flex justify-between items-center'>
          <div className='flex items-center'>
            <Link
              //TODO: прокинуть данные
              href={'https://bookmaker-ratings.ru/'}
              target='_blank'
              className='hidden m-lg:block h-[32px] min-w-[162px] relative w-full'
            >
              <Image
                className='object-cover'
                fill
                //TODO: прокинуть данные
                src={data?.header?.logo || ''}
                alt=''
              />
            </Link>
            <Link
              //TODO: прокинуть данные
              href={'https://bookmaker-ratings.ru/'}
              target='_blank'
              className='block m-lg:hidden h-[24px] min-w-[50px] relative w-full'
            >
              <Image
                fill
                //TODO: прокинуть данные
                src={
                  'https://bookmaker-ratings.ru/promo/championsleague/assets/rb-short-black.2dccad39.svg'
                }
                alt=''
              />
            </Link>
            {data?.header.partner && (
              <>
                <div className='mx-[8px] m-lg:mx-[16px] min-w-[24px] h-[24px] relative'>
                  <Image fill src={'/assets/icons/cancel_dark.svg'} alt='' />
                </div>
                <Link
                  //TODO: прокинуть данные
                  href={'https://bookmaker-ratings.ru/'}
                  target='_blank'
                  className='h-[24px] m-lg:h-[32px] min-w-[100px] w-full relative'
                >
                  <Image
                    className='object-cover'
                    fill
                    src='/assets/icons/test_bookmaker.svg'
                    alt=''
                  ></Image>
                </Link>
              </>
            )}
          </div>
          {/* TODO: модалка */}
          <div className='flex items-center cursor-pointer justify-center bg-[#0099ff] rounded-full w-[32px] h-[32px]'>
            <p className='text-white'>АН</p>
          </div>
        </div>
      </Container>
    </header>
  );
};
