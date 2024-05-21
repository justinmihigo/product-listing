import {Text,View, TouchableOpacity} from "react-native";
interface Click{
    title:string,
    onPress:() => void,
    color?:string,
}
export default function Clickable({title,color, onPress}:Click) {
    return(
    <TouchableOpacity
    className="bg-orange-300 p-2 rounded-xl ml-2"
    onPress={onPress}
  >
    <Text className="font-[SenMedium]">{title}</Text>
  </TouchableOpacity>
    )
}