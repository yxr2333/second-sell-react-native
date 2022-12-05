import {
  Button,
  CheckBox,
  Image,
  Input,
  Tab,
  TabView,
  Text,
} from '@rneui/themed';
import { Select, SelectItem } from '@ui-kitten/components';
import { IndexPath } from '@ui-kitten/components/ui';
import * as React from 'react';
import { Dimensions, Platform, ScrollView, View } from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';
import { uploadImage } from '../../api/common';
import { getAllGoodsType } from '../../api/goods';
import {
  GetAllGoodsTypeResult,
  GoodsTypeBaseInfo,
} from '../../types/response/developResponse';
import useBrands from './../../hooks/useBrands';
const baseUrl =
  'https://android-class.oss-cn-hangzhou.aliyuncs.com/20221201144952.png';
const { width } = Dimensions.get('window');
const PublishScreen: React.FC = () => {
  React.useEffect(() => {
    getAllGoodsType().then(res => {
      if (res) {
        //@ts-ignore
        const { code, data } = res as GetAllGoodsTypeResult;
        if (code === 200) {
          console.log(data);
          if (data) {
            setGoodsTypes(data);
          }
        }
      }
    });
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      setW(width);
    });
  });
  const [tabIndex, setTabIndex] = React.useState(0);
  // 获取宽度
  const [w, setW] = React.useState(0);
  const brands = useBrands();
  const [goodsTypes, setGoodsTypes] = React.useState<GoodsTypeBaseInfo[]>([
    {
      id: 1,
      name: '手机',
      typeLevel: 0,
    },
  ]);
  // 表单数据部分
  const [name, setName] = React.useState(''); // 商品名称
  const [url, setUrl] = React.useState(baseUrl); // 商品图片地址
  const [description, setDescription] = React.useState(''); // 商品描述
  const [price, setPrice] = React.useState(''); // 商品价格
  const [checked, setChecked] = React.useState(false); // 是否打折
  const [discount, setDiscount] = React.useState(''); // 折扣率
  const [count, setCount] = React.useState(''); // 商品数量
  const [selectedCateIndex, setSelectedCateIndex] = React.useState(
    // 商品分类
    new IndexPath(0),
  );
  const [selectedBrandIndex, setSelectedBrandIndex] = React.useState(
    // 商品品牌
    new IndexPath(0),
  );

  const handleSelectCateIndex = (index: IndexPath | IndexPath[]) => {
    setSelectedCateIndex(index as IndexPath);
  };

  const handleSelectBrandIndex = (index: IndexPath | IndexPath[]) => {
    setSelectedBrandIndex(index as IndexPath);
  };

  const handleSelectImage = () => {
    console.log('select image');
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then((image: { path: any }) => {
        const { path } = image;
        let source;
        if (Platform.OS === 'android') {
          // Android
          source = path;
        } else {
          source = path.replace('file://', '');
        }
        let formData = new FormData();
        let file = {
          uri: source,
          type: 'image/jpeg',
          name: source.split('/').pop(),
        };
        formData.append('file', file);

        uploadImage(formData)
          .then(res => res.json())
          .then(res => {
            const { code, data } = res;
            if (code === 200) {
              // 上传成功设置图片的url
              console.log(data);
              setUrl(data);
            } else {
              console.error('文件上传失败', res);
            }
          })
          .catch(err => {
            console.error('文件上传失败', err);
          });
      })
      .catch(err => {
        console.log('取消选择');
        console.error(err);
      });
  };

  const handleSubmit = () => {
    const state = {
      name,
      url,
      description,
      price,
      checked,
      discount,
      count,
      selectedCateIndex: selectedCateIndex.row,
      selectedBrandIndex,
    };
    console.log('submit', state);
  };
  const goodsOptions = goodsTypes.map((item, index) => (
    <SelectItem key={index} title={item.name} />
  ));
  const brandsOptions = brands.map((brand, index) => (
    <SelectItem key={index} title={brand.name} />
  ));
  return (
    <>
      <Tab
        value={tabIndex}
        onChange={setTabIndex}
        indicatorStyle={{ backgroundColor: '#007aff' }}
        titleStyle={{ color: '#000' }}>
        <Tab.Item title="发布商品" />
        <Tab.Item title="发布求购" />
      </Tab>
      <TabView value={tabIndex} onChange={setTabIndex}>
        <TabView.Item>
          <>
            <ScrollView
              style={{
                width: w,
                paddingLeft: 15,
                paddingRight: 15,
                marginBottom: 15,
                marginTop: 15,
              }}>
              <Input label="商品名称" onChangeText={setName} />
              {/* 文件上传组件 */}
              <View style={{ marginBottom: 15, padding: 5 }}>
                <Text
                  style={{
                    color: '#86939e',
                    fontWeight: 'bold',
                    fontSize: 16,
                    marginBottom: 8,
                  }}>
                  上传文件
                </Text>
                <Image
                  onPress={() => handleSelectImage()}
                  style={{ width: 100, height: 100 }}
                  source={{
                    uri: url,
                  }}
                />
                <View style={{ marginTop: 10 }}>
                  <Button title="清除图片" onPress={() => setUrl(baseUrl)} />
                </View>
              </View>
              <Input label="商品描述" onChangeText={setDescription} />
              <Input label="商品价格" onChangeText={setPrice} />
              <CheckBox
                containerStyle={{ backgroundColor: '#f2f2f2' }}
                title="是否打折"
                checked={checked}
                onPress={() => setChecked(!checked)}
              />
              {checked && <Input label="折扣率" onChangeText={setDiscount} />}
              <Input label="商品数量" onChangeText={setCount} />

              {/* 商品分类选择器 */}
              <Select
                size="large"
                label="商品分类"
                value={goodsTypes[selectedCateIndex.row].name}
                multiSelect={false}
                selectedIndex={selectedCateIndex}
                onSelect={index => handleSelectCateIndex(index)}>
                {goodsOptions}
              </Select>

              {/* 商品品牌选择器 */}
              <Select
                style={{ marginTop: 15 }}
                size="large"
                label="商品品牌"
                value={brands[selectedBrandIndex.row].name}
                multiSelect={false}
                selectedIndex={selectedBrandIndex}
                onSelect={index => handleSelectBrandIndex(index)}>
                {brandsOptions}
              </Select>

              <View style={{ marginTop: 10 }}>
                <Button size="lg" title="发布" onPress={handleSubmit} />
              </View>
            </ScrollView>
          </>
        </TabView.Item>
        <TabView.Item>
          <Text>Word</Text>
        </TabView.Item>
      </TabView>
    </>
  );
};

export default PublishScreen;
