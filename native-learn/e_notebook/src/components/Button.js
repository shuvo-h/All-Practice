import React from 'react';
import {Text,TouchableOpacity,StyleSheet} from "react-native";

const Button = ({title,onPressfn,customStyles}) => {
    return (
        <TouchableOpacity style={[btnStyle.button,customStyles]} onPress={onPressfn}>
            <Text style={btnStyle.title}>{title}</Text>
        </TouchableOpacity>
    );
};

export default Button;

const btnStyle = StyleSheet.create({
    button: {
        borderRadius: 30,
        width: 165,
        height: 45,
        backgroundColor: "#FFE600",
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 16,
    },
})