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
            <Text style={[
              style.text,
              { color: props.day == index ? constants.SECOND_COLOR : '#aaa' }
            ]} >
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={style.date} >{getDate(props.day)}</Text>
    </View>
  )
}

const style = StyleSheet.create({
  view: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    textAlign: 'center'
  },
  date: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 3,
  },
  container:{
    flexDirection: 'column'
  }
})

