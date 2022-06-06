import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import customdesign from "./styles/myCustomStyles";

export default function App() {
  return (
    <View style={myStyles.styleName}>
      <Text style={myStyles.textStyle}>Bangladesh</Text>
      <Text style={customdesign.customStyle1}>is a over populated country</Text>
    </View>
  );
}

const myStyles = StyleSheet.create({
  styleName: {
    backgroundColor:"skyblue",
    height: 400,
    marginTop: 50,
    fontSize: 60
  },
  textStyle:{
    fontSize: 60,
    
  }
})