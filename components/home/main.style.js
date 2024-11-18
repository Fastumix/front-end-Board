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
    },
    iconContainer:{
        position: 'absolute',
        top: '-10%',
        left:'50%',
        right: 0,
        backgroundColor: 'transparent',
        padding: 16,
      }
});

export default styles;