import { Footer } from 'app/components/layout/Footer';
import React from 'react';
import { PageContainer } from 'app/components/common/PageContainer';
import { TournamentsTable } from 'app/components/tournaments/TournamentsTable';

export default function Page() {
  return (
    <PageContainer>
      <TournamentsTable />
      <Footer />
    </PageContainer>
  );
}
