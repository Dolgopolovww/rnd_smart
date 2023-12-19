// TEMPLATE

export interface LandingTemplate {
  header: Header;
  heroBlock: HeroBlock;
  mainBlock: MainBlock;
  bonuses: AdBlock;
  footer: Footer;
  successPopup: SuccessPopup;
  termsPopup: TermsPopup;
  templateKey: string;
}

// BLOCKS

export interface Header {
  logo: string;
  partner: Bookmaker | null;
  bgColor: string | null;
}

export interface HeroBlock {
  bgColor: string;
  bgImg: string;
  text: string;
  textColor: string;
  termsBtn: TextButton | null;
  heroButton: Button;
}

export interface MainBlock {
  bgColor: string;
  text: string;
  textColor: string;
  interactive: Interactive[];
  participationBtn: ParticipationButton;
  termsBtn: TextButton | null;
}

export interface AdBlock {
  bgColor: string;
  text: string | null;
  textColor: string | null;
  logo: string | null;
  button: Button | null;
  bonuses: Bonus[];
  // ads: Ad[];
}

export interface Bonus {
  bgColor: string | null;
  img: string;
  text: string;
  textColor: string;
  bookmaker: Bookmaker;
  buttons: Button;
  typeBonus: {
    name: string;
  };
  value: {
    currency: string;
    value: number;
  };
}

export interface Footer {
  logo: string;
  partner: Bookmaker | null;
  bgColor: string | null;
  socials: Social[];
}

export interface SuccessPopup {
  bgColor: string;
  // text: Text;
  text: string;
  textColor: string;
  subText: string;
  subTextColor: string;
  // subText: Text;
  img: string;
}

export interface TermsPopup {
  bgColor: string;
  // text: Text;
  text: string;
  textColor: string;
}

// MAIN BLOCK DECOMPOSE

export interface Interactive {
  blocks: InteractiveCard[];
  resetBtn: ResetButton | null;
}

export interface InteractiveCard {
  // id: number;
  key: string;
  img: string | null;
  text: string | null;
  textColor: string | null;
}

export interface ResetButton extends InteractiveCard {}

export interface ParticipationButton extends Button {
  analyticsEndpoint: string;
}

// AD BLOCK DECOMPOSE

export interface Ad {
  logo: string | null;
  title: Text | null;
  button: Button | null;
  list: AdCard[];
}

export interface AdCard {
  bgColor: string;
  img: string;
  value: Text;
  text: Text;
  type: Text;
  adUrl: string | null;
  date?: Pick<Button, 'bgColor' | 'text'> | null;
  bookmaker: Bookmaker;
  buttons: Button[];
}

// SHARED

export interface Social {
  name: string;
  url: string;
  icon: string;
}

export interface Bookmaker {
  logo: string;
  name: string;
  url: string;
}

export interface Text {
  text: string;
  textColor: string;
}

export type TextButton = Pick<Button, 'text' | 'textColor'>;

export interface Button {
  bgColor: string;
  text: string;
  textColor: string;
  variant: ButtonVariants;
  url: string | null;
}

export type ButtonVariants = 'rounded' | 'skewed';
