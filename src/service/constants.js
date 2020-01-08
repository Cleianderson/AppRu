import { Alert } from 'react-native'

export default {
  LARGE: 50,
  MEDIUM: 30,
  NORMAL: 12,

  TEXT_COLOR: '#fff',
  STROKE: '#fff',

  PRIMARY_COLOR: '#1b2d4f',
  SECOND_COLOR: '#f9b233',

  PRIMARY_BG_COLOR: '#fff',
  SECOND_BG_COLOR: '#ddd',
  DATANULL_BG_COLOR: '#a00',

  RADIUS: '7px',
  RADIUS_NUM: 7,

  showAlert: (errDesc, errContent) => {
    Alert.alert(
      errDesc,
      errContent,
      [{ text: 'Certo', style: 'default' }]
    )
  },

  ARRAY_LAUNCH: [
    'p1',
    'p2',
    'gre',
    'fag',
    'veg',
    'gua',
    'sal',
    'sco',
    'sob',
    'suc',
  ],
  ARRAY_DINNER: [
    'p1',
    'p2',
    'gre',
    'fag',
    'veg',
    'gua',
    'sal',
    'sopa',
    'sob',
    'suc',
  ]
}
