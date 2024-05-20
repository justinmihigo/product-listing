import { Text, View, SafeAreaView, FlatList, Image, TouchableOpacity, ScrollView, Modal } from "react-native";
import ProductCard from "@/components/productCard";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
export type Product = {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: {
        rate: number,
        count: number
    }
}
type ItemProduct = {
    item: Product;
}
export default function Products() {
    const [products, setProducts] = useState<Array<Product>>([]);
    const [productsCategory, setProductsCategory] = useState<Object | any>([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const fetchProducts = async () => {
        try {
            const response = await fetch("https://fakestoreapi.com/products");
            const data = await response.json();
            setProducts(data);
            console.log("success");
            const categories: any = data.map((product: any) => {
                return product.category;
            });
            setProductsCategory(([...new Set(categories)]))
            console.log(productsCategory);
        } catch (error) {
            console.log(error);
        }
    }

    const renderItems = ({ item }: ItemProduct) => {
        return (
            <>
                {selectedCategory.toLowerCase() == item.category.toLowerCase() && (
                    <ProductCard
                        id={item.id}
                        title={item.title}
                        price={item.price}
                        image={item.image}
                        category={item.category}
                        count={item.rating.count}
                        rating={item.rating.rate}
                        description={item.description}

                    />)}
                {selectedCategory == 'All' ?
                    <ProductCard
                        id={item.id}
                        title={item.title}
                        price={item.price}
                        image={item.image}
                        category={item.category}
                        count={item.rating.count}
                        rating={item.rating.rate}
                        description={item.description}

                    /> : ''}
            </>

        );


    }
    useEffect(() => {
        fetchProducts();
    }, [])
    return (
        <SafeAreaView>
            <TouchableOpacity onPress={() => router.push('/cart')}>
                <Text className="text-xl mt-10 ml-10 mb-2">Products</Text>
            </TouchableOpacity>
            <View className="flex-row gap-x-1 mb-4 mx-0 mr-1">
                <ScrollView className="flex-row gap-x-6" horizontal={true} showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity className={`${selectedCategory == 'All' ? 'bg-orange-300' : ''} p-2 rounded-xl `} onPress={() => setSelectedCategory('All')}>
                        <Text>All</Text>
                    </TouchableOpacity>
                    {productsCategory.map((product: any, index: number) => {
                        return (
                            <TouchableOpacity key={index}
                                className={`${selectedCategory == product ? 'bg-orange-300' : ''}  p-2 rounded-xl flex justify-center`}
                                onPress={() => setSelectedCategory(product)}>
                                <Text>{product}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </View>
            <View>
                <FlatList
                    data={products}
                    renderItem={renderItems}
                    keyExtractor={(item) => item.id.toString()}
                    style={{ height: "83%" }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    )
}