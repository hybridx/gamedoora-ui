'use client';

import Link from 'next/link';
import { useFetchFeed } from '../../services/feed';
import { TFeed } from '../../services/feed/type';
import Navbar from './components/Navbar';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Home() {
  const { data, isError, isLoading } = useFetchFeed('hybridx');
  const { data: session } = useSession();
  if (!session) {
    redirect('/sign-in');
  }
  return (
    <main className="grid">
      <Navbar />
      <Link href={'/sign-in'} className="text-[32px]">
        Goto Sign-in
      </Link>
      <Link href={'/sign-up'} className="text-[32px]">
        Goto Sign-up
      </Link>
      <Link href={'/profile/hybridx'} className="text-[32px]">
        Goto {`Hybridx's`} profile
      </Link>
      <div>The following is some feed data</div>
      <div>
        {data?.feed.map((f: TFeed) => (
          <div className="p-4 bg-blue-200 w-40" key={f.id}>
            <p>{f.title}</p>
            <p>{f.author}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
