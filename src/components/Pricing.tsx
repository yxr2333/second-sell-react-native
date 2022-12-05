import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { lightColors, PricingCard } from '@rneui/themed';
import * as React from 'react';
import { ScrollView } from 'react-native';
import { getRecentSpike } from '../api/spike';
import { SpikeInfo } from '../types/response/developResponse';
type PricingCardComponentProps = NativeStackScreenProps<any, any>;
const Pricing: React.FC<PricingCardComponentProps> = ({ navigation }) => {
  const [spikes, setSpikes] = React.useState<SpikeInfo[]>([]);
  React.useEffect(() => {
    getRecentSpike(5).then(res => {
      //@ts-ignore
      const { code, data } = res as GetRecentSpikeResult;
      if (code === 200 && data) {
        console.log(data);
        setSpikes(data);
      }
    });
  }, []);
  const handleButtonPress = (spikeId: number) => {
    console.log('ok', spikeId);
    navigation.push('SpikeDetailScreen', { spikeId });
  };
  return (
    <>
      <ScrollView style={{ width: '100%' }}>
        {spikes.map((item, index) => (
          <PricingCard
            key={index}
            color={lightColors.primary}
            title={item.id.toString()}
            price={item.name}
            info={[`开始日期：${item.startDate}`, `结束日期：${item.endDate}`]}
            button={{
              title: '立即查看',
              icon: 'flight-takeoff',
              onPress: () => handleButtonPress(item.id),
            }}
          />
        ))}
      </ScrollView>
    </>
  );
};

export default Pricing;
