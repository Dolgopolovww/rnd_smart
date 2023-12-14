// TEMPLATE

export interface LandingTemplate {
  header: Header;
  heroBlock: HeroBlock;
  mainBlock: MainBlock;
  adBlock: AdBlock;
  footer: Footer;
  successPopup: SuccessPopup;
  termsPopup: TermsPopup;
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
  text: Text;
  termsBtn: TextButton | null;
  heroButton: Button;
}

export interface MainBlock {
  bgColor: string;
  mainText: Text;
  interactive: Interactive[];
  participationBtn: ParticipationButton;
  termsBtn: TextButton | null;
}

export interface AdBlock {
  bgColor: string;
  ads: Ad[];
}

export interface Footer {
  logo: string;
  partner: Bookmaker | null;
  bgColor: string | null;
  socials: Social[];
}

export interface SuccessPopup {
  bgColor: string;
  text: Text;
  subText: Text;
  img: string;
}

export interface TermsPopup {
  bgColor: string;
  text: Text;
}

// MAIN BLOCK DECOMPOSE

export interface Interactive {
  blocks: InteractiveCard[];
  resetBtn: ResetButton | null;
}

export interface InteractiveCard {
  id: number;
  key: string;
  img: string | null;
  text: string | null;
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

export interface TextButton extends Text {}

export interface Button {
  bgColor: string;
  text: Text;
  variant: ButtonVariants;
  url: string | null;
}

export type ButtonVariants = 'rounded' | 'skewed';
