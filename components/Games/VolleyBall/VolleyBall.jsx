import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'


const VolleyBall = () => {
  
    return (
      <View>
        <View style={{backgroundColor:'#EE6730', height: 370, borderRadius:15 }}>


            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{ marginTop: 25}}>
                    Команда 1
                </Text>

                <View style={{display:'flex', alignItems:'center'}}>
                    <Text style={{color:'white',  marginTop: 25}}>
                        Таймер
                    </Text>
                    <Text>
                        00 : 00
                    </Text>
                </View>

                <Text style={{ marginTop: 25}}>
                    Команда 2
                </Text>
            </View>


        </View>


      </View>
    )
}

export default VolleyBall