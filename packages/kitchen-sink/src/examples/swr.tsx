/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import useSWR from 'swr';
import { block } from 'million/react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Swr = block(() => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, error, isLoading } = useSWR(
    'https://api.github.com/repos/vercel/swr',
    fetcher,
  );

  if (error) return 'An error has occurred.';
  if (isLoading) return 'Loading...';
  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👁 {data.subscribers_count}</strong>{' '}
      <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  );
});

// eslint-disable-next-line import/no-default-export
export default Swr;
