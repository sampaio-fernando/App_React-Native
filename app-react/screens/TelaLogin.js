import React from "react";
import {View, Text, TouchableOpacity, StyleSheet, Image} from "react-native";

export default function TelaLogin({navigation}){

    return(
        <View style={styles.container}>

            <Text style={styles.title}>Bem-vindo ao App de estudos</Text>
            <Text style={{margin: 3, fontSize: 16, color: "white"}}>
                Crie seus módulos e cartões de estudo...
            </Text>

            <TouchableOpacity style={styles.button}
                onPress={() => navigation.navigate('telaInicial')}>
                <Text style={{fontSize: 18, fontWeight: '600', color: "white"}}>
                    Começar
                </Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 90,
        backgroundColor: "#282828ff",
    },
    title:{
        fontSize: 26,
        fontWeight: '600',
        color: 'white',
        marginBottom: 6,
    },
    button:{
        backgroundColor: "#0623ffff",
        padding: 15,
        borderRadius: 8,
        width: 150,
        margin: 30,
        alignItems: 'center'
    }
})



