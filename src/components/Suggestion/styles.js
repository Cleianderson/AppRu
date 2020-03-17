import styled from 'styled-components/native'
import constants from '../../service/constants'

export const Container = styled.View`
  background: #fff;
  padding: 7px 10px;
  margin: 20px;
  border-radius: ${constants.RADIUS};
`
export const ContainerInput = styled.View`
  flex-direction: row;
  align-items: center;
`
export const Button = styled.TouchableOpacity`
  padding: 5px;
`
export const ChooseBox = styled.Picker``
