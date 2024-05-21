import Counter from "@/components/provider";
import Cart from "./cart";
import Products from "../products";
import { Stack,Navigator} from "expo-router";
export default function App() {
    return (
    <Counter>
     <Products/>
     </Counter>

    )
}