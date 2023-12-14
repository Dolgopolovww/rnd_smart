import localFont from 'next/font/local';

const panton = localFont({
  variable: '--font-panton',
  src: [
    {
      path: './Panton/Panton-ExtraBold.woff',
      weight: '800',
      style: 'normal',
    },
    {
      path: './Panton/Panton-RegularItalic.woff',
      weight: 'normal',
      style: 'italic',
    },
    {
      path: './Panton/Panton-ThinItalic.woff',
      weight: '100',
      style: 'italic',
    },
    {
      path: './Panton/Panton-Bold.woff',
      weight: 'bold',
      style: 'normal',
    },
    {
      path: './Panton/Panton-ExtraLight.woff',
      weight: '200',
      style: 'normal',
    },
    {
      path: './Panton/Panton-ExtraBoldItalic.woff',
      weight: '800',
      style: 'italic',
    },
    {
      path: './Panton/Panton-ExtraLightItalic.woff',
      weight: '200',
      style: 'italic',
    },
    {
      path: './Panton/Panton-Thin.woff',
      weight: '100',
      style: 'normal',
    },
    {
      path: './Panton/Panton-SemiBold.woff',
      weight: '600',
      style: 'normal',
    },
    {
      path: './Panton/Panton-Heavy.woff',
      weight: '900',
      style: 'normal',
    },
    {
      path: './Panton/Panton-SemiBoldItalic.woff',
      weight: '600',
      style: 'italic',
    },
    {
      path: './Panton/Panton-BoldItalic.woff',
      weight: 'bold',
      style: 'italic',
    },
    {
      path: './Panton/Panton-BlackItalic.woff',
      weight: '900',
      style: 'italic',
    },
    {
      path: './Panton/Panton-LightItalic.woff',
      weight: '300',
      style: 'italic',
    },
    {
      path: './Panton/Panton-Regular.woff',
      weight: 'normal',
      style: 'normal',
    },
    {
      path: './Panton/Panton-HeavyItalic.woff',
      weight: '900',
      style: 'italic',
    },
    {
      path: './Panton/Panton-Light.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: './Panton/Panton-Black.woff',
      weight: '900',
      style: 'normal',
    },
  ],
});

const ttNormsPro = localFont({
  variable: '--font-tt-norms-pro',
  src: [
    {
      path: './TTNormsPro/TTNormsPro-Bold.woff2',
      weight: 'bold',
      style: 'normal',
    },
    {
      path: './TTNormsPro/TTNormsPro-ExtraBoldItalic.woff2',
      weight: '800',
      style: 'italic',
    },
    {
      path: './TTNormsPro/TTNormsPro-ExtraLightItalic.woff2',
      weight: '200',
      style: 'italic',
    },
    {
      path: './TTNormsPro/TTNormsPro-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: './TTNormsPro/TTNormsPro-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: './TTNormsPro/TTNormsPro-Regular.woff2',
      weight: 'normal',
      style: 'normal',
    },
    {
      path: './TTNormsPro/TTNormsPro-ThinItalic.woff2',
      weight: '100',
      style: 'italic',
    },
    {
      path: './TTNormsPro/TTNormsPro-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './TTNormsPro/TTNormsPro-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: './TTNormsPro/TTNormsPro-ExtraBlackItalic.woff2',
      weight: '900',
      style: 'italic',
    },
    {
      path: './TTNormsPro/TTNormsPro-ExtraLight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: './TTNormsPro/TTNormsPro-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: './TTNormsPro/TTNormsPro-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './TTNormsPro/TTNormsPro-ExtraBlack.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: './TTNormsPro/TTNormsPro-BoldItalic.woff2',
      weight: 'bold',
      style: 'italic',
    },
    {
      path: './TTNormsPro/TTNormsPro-BlackItalic.woff2',
      weight: '900',
      style: 'italic',
    },
    {
      path: './TTNormsPro/TTNormsPro-Black.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: './TTNormsPro/TTNormsPro-Italic.woff2',
      weight: 'normal',
      style: 'italic',
    },
  ],
});

export { panton, ttNormsPro };
