import styled from 'styled-components/native'
import constants from '../../constants'

export const Container = styled.View`
  background: #fff;
  padding: 10px;
  margin: 20px;
  border-radius: ${constants.RADIUS};
`
export const ContainerInput = styled.View`
  flex-direction: row;
  align-items: center;
`
export const Button = styled.TouchableOpacity`
  border-width: 2;
  border-radius: 100px;
  padding: 5px;
  border-color: ${constants.SECOND_COLOR};
`
