import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

// import { Container } from './styles';

export default function Warn({ title, content }) {
  return (
    <View style={style.view}>
      <Text style={style.title}>{title}</Text>
      <Text style={style.content}>{content}</Text>
    </View>
  )
}

const style = StyleSheet.create({
  title: {
    color: '#000',
    fontSize: 16,
    borderBottomColor: '#f9b233',
    borderBottomWidth: 2,
    width: '100%',
    textAlign: 'center',
  },
  content: { color: '#444', fontSize: 16,textAlign:'center' },
  view: {
    alignItems: 'center',
    borderColor: '#666',
    borderWidth: 1,
    borderRadius: 7,
    padding: 10,
    marginTop: 5
  },
})
