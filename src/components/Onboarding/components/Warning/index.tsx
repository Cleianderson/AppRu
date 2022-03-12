import React from 'react'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import ButtonBar from '~/routes/Home/components/Button/index'

const Warning: React.FC = () => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: 150 }} >
      <Icon name="bell-outline" color="#1b2d4f" size={50} />
      <ButtonBar icon="bell-outline" color="#1b2d4f" size={50} notify/>
    </View>
  )
}

export default {
  backgroundColor: '#fff',
  image: <Warning />,
  title: 'Avisos',
  subtitle:
  'Aqui serão mostrados todos os avisos que a CGARU tem para você. ' +
  'Quando houver um novo aviso o botão ficará com uma bolinha, indicando uma nova notificação'
}
