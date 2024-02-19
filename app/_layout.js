import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useCallback } from "react";

SplashScreen.preventAutoHideAsync();

const layout = () =>{
    const [fontsLoaded] = useFonts({
        MontserratRegular: require('../assets/fonts/Montserrat-Regular.ttf')
    })

    const onLayoutRootView = useCallback(async () => {
        if(fontsLoaded){
            await SplashScreen.hideAsync();
        }
    },[fontsLoaded])

    if(!fontsLoaded) return null;

    return <Stack onLayout={onLayoutRootView}/>
}

export default layout;