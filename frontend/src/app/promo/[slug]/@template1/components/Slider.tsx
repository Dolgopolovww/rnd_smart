'use client';
import { AdCard, Bonus } from '@/types/template';
import { useWindowWidth } from '@react-hook/window-size';
import Image from 'next/image';
import { FC } from 'react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface SliderProps {
  items?: Bonus[];
}

export const Slider: FC<SliderProps> = ({ items }) => {
  const width = useWindowWidth();

  const disableSwiper = width >= 992;

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={16}
      mousewheel={true}
      loop
      // loop={!disableSwiper}
      // autoplay={{ delay: 4000, disableOnInteraction: false }}
      autoplay={false}
      breakpoints={{
        600: { slidesPerView: 2 },
        992: { slidesPerView: 3 },
      }}
      modules={[Autoplay]}
    >
      {!!items &&
        items.length > 0 &&
        items?.map((item, i) => {
          const currency = item.value.currency;
          const bonusSum = item.value.value;
          const bank = new Intl.NumberFormat('ru-RU', {
            style: 'decimal',
          }).format(Number(bonusSum));

          return (
            <SwiperSlide key={i} className='font-norms'>
              <div
                style={{ backgroundColor: item.bgColor || 'white' }}
                className='bg-white overflow-hidden rounded-[16px] h-[370px]'
                key={i}
              >
                <div className='w-full relative'>
                  <div className='h-[180px] relative'>
                    <Image
                      fill
                      quality={100}
                      className='object-cover'
                      src={item.img}
                      alt=''
                    />
                  </div>
                  {/* TODO: item.date */}
                  {/* {item.date && (
                    <div
                      style={{ backgroundColor: item.date.bgColor }}
                      className='absolute rounded-bl-[8px] top-0 right-0 px-[8px] py-[4px]'
                    >
                      <p
                        style={{ color: item.date.text.textColor }}
                        className='font-[600] text-[12px]'
                      >
                        {item.date.text.text}
                      </p>
                    </div>
                  )} */}
                  <div className='absolute w-full px-[16px] items-center flex justify-between align-center bottom-[20px]'>
                    <div className='relative w-[100px] h-[35px]'>
                      <Image
                        fill
                        quality={100}
                        className='object-contain'
                        src={item.bookmaker.logo}
                        alt=''
                      />
                    </div>
                    <p
                      style={{
                        // TODO: textColor
                        color: /*item.value.textColor*/ 'white' || 'white',
                      }}
                      className='text-[18px] text-right font-[700]'
                    >
                      {bank} {currency}
                    </p>
                  </div>
                </div>
                <div className='w-full px-[16px] absolute pb-[16px] bottom-0'>
                  <div className='mb-[8px]'>
                    <p
                      // TODO: name color
                      style={{ color: /*item.typeBonus.name*/ 'white' }}
                      className='text-[14px] font-[600]'
                    >
                      {item.typeBonus.name}
                    </p>
                  </div>
                  <div className='mb-[16px]'>
                    <p
                      style={{ color: item.text }}
                      className='text-[18px] font-[700]'
                    >
                      {item.text}
                    </p>
                  </div>
                  <div className='flex gap-[8px]'>
                    {/* TODO: buttons is array! */}
                    {/* {item.buttons.map((el, index) => {
                      return ( */}
                    <a
                      href={item.buttons.url!}
                      target='_blank'
                      // key={index}
                      style={{
                        backgroundColor: item.buttons.bgColor,
                        color: item.buttons.textColor,
                      }}
                      className='h-[48px] flex justify-center items-center rounded-[8px] py-[8px] px-[16px] flex-1 text-center'
                    >
                      <p className='text-[16px] font-[700] leading-[1.3] text-ellipsis'>
                        {item.buttons.text}
                      </p>
                    </a>
                    {/* ); */}
                    {/* })} */}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};
