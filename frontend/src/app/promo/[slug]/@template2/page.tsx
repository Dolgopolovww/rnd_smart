import { useTemplateStore } from '@/store/templateStore';
// import { Button } from '@/components/Button';
// import Test from '@/components/Test';

function Page() {
  const { data } = useTemplateStore.getState();
  return (
    <>
      <h1>{data?.header.bgColor}</h1>
    </>
  );
}

export default Page;
