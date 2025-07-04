import App from "./login";
import Menu from "./menu";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const stack = createNativeStackNavigator();

export default function Pagina() {

  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen name="Login" component={App} options={{headerShown: false}}/>
        <stack.Screen name="Menu" component={Menu} options={{headerShown: false}}/>
      </stack.Navigator>
    </NavigationContainer>
  );
}