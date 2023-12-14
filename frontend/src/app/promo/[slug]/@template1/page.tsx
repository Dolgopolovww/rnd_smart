'use client';

import { createRef } from 'react';
import { Ad } from './components/Ad';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Main } from './components/Main';
import { SuccessModal } from './components/SuccessModal';
import { TermsModal } from './components/TermsModal';
import { panton, ttNormsPro } from './fonts';

function Page() {
  const mainBlockRef = createRef<HTMLDivElement>();
  const scrollToMainBlock = () => {
    mainBlockRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`${panton.variable} ${ttNormsPro.variable}`}>
      <Header />
      <main>
        <Hero onButtonClick={scrollToMainBlock} />
        <Main ref={mainBlockRef} />
        <Ad />
      </main>
      <Footer />
      <SuccessModal />
      <TermsModal />
    </div>
  );
}

export default Page;
