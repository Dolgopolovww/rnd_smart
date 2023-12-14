'use client';

import { useTemplateStore } from '@/store/templateStore';
import { LandingTemplate } from '@/types/template';
import { useRef } from 'react';

export const TemplateStoreInitializer = ({
  data,
}: {
  data: LandingTemplate;
}) => {
  const isStoreInitialized = useRef(false);
  if (!isStoreInitialized.current) {
    useTemplateStore.setState({ data });
    isStoreInitialized.current = true;
  }
  return null;
};
