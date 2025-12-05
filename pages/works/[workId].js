import { useRouter } from 'next/router';
import useSWR from 'swr';
import BookDetails from '@/components/BookDetails';
import PageHeader from '@/components/PageHeader';
import Error from 'next/error';

export default function Work() {
  const router = useRouter();
  const { workId } = router.query;

  const { data, error, isLoading } = useSWR(
    workId ? `https://openlibrary.org/works/${workId}.json` : null
  );

  if (!router.isReady) return null;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error || !data || Object.keys(data).length === 0) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <PageHeader text={data.title} />
      <BookDetails book={data} workId={workId} />
    </>
  );
}