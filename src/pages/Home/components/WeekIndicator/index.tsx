import React, { useContext, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import moment from "moment"

import constants from "~/service/constants"
import { Container, Content, Button, BText, TxtDate, WeekText } from "./styles"

import Config from "~/contexts/ConfigContext"
// import { getDate } from "~/service/DateUtils"
import { View } from "react-native"

export default function WeekIndicator(props) {
  const configs = useSelector<RootState, Configurations | undefined>(
    (state) => state.storageState.configurations
  )
  const day = useSelector<RootState, number | undefined>(
    (state) => state.mainState.day
  )
  const isoWeek = useSelector<RootState, number | undefined>(
    (state) => state.storageState.week?.number_week
  )

  const getDate = (day: number) =>
    moment()
      .isoWeek(isoWeek ?? 0)
      .isoWeekday(day + 1)
      .format("DD/MM")

  return (
    <Container>
      <Content>
        {isoWeek !== undefined && constants.STRING_DAYS.map((strDay, index) => (
          <View key={index}>
            <Button
              onPress={() => props.press(index)}
              hitSlop={{ top: 5, bottom: 10, left: 5, right: 5 }}
              >
              {configs?.showWeekDays && (
                <BText selected={day === index}>{strDay}</BText>
                )}
              {configs?.showDate && (
                <TxtDate selected={day === index}>{getDate(index)}</TxtDate>
                )}
            </Button>
            {day === index && (
              <View
                style={{
                  height: 3,
                  backgroundColor: "#f9b233",
                  borderRadius: 50,
                }}
                />
                )}
          </View>
        ))}
      </Content>
      <WeekText>Semana {isoWeek}</WeekText>
    </Container>
  )
}
