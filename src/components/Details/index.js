import React from 'react'

import { Info, FoodDescription, FoodType } from './styles'
import { ScrollView } from 'react-native'

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
    <ScrollView>
      <Info>
        <FoodType style={{ borderTopWidth: 0 }}>
          {extensive[props.names[0]]}
        </FoodType>
        <FoodDescription>
          {props.item[props.names[0]].toUpperCase()}
        </FoodDescription>
        <FoodType>{extensive[props.names[1]]}</FoodType>
        <FoodDescription>
          {props.item[props.names[1]].toUpperCase()}
        </FoodDescription>
        <FoodType>{extensive[props.names[2]]}</FoodType>
        <FoodDescription>
          {props.item[props.names[2]].toUpperCase()}
        </FoodDescription>
        <FoodType>{extensive[props.names[3]]}</FoodType>
        <FoodDescription>
          {props.item[props.names[3]].toUpperCase()}
        </FoodDescription>
        <FoodType>{extensive[props.names[4]]}</FoodType>
        <FoodDescription>
          {props.item[props.names[4]].toUpperCase()}
        </FoodDescription>
        <FoodType>{extensive[props.names[5]]}</FoodType>
        <FoodDescription>
          {props.item[props.names[5]].toUpperCase()}
        </FoodDescription>
        <FoodType>{extensive[props.names[6]]}</FoodType>
        <FoodDescription>
          {props.item[props.names[6]].toUpperCase()}
        </FoodDescription>
        <FoodType>{extensive[props.names[7]]}</FoodType>
        <FoodDescription>
          {props.item[props.names[7]].toUpperCase()}
        </FoodDescription>
        <FoodType>{extensive[props.names[8]]}</FoodType>
        <FoodDescription>
          {props.item[props.names[8]].toUpperCase()}
        </FoodDescription>
        <FoodType>{extensive[props.names[9]]}</FoodType>
        <FoodDescription>
          {props.item[props.names[9]].toUpperCase()}
        </FoodDescription>
      </Info>
    </ScrollView>
  )
}
