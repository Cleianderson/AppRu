import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import constants from '../../service/constants'

export const Container = styled.TouchableOpacity`
  align-items: center;
  align-content: center;
  
  border: 0px ${({ notify }) => notify ? constants.THIRTY_COLOR : constants.PRIMARY_COLOR} solid;
  border-bottom-width: 2;
`

// props.notify ? constants.THIRTY_COLOR : constants.PRIMARY_COLOR
export const IconStyled = styled(Icon)
  .attrs({ color: constants.TEXT_COLOR, size: 30 })`
`

export const Text = styled.Text`
  color: ${constants.TEXT_COLOR}
`
