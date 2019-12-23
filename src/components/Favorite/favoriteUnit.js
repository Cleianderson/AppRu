import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import constants from '../../service/constants'

export default function FavoriteUnit(props) {
  return (
    <View style={style.view}>
      <Text style={style.text}>{props.text}</Text>
      <TouchableOpacity
        onPress={props.onPress}
        accessibilityLabel='Remover item dos favoritos'
      >
        <Icon name='close-circle-outline' color='#c00' size={30} />
      </TouchableOpacity>
    </View>
  )
}

const style = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: constants.RADIUS_NUM
  },
  text: {
    flex: 1,
    fontSize: 18
  }
})
