import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import constants from '../../service/constants'
import { getDate } from '../../service/DateUtils'

export default function WeekIndicator(props) {

  return (
    <View style={style.container}>
      <View style={style.view}>
        {constants.STRING_DAYS.map((day, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => props.press(index)}
          >
            <Text style={props.day == index ? style.selected : style.text} >{day}</Text>
            <Text style={
              props.day === index
                ? style.dateSelected
                : style.date
            }
            >
              {getDate(props.day)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  view: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    textAlign: 'center',
    color: '#aaa'
  },
  selected: {
    color: constants.SECOND_COLOR,
    textAlign: 'center'
  },
  date: {
    opacity: 0
  },
  dateSelected: {
    color: constants.SECOND_COLOR,
    textAlign: 'center',
    marginTop: 3,
  },
  container: {
    flexDirection: 'column'
  }
})

