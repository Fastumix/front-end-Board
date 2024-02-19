import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../constants";

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        marginBottom: 0,
        width: "100%",
        height: "100%",
        backgroundColor: 'black'
    },
    
    Login:{
        fontFamily: FONT.regular,
        fontSize: SIZES.large,
        color: 'white',        
    }
});

export default styles;
