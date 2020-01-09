import React from 'react'

import Menu from './menuUnit'

import {Button, TextButton, ButtonDetails} from './styles'

const menuTypes={
  launch:['ALMOÇO','10:30h - 14:00h'],
  dinner:['JANTAR', '16:30h - 19:00h']
}

export default function ButtonMenu(props) {
  // <Btn type='str' item={obj} isIncluded={true} />
  return (
    <Button
      style={
        props.isIncluded(props.item) ? { borderColor: '#f9b233' } : {}
      }
      onPress={() => props.onPress(<Menu type={props.type} item={props.item} />)}
    >
      <TextButton>{menuTypes[props.type][0]}</TextButton>
      <ButtonDetails>{menuTypes[props.type][1]}</ButtonDetails>
    </Button>
  )
}
