import React from 'react'
import { View, ScrollView, Text } from 'react-native'

import WarnUnit from './warnUnit'

export default function Warn(props) {
  return (
    <View style={{
      backgroundColor: '#fff',
      padding: 10,
      margin: 20,
      borderRadius: 7,
    }}>
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          flexDirection: 'column-reverse'
        }}
        showsVerticalScrollIndicator={false}
      >
        {props.warns.length !== 0 ? props.warns.map((warn, inx) => (
          <WarnUnit key={inx} title={warn.title} content={warn.content} />
        ))
          : <Text style={{ color: '#000', textAlign:'center' }}
          >
            Nenhum aviso!
          </Text>}
      </ScrollView>
    </View>
  )
}
