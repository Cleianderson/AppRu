import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import constants from '../../constants'


export const Container = styled.TouchableOpacity`
  align-items: center;
  align-content: center;
`

export const IconStyled = styled(Icon).
  attrs({ color: constants.TEXT_COLOR, size: 30 })`
`

export const Text = styled.Text`
  color: ${constants.TEXT_COLOR}
`
