import { cart, home } from "@/assets/images/home";
import Counter from "@/components/provider";
import { Tabs } from "expo-router";
import { SvgXml } from "react-native-svg";
import { useFonts } from "expo-font";
export default function Layout(){
    const [fontLoaded]=useFonts({
        SenRegular: require("@/assets/fonts/Sen-Regular.ttf"),
        SenMedium: require("@/assets/fonts/Sen-Medium.ttf"),
        SenBold: require("@/assets/fonts/Sen-Bold.ttf"),
    })
    if(!fontLoaded) {
        return null;
    }
    return(
        <Counter>
        <Tabs screenOptions={{headerShown:false, tabBarActiveTintColor:'#1E90FF'}}>
            {/* <Tabs.Screen name="index" options={{ headerShown: false }} /> */}
            <Tabs.Screen name="index" options={{title:'Home', 
            tabBarIcon:({color})=> <SvgXml xml={home} fill={color} style={{height:30, width:30}}/>}} />
            <Tabs.Screen name="cart" options={{ title:'Cart', 
            tabBarIcon:({color})=> <SvgXml xml={cart} fill={color} style={{height:30, width:30}}/>}} />
        </Tabs>
        </Counter>
    )
}