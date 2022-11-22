import { MockGoodsItem } from '../types';

const useGoodsList = (): MockGoodsItem[] => {
  return [
    {
      id: 1,
      title: '商品1',
      price: 100,
      image: 'https://picsum.photos/300/200',
      desc: '人而不仁，如礼何？人而不仁，如乐何。',
    },
    {
      id: 2,
      title: '商品2',
      price: 200,
      image: 'https://picsum.photos/300/200',
      desc: '人而不仁，如礼何？人而不仁，如乐何。',
    },
    {
      id: 3,
      title: '商品3',
      price: 300,
      image: 'https://picsum.photos/300/200',
      desc: '人而不仁，如礼何？人而不仁，如乐何。',
    },
    {
      id: 4,
      title: '商品4',
      price: 400,
      image: 'https://picsum.photos/300/200',
      desc: '人而不仁，如礼何？人而不仁，如乐何。',
    },
    // {
    //   id: 5,
    //   title: '商品5',
    //   price: 500,
    //   image: 'https://picsum.photos/300/200',
    //   desc: '人而不仁，如礼何？人而不仁，如乐何。',
    // },
    // {
    //   id: 6,
    //   title: '商品6',
    //   price: 600,
    //   image: 'https://picsum.photos/300/200',
    //   desc: '业精于勤，荒于嬉；行成于思，毁于随。',
    // },
    // {
    //   id: 7,
    //   title: '商品7',
    //   price: 700,
    //   image: 'https://picsum.photos/300/200',
    //   desc: '业精于勤，荒于嬉；行成于思，毁于随。',
    // },
    // {
    //   id: 8,
    //   title: '商品8',
    //   price: 800,
    //   image: 'https://picsum.photos/300/200',
    //   desc: '业精于勤，荒于嬉；行成于思，毁于随。',
    // },
    // {
    //   id: 9,
    //   title: '商品9',
    //   price: 900,
    //   image: 'https://picsum.photos/300/200',
    //   desc: '业精于勤，荒于嬉；行成于思，毁于随。',
    // },
    // {
    //   id: 10,
    //   title: '商品10',
    //   price: 1000,
    //   image: 'https://picsum.photos/300/200',
    //   desc: '业精于勤，荒于嬉；行成于思，毁于随。',
    // },
  ];
};

export default useGoodsList;
