'use client';

import { createRef } from 'react';
import { Ad } from './components/Ad';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Main } from './components/Main';
import { panton, ttNormsPro } from './fonts';
import dynamic from 'next/dynamic';
import { useTermsModal } from '@/store/termsModalStore';
import { useSuccessModal } from '@/store/successModalStore';

const SuccessModal = dynamic(
  () =>
    import('./components/SuccessModal').then((module) => module.SuccessModal),
  {
    ssr: false,
  }
);

const TermsModal = dynamic(
  () => import('./components/TermsModal').then((module) => module.TermsModal),
  {
    ssr: false,
  }
);

function Page() {
  const mainBlockRef = createRef<HTMLDivElement>();
  const scrollToMainBlock = () => {
    mainBlockRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const isTermsModalOpened = useTermsModal((state) => state.open);
  const isSuccessModalOpened = useSuccessModal((state) => state.open);

  return (
    <div className={`${panton.variable} ${ttNormsPro.variable}`}>
      <Header />
      <main>
        <Hero onButtonClick={scrollToMainBlock} />
        <Main ref={mainBlockRef} />
        <Ad />
      </main>
      <Footer />
      {isSuccessModalOpened && <SuccessModal />}
      {isTermsModalOpened && <TermsModal />}
    </div>
  );
}

export default Page;
