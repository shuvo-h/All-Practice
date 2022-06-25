import { NavigationContainer } from '@react-navigation/native';
import {Text,SafeAreaView,View, Image,StyleSheet,TextInput,Pressable} from 'react-native';
import Button from '../components/Button';

const Signin = ({navigation}) => {
    return (
        <SafeAreaView style={{flex:1}}>
            <Text>Signin papa </Text>
            <Image style={{alignSelf:"center"}} source={require( "../../assets/ampty-state-banner.png")}></Image>
            <Text style={{fontSize:18,fontWeight:"bold",textAlign:"center"}}>Never forget your notes</Text>
            <View style={{paddingHorizontal:25,paddingVertical:25}}>
                <TextInput style={singinStyle.input} placeholder='write your email address'></TextInput>
                <TextInput style={singinStyle.input} placeholder='write your password' secureTextEntry></TextInput>
                <Button title={"Login"} customStyles={{alignSelf:"center", marginTop:40}}></Button>
            </View>
            <View style={{flex:1, justifyContent:"flex-end", paddingBottom: 40, alignItems:"center"}}>
                <Pressable onPress={()=>navigation.navigate("SignUp")}>
                    <Text>
                        Don't have an account? {" "}
                        <Text style={singinStyle.askAccount}>Sign up</Text> 
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

export default Signin;

const singinStyle = StyleSheet.create({
    input: {
        height: 48,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc"
    },
    askAccount:{
        color:"green",
        fontWeight:"bold",
        marginLeft:10
    },
})