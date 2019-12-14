import React from 'react'

import { Info, FoodDescription, FoodType } from './styles'
import { ScrollView,View } from 'react-native'

const extensive = {
  p1: 'Principal 1',
  p2: 'Principal 2',
  gre: 'Grelha',
  gua: 'Guarnição',
  fag: 'Fast Grill',
  veg: 'Vegetariano',
  sal: 'Salada Crua',
  sco: 'Salada Cozida',
  sopa: 'Sopa',
  sob: 'Sobremesa',
  suc: 'Suco',
}

export default function Details(props) {
  return (
    <Info>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      >
        {props.names.map((strFood, inx) => (
          <View key={inx}>
            <FoodType>
              {extensive[strFood]}
            </FoodType>
            <FoodDescription>
              {props.item[strFood].toUpperCase()}
            </FoodDescription>
          </View>
        ))}
      </ScrollView>
    </Info>
  )
}
