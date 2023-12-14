import { LandingTemplate } from '@/types/template';

export const testTemplateData: LandingTemplate = {
  header: {
    bgColor: '#fff',
    logo: 'https://bookmaker-ratings.ru/promo/championsleague/assets/rb-full.11cf3cb5.svg',
    partner: null,
  },
  heroBlock: {
    bgColor: '#93c5fd',
    bgImg:
      'https://bookmaker-ratings.ru/promo/championsleague/assets/bg-desktop-xlg.7ac0df68.png',
    heroButton: {
      bgColor: '#fff',
      text: { text: 'Участвовать', textColor: '#07e' },
      url: null,
      variant: 'skewed',
    },
    termsBtn: { text: 'Условия', textColor: '#fff' },
    text: {
      text: 'Выиграй один из 20-ти новогодних подарков от Рейтинга Букмекеров',
      textColor: '#fff',
    },
  },
  mainBlock: {
    mainText: {
      text: 'Хочешь получать еще больше эксклюзивных бонусов подходящих именно тебе?\nУкажи в каких букмекерских конторах ты уже делаешь ставки и участвуй в розыгрыше!',
      textColor: '#07e',
    },
    bgColor: '#fff',
    interactive: [
      {
        blocks: [
          {
            id: 1,
            key: '1x',
            img: 'https://bookmaker-ratings.ru/promo/championsleague/assets/1x.7f6b41ff.svg',
            text: null,
          },
          {
            id: 2,
            key: 'pari',
            img: 'https://bookmaker-ratings.ru/promo/championsleague/assets/1x.7f6b41ff.svg',
            text: null,
          },
          {
            id: 3,
            key: 'olimp',
            img: 'https://bookmaker-ratings.ru/promo/championsleague/assets/1x.7f6b41ff.svg',
            text: null,
          },
        ],
        resetBtn: {
          id: 6,
          key: 'test',
          img: null,
          text: 'Я не делаю ставки',
        },
      },
    ],
    termsBtn: null,
    participationBtn: {
      analyticsEndpoint: 'test',
      bgColor: '#07e',
      text: { text: 'Участвовать', textColor: '#fff' },
      url: null,
      variant: 'skewed',
    },
  },
  adBlock: {
    bgColor: '#dbeafe',
    ads: [
      {
        title: {
          text: 'Лучшие бонусы',
          textColor: '#000',
        },
        logo: null,
        button: {
          variant: 'rounded',
          bgColor: '#8ac0f7',
          text: {
            text: 'Смотреть все',
            textColor: '#fff',
          },
          url: 'https://youtube.com',
        },
        list: [
          {
            bookmaker: {
              logo: 'https://bookmaker-ratings.ru/wp-content/uploads/2019/01/pari_logo_on-dark_163x53.png',
              name: 'пари',
              url: 'https://pari.com',
            },
            buttons: [
              {
                bgColor: '#8ac0f7',
                text: { text: 'Получить бонус', textColor: '#fff' },
                url: 'http://youtube.com',
                variant: 'rounded',
              },
            ],
            img: 'https://bookmaker-ratings.ru/wp-content/uploads/2023/12/16-tur-La-Liga.jpg',
            text: {
              text: 'Конкурс прогнозов на 16-й тур Ла Лиги 2023/24 от БК Pari',
              textColor: '#000',
            },
            type: {
              text: 'Фрибет',
              textColor: '#000',
            },
            bgColor: '#fff',
            adUrl: 'https://youtube.com',
            value: { text: '5000 ₽', textColor: '#fff' },
          },
          {
            bookmaker: {
              logo: 'https://bookmaker-ratings.ru/wp-content/uploads/2019/01/pari_logo_on-dark_163x53.png',
              name: 'пари',
              url: 'https://pari.com',
            },
            buttons: [
              {
                bgColor: '#8ac0f7',
                text: { text: 'Получить бонус', textColor: '#fff' },
                url: 'http://youtube.com',
                variant: 'rounded',
              },
            ],
            img: 'https://bookmaker-ratings.ru/wp-content/uploads/2023/12/16-tur-La-Liga.jpg',
            text: {
              text: 'Конкурс прогнозов на 16-й тур Ла Лиги 2023/24 от БК Pari',
              textColor: '#000',
            },
            type: {
              text: 'Фрибет',
              textColor: '#000',
            },
            bgColor: '#fff',
            adUrl: 'https://youtube.com',
            value: { text: '5000 ₽', textColor: '#fff' },
          },
          {
            bookmaker: {
              logo: 'https://bookmaker-ratings.ru/wp-content/uploads/2019/01/pari_logo_on-dark_163x53.png',
              name: 'пари',
              url: 'https://pari.com',
            },
            buttons: [
              {
                bgColor: '#8ac0f7',
                text: { text: 'Получить бонус', textColor: '#fff' },
                url: 'http://youtube.com',
                variant: 'rounded',
              },
            ],
            img: 'https://bookmaker-ratings.ru/wp-content/uploads/2023/12/16-tur-La-Liga.jpg',
            text: {
              text: 'Конкурс прогнозов на 16-й тур Ла Лиги 2023/24 от БК Pari',
              textColor: '#000',
            },
            type: {
              text: 'Фрибет',
              textColor: '#000',
            },
            bgColor: '#fff',
            adUrl: 'https://youtube.com',
            value: { text: '5000 ₽', textColor: '#fff' },
          },
          {
            bookmaker: {
              logo: 'https://bookmaker-ratings.ru/wp-content/uploads/2019/01/pari_logo_on-dark_163x53.png',
              name: 'пари',
              url: 'https://pari.com',
            },
            buttons: [
              {
                bgColor: '#8ac0f7',
                text: { text: 'Получить бонус', textColor: '#fff' },
                url: 'http://youtube.com',
                variant: 'rounded',
              },
            ],
            img: 'https://bookmaker-ratings.ru/wp-content/uploads/2023/12/16-tur-La-Liga.jpg',
            text: {
              text: 'Конкурс прогнозов на 16-й тур Ла Лиги 2023/24 от БК Pari',
              textColor: '#000',
            },
            type: {
              text: 'Фрибет',
              textColor: '#000',
            },
            bgColor: '#fff',
            adUrl: 'https://youtube.com',
            value: { text: '5000 ₽', textColor: '#fff' },
          },
        ],
      },
      {
        title: null,
        logo: 'https://bookmaker-ratings.ru/promo/championsleague/assets/rb-dark-contests.699bb9a3.svg',
        button: {
          variant: 'rounded',
          bgColor: '#07e',
          text: {
            text: 'Смотреть все',
            textColor: '#fff',
          },
          url: 'https://youtube.com',
        },
        list: [
          {
            bookmaker: {
              logo: 'https://bookmaker-ratings.ru/wp-content/uploads/2019/01/pari_logo_on-dark_163x53.png',
              name: 'пари',
              url: 'https://pari.com',
            },
            date: {
              bgColor: '#8ac0f7',
              text: {
                text: '10 января - 3 февраля',
                textColor: '#fff',
              },
            },
            img: 'https://bookmaker-ratings.ru/wp-content/uploads/2023/12/18-tur-RPL.jpg',
            type: {
              text: 'Футбол',
              textColor: '#000',
            },
            bgColor: '#fff',
            adUrl: 'https://youtube.com',
            text: {
              text: 'Конкурс прогнозов на 16-й тур Ла Лиги 2023/24 от БК Pari',
              textColor: '#000',
            },
            buttons: [
              {
                bgColor: '#8ac0f7',
                text: { text: 'Получить бонус', textColor: '#fff' },
                url: 'http://youtube.com',
                variant: 'rounded',
              },
              {
                bgColor: '#8ac0f7',
                text: { text: 'Получить бонус', textColor: '#fff' },
                url: 'http://youtube.com',
                variant: 'rounded',
              },
            ],
            value: {
              text: '5000 ₽',
              textColor: '#fff',
            },
          },
          {
            bookmaker: {
              logo: 'https://bookmaker-ratings.ru/wp-content/uploads/2019/01/pari_logo_on-dark_163x53.png',
              name: 'пари',
              url: 'https://pari.com',
            },
            date: {
              bgColor: '#8ac0f7',
              text: {
                text: '10 января - 3 февраля',
                textColor: '#fff',
              },
            },
            img: 'https://bookmaker-ratings.ru/wp-content/uploads/2023/12/18-tur-RPL.jpg',
            type: {
              text: 'Футбол',
              textColor: '#000',
            },
            bgColor: '#fff',
            adUrl: 'https://youtube.com',
            text: {
              text: 'Конкурс прогнозов на 16-й тур Ла Лиги 2023/24 от БК Pari',
              textColor: '#000',
            },
            buttons: [
              {
                bgColor: '#8ac0f7',
                text: { text: 'Получить бонус', textColor: '#fff' },
                url: 'http://youtube.com',
                variant: 'rounded',
              },
              {
                bgColor: '#8ac0f7',
                text: { text: 'Получить бонус', textColor: '#fff' },
                url: 'http://youtube.com',
                variant: 'rounded',
              },
            ],
            value: {
              text: '5000 ₽',
              textColor: '#fff',
            },
          },
          {
            bookmaker: {
              logo: 'https://bookmaker-ratings.ru/wp-content/uploads/2019/01/pari_logo_on-dark_163x53.png',
              name: 'пари',
              url: 'https://pari.com',
            },
            date: {
              bgColor: '#8ac0f7',
              text: {
                text: '10 января - 3 февраля',
                textColor: '#fff',
              },
            },
            img: 'https://bookmaker-ratings.ru/wp-content/uploads/2023/12/18-tur-RPL.jpg',
            type: {
              text: 'Футбол',
              textColor: '#000',
            },
            bgColor: '#fff',
            adUrl: 'https://youtube.com',
            text: {
              text: 'Конкурс прогнозов на 16-й тур Ла Лиги 2023/24 от БК Pari',
              textColor: '#000',
            },
            buttons: [
              {
                bgColor: '#8ac0f7',
                text: { text: 'Получить бонус', textColor: '#fff' },
                url: 'http://youtube.com',
                variant: 'rounded',
              },
              {
                bgColor: '#8ac0f7',
                text: { text: 'Получить бонус', textColor: '#fff' },
                url: 'http://youtube.com',
                variant: 'rounded',
              },
            ],
            value: {
              text: '5000 ₽',
              textColor: '#fff',
            },
          },
          {
            bookmaker: {
              logo: 'https://bookmaker-ratings.ru/wp-content/uploads/2019/01/pari_logo_on-dark_163x53.png',
              name: 'пари',
              url: 'https://pari.com',
            },
            date: {
              bgColor: '#8ac0f7',
              text: {
                text: '10 января - 3 февраля',
                textColor: '#fff',
              },
            },
            img: 'https://bookmaker-ratings.ru/wp-content/uploads/2023/12/18-tur-RPL.jpg',
            type: {
              text: 'Футбол',
              textColor: '#000',
            },
            bgColor: '#fff',
            adUrl: 'https://youtube.com',
            text: {
              text: 'Конкурс прогнозов на 16-й тур Ла Лиги 2023/24 от БК Pari',
              textColor: '#000',
            },
            buttons: [
              {
                bgColor: '#8ac0f7',
                text: { text: 'Получить бонус', textColor: '#fff' },
                url: 'http://youtube.com',
                variant: 'rounded',
              },
              {
                bgColor: '#8ac0f7',
                text: { text: 'Получить бонус', textColor: '#fff' },
                url: 'http://youtube.com',
                variant: 'rounded',
              },
            ],
            value: {
              text: '5000 ₽',
              textColor: '#fff',
            },
          },
        ],
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
    text: {
      text: 'Поздравляем!',
      textColor: '#fff',
    },
    subText: {
      text: 'Теперь вы участвуете в розыгрыше!\nУдачи и с Наступающим Новым Годом!',
      textColor: '#fff',
    },
  },
  termsPopup: {
    bgColor: '#fff',
    text: {
      text: 'Termspopup text',
      textColor: '#000',
    },
  },
};
