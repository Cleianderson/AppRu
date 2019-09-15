import React from 'react'

import { Info, FoodDescription, FoodType } from './styles'

export default function Details(props) {
  return (
    <Info showsVerticalScrollIndicator={false}>
      <FoodType style={{ borderTopWidth: 0 }}>Guarnição</FoodType>
      <FoodDescription>{props.item.gua.toUpperCase()}</FoodDescription>
      <FoodType>Vegetariano</FoodType>
      <FoodDescription>{props.item.veg.toUpperCase()}</FoodDescription>
      <FoodType>Fast Grill</FoodType>
      <FoodDescription>{props.item.fag.toUpperCase()}</FoodDescription>
      <FoodType>Sopa</FoodType>
      <FoodDescription>{props.item.sopa.toUpperCase()}</FoodDescription>
      <FoodType>Na grelha</FoodType>
      <FoodDescription>{props.item.gre.toUpperCase()}</FoodDescription>
      <FoodType>Principal 1</FoodType>
      <FoodDescription>{props.item.p1.toUpperCase()}</FoodDescription>
      <FoodType>Principal 2</FoodType>
      <FoodDescription>{props.item.p2.toUpperCase()}</FoodDescription>
      <FoodType>Salada Crua</FoodType>
      <FoodDescription>{props.item.sal.toUpperCase()}</FoodDescription>
      <FoodType>Sobremesa</FoodType>
      <FoodDescription>{props.item.sob.toUpperCase()}</FoodDescription>
      <FoodType>Suco</FoodType>
      <FoodDescription>{props.item.suc.toUpperCase()}</FoodDescription>
    </Info>
  )
}
