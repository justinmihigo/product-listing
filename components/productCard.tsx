import React, { useContext, useState } from 'react';
import { View, Image, TouchableOpacity, Text, Modal } from 'react-native';
import Clickable from '@/components/clickable';
import CartContext from './provider';

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  count: number;
  description: string;
  rating: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, title, price, image, category, count, description, rating }) => {
  const [visible, setVisible] = useState(false);
  const { cart, addToCart, removeFromCart } = useContext<any>(CartContext);
  const product = cart.find((item:any) => item.id === id);
  const countItems = product ? product.countItems : 0;

  const handleAddToCart = () => {
    addToCart({ id, title, price, image, category, description, rating, countItems: 1 });
  };

  const handleRemoveFromCart = () => {
    removeFromCart(id);
  };

  return (
    <TouchableOpacity onPress={() => setVisible(true)}>
      <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setVisible(false)}
      >
        <View className='flex-1 items-center justify-center bg-[#00000070]'>
          <View className='bg-white mx-3 justify-center items-center gap-y-5 rounded-xl'>
            <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
            <Text className='px-4' style={{ fontFamily: "SenMedium" }}>{title}</Text>
            <Text className="font-[SenMedium]">ratings: {rating}</Text>
            <Text className='p-4 font-[SenRegular]'>{description}</Text>
            <Text className='px-4 font-[SenBold]'>Price: ${price}</Text>
            <View className='w-1/2 py-3 flex-row justify-between items-center font-[SenMedium]'>
              <Clickable title='Close' onPress={() => setVisible(false)} />
              {countItems !== 0 ? (
                <>
                  <Clickable title='-' onPress={handleRemoveFromCart} />
                  <Text className="font-[SenMedium]">{countItems}</Text>
                  <Clickable title='+' onPress={handleAddToCart} />
                </>
              ) : (
                <Clickable title='Add to Cart' onPress={handleAddToCart} />
              )}
            </View>
          </View>
        </View>
      </Modal>
      <View className="bg-white m-4 rounded-xl p-4 flex-row gap-1 gap-x-4 w-1/1 items-center">
        <View>
          <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
        </View>
        <View style={{ width: "60%" }}>
          <Text className="text-center mb-5 font-[SenBold]">{title}</Text>
          <View className="flex-row justify-between px-4">
            <Text className="text-center mb-2 font-[SenMedium]">${price}</Text>
            <Text className="text-center font-[SenRegular]">{category.charAt(0).toUpperCase() + category.slice(1)}</Text>
          </View>
          <View className="flex-row justify-between px-3 items-center">
            <Text className="text-center mb-2 font-[SenRegular]">ratings: {rating}</Text>
            {countItems !== 0 ? (
              <>
                <Clickable title='-' onPress={handleRemoveFromCart} />
                <Text className='font-[SenMedium]'>{countItems}</Text>
                <Clickable title='+' onPress={handleAddToCart} />
              </>
            ) : (
              <Clickable title='Add to Cart' onPress={handleAddToCart} />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
