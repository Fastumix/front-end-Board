import { StyleSheet } from "react-native";

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
    },

    SetContainer:{
        display: 'flex',
        flexDirection:'column',
        fontSize: 16,
        backgroundColor:'#EE6730',
        marginTop: 50,
        height: 300,
        borderRadius: 25,
        alignItems: 'center'
    },
    Button:{
        width:190,
        height: 40,
        borderColor: '#D21404',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    Minus_Button:{
        width: 120,
        height: 35,
        backgroundColor: '#D21404',
        borderRadius: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 3, 
    },    
    modalContainer:{
        display: 'flex',
        backgroundColor: '#000',
        alignItems:'center',
        justifyContent:'center',
        shadowColor:'#000',
        padding: 35,
        borderRadius: 20,
        marginTop: '50%',
        shadowOffset:{
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderWidth: 4,
        borderColor:'#EE6730'
    },
    modalContent:{

    },
    modalButtons:{
        marginTop: 10,
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    modalButton:{
       borderRadius: 10,
       borderColor: '#EE6730',
       borderWidth: 2,
       padding: 5
    }

});

export default styles;