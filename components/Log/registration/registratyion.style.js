import { StyleSheet } from "react-native";
import { router } from "expo-router";

import { COLORS, FONT, SIZES } from "../../../constants";

const fonts = () =>{

    const [fontsLoaded] = useFonts({
        "Montserrat" : require("../../../assets/fonts/Montserrat-Regular.ttf"),

    });
    if(!fontsLoaded){
    return undefined;
    }
}

const styles = StyleSheet.create({
    Container:{
        fontFamily: 'Montserrat',
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 0
    },
    Login:{  

        fontSize: SIZES.medium,
        color: '#fff',
        borderStyle: 'solid',
        borderColor: '#D9D9D9',
        borderBottomWidth: 1,
        justifyContent: 'center',
        opacity: 0.6,
        marginTop: 40,
        paddingBottom:8,
      
    },
    Button:{
        fontSize: SIZES.medium,
        fontFamily: 'Montserrat',
        color: 'black',
        backgroundColor: '#EE6730',
        width: '100%',
        marginTop: '40%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },

    RegisterContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 40,
        color: '#D9D9D9',
    }
});

export default styles;