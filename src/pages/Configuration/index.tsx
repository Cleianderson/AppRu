import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useEffect } from "react"
import { Alert, BackHandler, ScrollView } from "react-native"
import { Drawer } from "react-native-paper"
import { useDispatch, useSelector } from "react-redux"
import { Actions } from "~/utils/enums"

import Button from "./components/Button"
import SwitchLabeled from "./components/SwitchLabeled"
import { Container } from "./styles"

const Configuration = () => {
  const configs = useSelector<RootState, Configurations | undefined>(
    ({ storageState }) => storageState.configurations
  )
  const dispatch = useDispatch()

  const handleUpdate = (key: string, value: boolean) => {
    const configurations: Configurations = {}
    configurations[key as keyof Configurations] = value

    dispatch({
      type: Actions.updateConfig,
      // payload: {
      configs: configurations,
      // },
    })
  }

  const handleShowWeekDays = () =>
    handleUpdate("showWeekDays", !configs?.showWeekDays)
  // dispatch<Dispatch>({
  //   type: Actions.updateConfig,
  //   payload: {
  //     configurations: {
  //       showWeekDays: !configs?.showWeekDays,
  //     },
  //   },
  // })

  const handleShowDate = () => handleUpdate("showDate", !configs?.showDate)
  // dispatch<Dispatch>({
  //   type: Actions.updateConfig,
  //   payload: {
  //     configurations: {
  //       showDate: !configs?.showDate,
  //     },
  //   },
  // })

  const handleAcceptNotification = async () => {
    const updateAcceptedNotification = (_value: boolean) =>
      handleUpdate("acceptedNotification", _value)
    // dispatch<Dispatch>({
    //   type: Actions.updateConfig,
    //   payload: { acceptedNotification: _value },
    // })

    if (configs?.acceptedNotification == false) {
      Alert.alert(
        "Aviso",
        "Ao marcar essa opção, você aceita os termos de partilha de dados",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Confirmar",
            style: "default",
            onPress: () => updateAcceptedNotification(true),
          },
        ]
      )
    } else {
      updateAcceptedNotification(false)
    }
  }

  return (
    <Container>
      <ScrollView style={{ flex: 1 }}>
        <Drawer.Section title="Data e indicador de dias">
          <SwitchLabeled
            label="Dias da semana"
            description="Mostra, na parte superior, os dias da semana."
            isActived={configs?.showWeekDays}
            onPress={handleShowWeekDays}
          />
          <SwitchLabeled
            label="Data"
            description="Exibe a data (dia e mês) do cardápio."
            isActived={configs?.showDate}
            onPress={handleShowDate}
          />
        </Drawer.Section>
        <Drawer.Section title="Notificações">
          <SwitchLabeled
            label="Receber notificações"
            isActived={configs?.acceptedNotification}
            onPress={handleAcceptNotification}
          />
        </Drawer.Section>
      </ScrollView>
      <Drawer.Section children={null} />
      <Button
        label="Limpar todos os dados"
        onPress={() => {
          const clear = async () => {
            await AsyncStorage.clear()
            BackHandler.exitApp()
          }
          clear()
        }}
        confirm
        titleAlert="Quer mesmo apagar todos os dados?"
        titleMessage="Os dados de configurações, semanas e favoritos seão excluídos"
      />
    </Container>
  )
}

export default Configuration
