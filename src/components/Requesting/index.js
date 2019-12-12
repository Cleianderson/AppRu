import React from 'react'
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native'

// import { Container } from './styles';

export default function Requesting() {
  return (
    <View
      style={style.container}
    >
      <ActivityIndicator color='#f9b233' size={72} />
      <Text style={style.text}>Fazendo requisição ao servidor</Text>
    </View>

  )
}

const style = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems:'center',
    padding: 10,
    margin: 20,
    borderRadius: 7,
  },
  text: { color: '#000', fontSize: 16 }
})