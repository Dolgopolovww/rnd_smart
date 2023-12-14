import { useTemplateStore } from '@/store/templateStore';
import { TemplateStoreInitializer } from '@/shared/ui/TemplateStoreInitializer';
import { LandingTemplate } from '@/types/template';
import { testTemplateData } from './testTemplateData';
import { Metadata } from 'next';

const getData = async (): Promise<{
  templateKey: string;
  data: LandingTemplate;
  metadata: Metadata;
}> => {
  return new Promise((res) => {
    res({
      templateKey: 'template1',
      // TODO: fetch data from backend
      data: testTemplateData,
      metadata: {
        title: 'Новогодний конкурс',
        description: 'Тест описания',
      },
    });
  });
};

export const generateMetadata = async () => {
  const {
    metadata: { title, description },
  } = await getData();

  return {
    title,
    description,
  };
};

async function Layout(props: any) {
  const { templateKey, data } = await getData();
  useTemplateStore.setState({ data: data });
  return (
    <div className=''>
      <TemplateStoreInitializer data={data} />
      {props[templateKey]}
    </div>
  );
}

export default Layout;
