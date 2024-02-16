import { OptionDetails } from 'app/components/options-trading/option-details/OptionDetails';
import { OptionBidding } from 'app/components/options-trading/bidding/OptionBidding';
import { BiddingHistory } from 'app/components/options-trading/BiddingHistory';
import { useAvailableOptions } from 'app/hooks/web3/useAvailableOptions';
import { useSelectedOptionInfoFeed } from 'app/hooks/web3/useSelectedOptionInfoFeed';
import { useCreateSession } from 'app/hooks/ui/useCreateSession';
import { Footer } from 'app/components/layout/Footer';
import React from 'react';
import { PageContainer } from 'app/components/common/PageContainer';

export default function Page() {
  useCreateSession();
  useAvailableOptions();
  useSelectedOptionInfoFeed();

  return (
    <PageContainer>
      <OptionDetails />
      <OptionBidding />
      <BiddingHistory />
      <Footer />
    </PageContainer>
  );
}
