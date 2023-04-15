/* eslint-disable react/display-name */
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useNavigation } from "@react-navigation/native"
import React, { useEffect } from "react"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useDispatch, useSelector } from "react-redux"

import { TouchableOpacity, View } from "react-native"
import Favorites from "~/pages/Favorites"
import Home from "~/pages/Home"
import Suggestion from "~/pages/Suggestion"

import TabBar from "~/components/TabBar"

const TabBottom = createBottomTabNavigator()

const RouteHome = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const thereIsWarn = useSelector<RootState, boolean>((state) => state.mainState.thereIsWarn)

  const setAction = (fn: string | undefined) =>
    dispatch({ type: "SET_ACTION", payload: { action: fn } })

  const reload = () => {
    setAction("requestWeek")
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 5,
            width: 90,
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Avisos")}>
            {thereIsWarn && (
              <View
                style={{
                  position: "absolute",
                  right: 0,
                  top: -1,
                  borderColor: "#fff",
                  borderWidth: 2,
                  borderRadius: 50,
                  backgroundColor: "#ff7700",
                  width: 15,
                  height: 15,
                  zIndex: 1,
                }}
              />
            )}
            {/*<Badge visible={thereIsWarn} style={{position: 'absolute', top: -1}} size={12}/>*/}
            <Icon name="bell-outline" color="#1b2d4f" size={25} />
          </TouchableOpacity>
          <TouchableOpacity onPress={reload}>
            <Icon name="reload" color="#1b2d4f" size={25} />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{
            flexDirection: "row",
            marginLeft: 23,
            justifyContent: "space-around",
          }}
          onPress={() => navigation.navigate("Configurations")}
        >
          <Icon name="settings" size={25} color="#1b2d4f" />
        </TouchableOpacity>
      ),
    })
  }, [thereIsWarn])
  return (
    <TabBottom.Navigator tabBar={(props) => <TabBar {...props} />}>
      <TabBottom.Screen name="Início" component={Home} />
      {/* <TabBottom.Screen name="Avisos" options={{ unmountOnBlur: true }} component={Warn} /> */}
      <TabBottom.Screen name="Favoritos" component={Favorites} />
      <TabBottom.Screen name="Sugerir" component={Suggestion} />
    </TabBottom.Navigator>
  )
}

export default RouteHome
