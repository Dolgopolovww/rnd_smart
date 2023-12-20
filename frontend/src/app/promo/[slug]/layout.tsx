import { TemplateStoreInitializer } from '@/shared/ui/TemplateStoreInitializer';
import { useTemplateStore } from '@/store/templateStore';
import { LandingTemplate } from '@/types/template';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { testTemplateData } from './testTemplateData';

const API_URL = 'http://localhost';
const PORT = 5005;

interface LayoutProps {
  params: { slug: string };
  template1: ReactNode;
  template2: ReactNode;
}

const getData = async (slug: string): Promise<LandingTemplate | null> => {
  if (slug === 'test') {
    return new Promise((res) => res(testTemplateData));
  } else {
    const res = await fetch(
      `${API_URL}:${PORT}/admin/land?` +
        new URLSearchParams({
          slug,
        }),
      // temporary disabled cache for testing
      { cache: 'no-cache' }
    );
    if (res.status === 404) {
      notFound();
    }
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  }
};

// TODO: generate meta

async function Layout(props: LayoutProps) {
  const data = await getData(props.params.slug);
  if (!data) {
    notFound();
  }
  useTemplateStore.setState({ data: data });
  return (
    <div className=''>
      <TemplateStoreInitializer data={data} />
      {props['template1']}
    </div>
  );
}

export default Layout;
