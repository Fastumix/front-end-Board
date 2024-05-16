import {View, Image, TouchableOpacity, SafeAreaView } from "react-native";
import header_logo from '../../../assets/images/header_logo.png';
import headname from '../../../assets/images/header_name.png';

const Header = () => {
  return (
    <SafeAreaView style={{width: "100%", alignItems: "center"}}>
        <Image
          style={{width:'100%'}}
          source={header_logo}
        />
        <TouchableOpacity>
          <Image
          style={{bottom: '315%'}}
          source={headname}
          />
          
        </TouchableOpacity>
    </SafeAreaView>
  )
}
 
export default Header