import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../constants";
import { useFonts } from "expo-font";

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
        fontFamily:'Montserrat',
        alignItems:'center',
        justifyContent: 'center',
        marginTop: 0,
        color: '#D9D9D9',
    }
});

export default styles;