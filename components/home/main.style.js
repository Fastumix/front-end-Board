import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants";
import { useFonts } from "expo-font";

const fonts = () =>{

    const [fontsLoaded] = useFonts({
        "Montserrat" : require("../../assets/fonts/Montserrat-Regular.ttf"),

    });
    if(!fontsLoaded){
    return undefined;
    }
}
const styles = StyleSheet.create({
    
    Button1:{
        fontSize: SIZES.medium,
        fontFamily: 'Montserrat',
        color: 'black',
        backgroundColor: '#50A4A9',
        width: '95%',
        marginTop: '12.5%',
        height: 50,
        alignItems: 'center',

        borderRadius: 100,
        flexDirection:'row',
        
    },
    Button2:{
        backgroundColor: '#EE6730',
        fontSize: SIZES.medium,
        fontFamily: 'Montserrat',
        width: '95%',
        marginTop: '12.5%',
        height: 50,
        alignItems: 'center',
        borderRadius: 100,
        flexDirection:'row',
        gap:85
    },
    Button3:{
        fontSize: SIZES.medium,
        fontFamily: 'Montserrat',
        color: 'black',
        backgroundColor: '#7C7C7C',
        width: '95%',
        marginTop: '12.5%',
        height: 50,
        alignItems: 'center',
        borderRadius: 100,
        flexDirection:'row',
        gap:95
    },
    Button4:{
        fontSize: SIZES.medium,
        fontFamily: 'Montserrat',
        color: 'black',
        backgroundColor: '#5DAD41',
        width: '95%',
        marginTop: '12.5%',
        height: 50,
        alignItems: 'center',
        borderRadius: 100,
        flexDirection:'row',
        gap:100
    },
    ExitButton: {
        borderColor: '#D21404',
        borderStyle: 'solid',
        borderWidth: 2,  // товщина бордера
        width: '95%',
        marginTop: '25%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        fontFamily: 'Montserrat',
      },

      Image:{
        marginLeft: 15,

      },
   

    Container:{
        width:'90%',
        alignItems:'center',
        justifyContent: 'center',
        marginTop: 0,
        color: '#D9D9D9',
        marginLeft:'auto',
        marginRight:'auto'
    }
});

export default styles;