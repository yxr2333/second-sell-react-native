import { lightColors, PricingCard } from '@rneui/themed';
import * as React from 'react';
import { ScrollView } from 'react-native';
type PricingCardComponentProps = {};
const Pricing: React.FC<PricingCardComponentProps> = () => {
  return (
    <>
      <ScrollView style={{ width: '100%' }}>
        <PricingCard
          color={lightColors.primary}
          title="Free"
          price="$0"
          info={['1 User', 'Basic Support', 'All Core Features']}
          button={{ title: ' GET STARTED', icon: 'flight-takeoff' }}
        />
        <PricingCard
          color={lightColors.secondary}
          title="Starter"
          price="$19"
          info={['10 Users', 'Basic Support', 'All Core Features']}
          button={{ title: ' GET STARTED', icon: 'flight-takeoff' }}
        />
        <PricingCard
          color={lightColors.secondary}
          title="Enterprise"
          price="$49"
          info={['100 Users', 'One on One Support', 'All Core Features']}
          button={{ title: ' GET STARTED', icon: 'flight-takeoff' }}
        />
      </ScrollView>
    </>
  );
};

export default Pricing;
