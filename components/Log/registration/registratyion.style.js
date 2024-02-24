import { StyleSheet } from "react-native";
import { router } from "expo-router";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
    Container:{
        maxWidth: 330,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 0
    },
    Login:{  
        fontFamily: FONT.regular,
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
        fontFamily: FONT.regular,
        color: 'black',
        backgroundColor: '#EE6730',
        width: 330,
        marginTop: 80,
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