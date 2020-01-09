import React from 'react'

import { Info, FoodDescription, FoodType } from './styles'
import { ScrollView,View } from 'react-native'
import constants from '../../service/constants'

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

export default function Menu(props) {

  const dynamicArray = props.type === 'launch' ? constants.ARRAY_LAUNCH : constants.ARRAY_DINNER
  
  return (
    <Info>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      >
        {dynamicArray.map((strFood, inx) => (
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
