import React from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";

export default function TelaLogin({navigation}){

    return(
        <View style={styles.container}>
            
            <View style={styles.top}>
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
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 90,
        backgroundColor: "#e0e0e0ff",
    },
    top:{
        backgroundColor: "#009dcdff",
        borderRadius: 15,
        maxWidth: 350,
        padding: 10,
        height: 400,
        display: 'flex',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 10,
    },
    title:{
        fontSize: 26,
        fontWeight: '600',
        color: 'white',
        marginBottom: 6,
    },
    button:{
        backgroundColor: "#0084acff",
        padding: 12,
        borderRadius: 25,
        width: 150,
        margin: 30,
        alignItems: 'center',
        marginTop: 70 
    }
})



