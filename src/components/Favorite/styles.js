import styled from 'styled-components/native'
import constants from '../../service/constants'

export const Container = styled.View`
  background: #fff;
  padding: 10px;
  margin: 20px;
  border-radius: ${constants.RADIUS};
`
export const ContainerInput = styled.View`
  flex-direction: row;
  align-items: center;
  border-top-color: ${constants.SECOND_BG_COLOR};
  border-top-width: 1.5;
`

export const Button = styled.TouchableOpacity`
  border-width: 2;
  border-radius: 100px;
  padding: 5px;
  border-color: ${constants.SECOND_COLOR};
`
