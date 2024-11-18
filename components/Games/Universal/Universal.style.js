import { StyleSheet } from "react-native";
import { router } from "expo-router";



const styles = StyleSheet.create({
    Container:{
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        height:'100%'
    },
    TimerContainer:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        
    },
    TeamContainer:{
        width: '30%',
        paddingTop:'5%',
        paddingBottom:'5%',
        justifyContent:'center',
        alignItems:'center', 
        display: 'flex'
    },
    CounterContainer:{
        width:'90%',
        flexDirection:'row',
        marginTop:'20%',
        justifyContent:'space-around',
        marginLeft:'auto',
        marginRight:'auto'
    },
    TimerCounterContainer:{
        flexDirection:'row', 
        justifyContent:'space-around',
        width:'90%',
        marginRight:'auto',
        marginLeft:'auto',
        gap:100,
        marginTop:'10%'
    },
    ButtonContainerBlue:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginBottom:'-30%'
    },
    ButtonContainerRed:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginBottom:'-30%'
    },
    ButtonCounterBlue:{
        backgroundColor:'#0D7AC7',
        borderRadius:100,
        justifyContent:"center",
        alignItems:'center',
        width: '25%', 
        height: '48%' 
    },
    ButtonCounterRed:{
        backgroundColor:'#B20A0A',
        borderRadius:100,
        justifyContent:'center',
        alignItems:'center',
        width: '25%', 
        height: '48%' 
    },
   
});

export default styles;