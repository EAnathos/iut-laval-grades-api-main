import React from 'react';
import { Header } from '@web/components/header';
import { getUser } from '@web/lib/auth';

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  return (
    <>
      <Header
        firstName={user?.firstName ?? ''}
        lastName={user?.lastName ?? ''}
        department={user?.department ?? ''}
      />
      {children}
    </>
  );
}
