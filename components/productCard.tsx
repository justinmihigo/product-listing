import { useContext, useState } from 'react';
import { View, Image, TouchableOpacity, Text, Modal } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
type ProductCard = {
    id: number;
    description: string;
    title: string,
    price: number,
    image: string,
    category: string,
    count: number,
    rating: number,
}
import Clickable from "@/components/clickable";

export default function ProductCard({ id,title, price, image, category, count, description, rating }: ProductCard) {
    const [countItems, setCountItems] = useState(0);
    const [visible, setVisible] = useState(false);
    // const {prodId, countItems, setCountItems}= useContext<Partial<Count>>(CounterContext) as any
    console.log(countItems);
    const storeData=async(item:ProductCard)=>{
        setCountItems(countItems + 1);
        try {
            const allData=[];
            allData.push(Object.assign(item, {countItems:countItems+1}));
            const jsonValue = JSON.stringify(allData);
            const existingData=await AsyncStorage.getItem('cart') as any;
            
            console.log(existingData);
            if(existingData==null && countItems==0){
                await AsyncStorage.setItem('cart', jsonValue); 
            }
            else if(existingData!=null && countItems!=0){
                const updates:any=[]
                JSON.parse(jsonValue).map((item:any)=>{
                       updates.push(Object.assign(item, countItems)) ;
                })

                await AsyncStorage.setItem('cart',JSON.stringify(updates));
            }
            else{
                JSON.parse(existingData).map((item:any)=>{
                    allData.push(item);
                })  
                await AsyncStorage.setItem('cart',JSON.stringify(allData));
            }
            
        } catch (e) {
            console.log(e)
        }

    }
    return (
        <TouchableOpacity onPress={() => setVisible(true)}>
            <Modal
                visible={visible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setVisible(false)}
            >
                <View className='flex-1 items-center justify-center bg-[#00000070]' >
                    <View className='bg-white mx-3 justify-center items-center gap-y-5 rounded-xl'>
                        <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
                        <Text className='px-4' style={{fontFamily:"SenMedium"}}>{title}</Text>
                        <Text className="font-[SenMedium]">ratings:{count}</Text>
                        <Text className='p-4 font-[SenRegular]'>{description}</Text>
                        <Text className='px-4 font-[SenBold]'>Price: ${price}</Text>
                        <View className='w-1/2 py-3 flex-row justify-between items-center font-[SenMedium]'>
                            <Clickable title='Close' onPress={() => setVisible(false)} />
                            {countItems !== 0 ? (
                            <>
                                <Clickable title='-' onPress={() => setCountItems(countItems - 1)} />
                                <Text className="font-[SenMedium]">{countItems}</Text>
                                <Clickable title='+' onPress={() => setCountItems(countItems + 1)} />
                            </>
                        ) : (  

                            <Clickable title={countItems==0?'Add to cart':'Remove'} onPress={() => storeData({id,title, price, image, category, count, description, rating})} />
                        )}
                        </View>
                    </View>
                </View>
            </Modal>
            <View className="bg-white m-4 rounded-xl p-4 flex-row gap-1 gap-x-4 w-1/1 items-center" >
                <View>
                    <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
                </View>
                <View style={{ width: "60%" }}>
                    <Text className="text-center mb-5 font-[SenBold]">{title}</Text>
                    <View className="flex-row justify-between px-4 ">
                        <Text className="text-center mb-2 font-[SenMedium]">${price}</Text>
                        <Text className="text-center font-[SenRegular]">{[category.charAt(0).toUpperCase(), category.slice(1)]}</Text>
                    </View>
                    <View className="flex-row justify-between px-3 items-center">
                        <Text className="text-center mb-2 font-[SenRegular]">ratings:{count}</Text>
                        {countItems !== 0 ? (
                            <>
                                <Clickable title='-' onPress={() => setCountItems(countItems - 1)} />
                                <Text className='font-[SenMedium]'>{countItems}</Text>
                                <Clickable title='+' onPress={() => setCountItems(countItems + 1)} />
                            </>
                        ) : (  

                            <Clickable title='Add to Cart' onPress={() => storeData({id,title, price, image, category, count, description, rating})} />
                        )}
                    </View>
                </View>

            </View>
        </TouchableOpacity>
    )
}