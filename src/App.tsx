import React, { useCallback, useEffect, useState } from "react"
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native"
import VersionNumber from "react-native-version-number"
import { useDispatch, useSelector } from "react-redux"

import OnboardingComponent from "~/components/Onboarding"
import Main from "~/pages/Main"
import { Creators } from "~/store/actions"

const App: React.FC = () => {
  // const [onBoarded, setOnBoarded] = useState<boolean | undefined>(undefined)
  const dispatch = useDispatch()
  const onBoarded = useSelector<RootState, boolean | undefined>(
    ({ storageState }) => storageState.configurations?.onBoarded
  )

  useEffect(() => {
    dispatch(Creators.getConfigs())
  }, [])

  const render = useCallback(() => {
    if (onBoarded) {
      return <Main />
    } else if (onBoarded !== undefined) {
      return <OnboardingComponent />
    }

    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            marginBottom: 100,
          }}
        >
          <ActivityIndicator color="#1b2d4f" size="large" />
        </View>
        <Text
          style={{
            width: "100%",
            textAlign: "center",
            marginBottom: 10,
            color: "#666",
          }}
        >
          Versão {VersionNumber.appVersion}
        </Text>
      </View>
    )
  }, [onBoarded])

  return render()
}

export default App
