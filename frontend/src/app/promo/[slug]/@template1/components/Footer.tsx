'use client';

import { useTemplateStore } from '@/store/templateStore';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from './Container';

export const Footer = () => {
  const { data } = useTemplateStore.getState();
  return (
    <footer className='wrapper'>
      <style jsx>{`
        .wrapper {
          background-color: ${data?.footer?.bgColor || '#fff'};
        }
      `}</style>
      <Container>
        <div className='flex flex-col m-lg:flex-row items-center justify-center m-lg:justify-between py-[20px] m-lg:py-[40px]'>
          <div className='flex m-lg:items-center mb-[40px] m-lg:mb-0'>
            <Link
              //TODO: прокинуть данные
              href={'https://bookmaker-ratings.ru/'}
              target='_blank'
              className='h-[32px] min-w-[162px] relative w-full'
            >
              <Image
                className='object-cover'
                fill
                //TODO: прокинуть данные
                src={data?.footer?.logo || ''}
                alt=''
              />
            </Link>
          </div>
          <div className='flex gap-[24px] items-center'>
            {data?.footer?.socials?.map((el) => {
              return (
                <Link href={el.url} key={el.name}>
                  <Image width={24} height={24} src={el.icon} alt='' />
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </footer>
  );
};
