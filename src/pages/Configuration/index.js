import React from 'react'
import {View, Button} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

// import { Container } from './styles';

const Configuration = () => {
  return (
    <View>
      <Button title="clear" onPress={async () => await AsyncStorage.clear()} />
    </View>
  )
}

export default Configuration
