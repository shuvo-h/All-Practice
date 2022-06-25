import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./src/screens/Home";
import Create from "./src/screens/Create";
import Edit from "./src/screens/Edit";
import Signin from "./src/screens/Signin";
import SignUp from "./src/screens/SignUp.jsx";

const Stack = createNativeStackNavigator();
// change the background color of the default native theam
const AppTheam = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fff",    
  },
}

export default function App() {
  let user = false;
  return (
    <NavigationContainer theme={AppTheam}>
      <Stack.Navigator>
        {
          user ? 
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Create" component={Create} />
              <Stack.Screen name="Edit" component={Edit} />
            </> 
          : <>
              <Stack.Screen name="Signin" component={Signin} options={{headerShown:false}} />
              <Stack.Screen name="SignUp" component={SignUp} />
            </>
        }
        
        
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

