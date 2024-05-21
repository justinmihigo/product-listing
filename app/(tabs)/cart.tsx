import React, { useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import CartContext from '@/components/provider';
import ProductCard from '@/components/productCard';

const Cart: React.FC = () => {
    const { cart } = useContext<any>(CartContext);

    return (
        <View>
            <FlatList
                data={cart}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    //   <View key={item.id}>
                    //     <Text>{item.title}</Text>
                    //     <Text>Quantity: {item.countItems}</Text>
                    //   </View>
                    <ProductCard
                        key={item.id}
                        id={item.id}
                        rating={item.rating}
                        title={item.title}
                        price={item.price}
                        image={item.image}
                        category={item.category}
                        count={item.count}
                        description={item.description}
                    />
                )}
            />

        </View>
    );
};

export default Cart;
