import { LandingTemplate } from '@/types/template';

export const testTemplateData: LandingTemplate = {
  header: {
    bgColor: '#fff',
    logo: 'https://bookmaker-ratings.ru/promo/championsleague/assets/rb-full.11cf3cb5.svg',
    partner: {
      logo: 'https://bookmaker-ratings.ru/promo/championsleague/assets/bkLogo.dfb951ff.svg',
      name: 'leon',
      url: 'https://bookmaker-ratings.ru/go/w/bk/666278/promo_button',
    },
  },
  heroBlock: {
    bgColor: '#93c5fd',
    bgImg:
      'https://bookmaker-ratings.ru/promo/championsleague/assets/bg-desktop-xlg.7ac0df68.png',
    heroButton: {
      bgColor: '#fff',
      textColor: '#07e',
      text: 'Участвовать',
      url: null,
      variant: 'skewed',
    },
    termsBtn: { text: 'Условия', textColor: '#fff' },
    text: 'Выиграй один из 20-ти новогодних подарков от Рейтинга Букмекеров',
    textColor: '#fff',
    isFullscreen: true,
  },
  mainBlock: {
    text: 'Хочешь получать еще больше эксклюзивных бонусов подходящих именно тебе?\nУкажи в каких букмекерских конторах ты уже делаешь ставки и участвуй в розыгрыше!',
    textColor: '#07e',
    bgColor: '#fff',
    interactive: {
      blocks: [
        {
          key: '1x',
          text: null,
          textColor: null,
          img: 'https://bookmaker-ratings.ru/promo/championsleague/assets/1x.7f6b41ff.svg',
        },
        {
          key: 'pari',
          text: null,
          textColor: null,
          img: 'https://bookmaker-ratings.ru/promo/championsleague/assets/1x.7f6b41ff.svg',
        },
        {
          key: 'leon',
          text: null,
          textColor: null,
          img: 'https://bookmaker-ratings.ru/promo/championsleague/assets/1x.7f6b41ff.svg',
        },
      ],
      resetBtn: {
        key: 'test',
        img: null,
        text: 'Я не делаю ставки',
        textColor: '#000',
      },
    },
    termsBtn: null,
    participationBtn: {
      analyticsEndpoint: 'test',
      bgColor: '#07e',
      text: 'Участвовать',
      textColor: '#fff',
      url: null,
      variant: 'skewed',
    },
  },
  bonuses: {
    bgColor: '#dbeafe',
    button: null,
    logo: null,
    text: 'Лучшие бонусы',
    textColor: '#000',
    bonuses: [
      {
        bookmaker: {
          logo: 'https://bookmaker-ratings.ru/wp-content/uploads/2019/01/pari_logo_on-dark_163x53.png',
          name: 'пари',
          url: 'https://pari.com',
        },
        text: 'Бонус «Бетсити»: страховка первой ставки до 3000 рублей',
        textColor: '#000',
        img: 'https://bookmaker-ratings.ru/wp-content/uploads/2023/12/18-tur-APL.jpg',
        bgColor: null,
        buttons: {
          bgColor: '#8ac0f7',

          text: 'Получить бонус',
          textColor: '#fff',

          url: 'http://youtube.com',
          variant: 'rounded',
        },
        typeBonus: { name: 'Фрибет' },
        value: {
          currency: '₽',
          value: 5000,
        },
      },
      {
        bookmaker: {
          logo: 'https://bookmaker-ratings.ru/wp-content/uploads/2019/01/pari_logo_on-dark_163x53.png',
          name: 'пари',
          url: 'https://pari.com',
        },
        text: 'Бонус «Бетсити»: страховка первой ставки до 3000 рублей',
        textColor: '#000',
        img: 'https://bookmaker-ratings.ru/wp-content/uploads/2023/12/18-tur-APL.jpg',
        bgColor: null,
        buttons: {
          bgColor: '#8ac0f7',

          text: 'Получить бонус',
          textColor: '#fff',

          url: 'http://youtube.com',
          variant: 'rounded',
        },
        typeBonus: { name: 'Фрибет' },
        value: {
          currency: '₽',
          value: 5000,
        },
      },
      {
        bookmaker: {
          logo: 'https://bookmaker-ratings.ru/wp-content/uploads/2019/01/pari_logo_on-dark_163x53.png',
          name: 'пари',
          url: 'https://pari.com',
        },
        text: 'Бонус «Бетсити»: страховка первой ставки до 3000 рублей',
        textColor: '#000',
        img: 'https://bookmaker-ratings.ru/wp-content/uploads/2023/12/18-tur-APL.jpg',
        bgColor: null,
        buttons: {
          bgColor: '#8ac0f7',

          text: 'Получить бонус',
          textColor: '#fff',

          url: 'http://youtube.com',
          variant: 'rounded',
        },
        typeBonus: { name: 'Фрибет' },
        value: {
          currency: '₽',
          value: 5000,
        },
      },
    ],
  },
  footer: {
    bgColor: '#fff',
    logo: 'https://bookmaker-ratings.ru/promo/championsleague/assets/rb-full.11cf3cb5.svg',
    partner: null,
    socials: [
      {
        icon: '/assets/icons/youtube.svg',
        name: 'youtube',
        url: 'https://youtube.com',
      },
      {
        icon: '/assets/icons/telegram.svg',
        name: 'tg',
        url: 'https://telegram.com',
      },
      {
        icon: '/assets/icons/vk.svg',
        name: 'vk',
        url: 'https://vk.com',
      },
    ],
  },
  successPopup: {
    bgColor: '#83B6EA',
    img: 'https://bookmaker-ratings.ru/promo/championsleague/assets/gift.c6478359.png',
    text: 'Поздравляем!',
    textColor: '#fff',
    subText:
      'Теперь вы участвуете в розыгрыше!\nУдачи и с Наступающим Новым Годом!',
    subTextColor: '#fff',
  },
  termsPopup: {
    bgColor: '#fff',
    text: 'Termspopup text',
    textColor: '#000',
  },
  templateKey: 'template1',
};
