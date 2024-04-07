import { StyleSheet } from "react-native";
import { router } from "expo-router";



const styles = StyleSheet.create({
    Container:{
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    TimerContainer:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-around'
    },
    TeamContainer:{
        paddingLeft:'10%',
        paddingRight:'10%',
        paddingTop:'5%',
        paddingBottom:'5%',
    },
    CounterContainer:{
        flexDirection:'row',
        marginTop:'20%',
        justifyContent:'space-around'
    },
    TimerCounterContainer:{
        flexDirection:'row', 
        justifyContent:'space-around',
        width:'90%',
        marginRight:'auto',
        marginLeft:'auto',
        gap:150,
        marginTop:'10%'
    },
    ButtonContainerBlue:{
        width:'90%',
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-around',
        marginTop:'10%',
        marginLeft:'auto',
        marginRight:'auto',
        gap:100
    },
    ButtonContainerRed:{
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-between',
        marginTop:'10%'
    },
    ButtonCounterBlue:{
        paddingLeft: '6%',
        paddingRight:'6%',
        paddingBottom: '5%',
        paddingTop:'5%',
        backgroundColor:'#0D7AC7',
        borderRadius:100
    }
   
});

export default styles;