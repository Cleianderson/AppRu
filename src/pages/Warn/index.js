import React, {useContext} from 'react'
import {Text, FlatList} from 'react-native'

import WarnUnit from './components/Warn'

import DataContext from '../../contexts/DataContext'

export default function Warn() {
  const {warns} = useContext(DataContext)

  return (
    <FlatList
      data={warns}
      keyExtractor={(item, index) => String(item.title + index)}
      style={{flex: 1}}
      contentContainerStyle={{
        justifyContent: 'center',
        flexDirection: 'column-reverse',
        margin: 10,
        paddingBottom: 20,
        flexGrow: 1,
      }}
      renderItem={({item}) => <WarnUnit title={item.title} content={item.content} />}
      ListEmptyComponent={<Text style={{textAlign: 'center'}}>Não há avisos!</Text>}
    />
  )
}
