import { View, Text, ScrollView } from "react-native";
import ProductCard from "@/components/productCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
export default function Cart(){
    const [product, setProduct] = useState();
    const fetchProducts = async () => {
        try{
            const stored= await AsyncStorage.getItem('cart') as any;
            console.log(stored);
            setProduct(stored);
        }
        catch(e){
            console.log(e);
        }
    }
    useEffect(()=>{
        fetchProducts()
    }, []);
    return(
        <View>
             <View>
                <Text className="text-xl mt-10 ml-10 mb-2 font-[SenBold]">Cart</Text>
            </View>
            <ScrollView>
                {product && JSON.parse(product).map((item:any, index:number) =>{
                    return(
                        
                        <ProductCard
                        key={index}
                        id={item.id}
                        rating={item.rating}
                        title={item.title}
                        price={item.price}
                        image={item.image}
                        category={item.category}
                        count={item.count}
                        description={item.description}
                        />
                        
                    )
                })}
            </ScrollView>
        </View>
    )
}