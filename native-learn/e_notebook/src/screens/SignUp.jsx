import {Text,SafeAreaView,View, Image,StyleSheet,TextInput,Pressable} from 'react-native';
import Button from '../components/Button';

const SignUp = () => {
    return (
        <SafeAreaView style={{flex:1}}>
            <Text>SignUp Now</Text>
            <View style={{paddingHorizontal:25,paddingVertical:25}}>
                <TextInput style={singUpStyle.input} placeholder='write your email address'></TextInput>
                <TextInput style={singUpStyle.input} placeholder='write your password' secureTextEntry></TextInput>
                <Button title={"Signup"} customStyles={{alignSelf:"center", marginTop:40}}></Button>
            </View>
            <View style={{flex:1, justifyContent:"flex-end", paddingBottom: 40, alignItems:"center"}}>
                <Pressable>
                    <Text>
                       Already have an account? {" "}
                        <Text style={singUpStyle.askAccount}>Sign in</Text> 
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

export default SignUp;

const singUpStyle = StyleSheet.create({
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