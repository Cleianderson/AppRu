import styled from 'styled-components/native'
import constants from '../../service/constants'

export const Container = styled.View`
  background: #fff;
  padding: 7px 10px;
  margin: 20px;
  border-radius: ${constants.RADIUS};
  max-height: 90%;
`
export const ContainerInput = styled.View`
  flex-direction: row;
  align-items: center;
  border-top-color: ${constants.SECOND_BG_COLOR};
  border-top-width: 1.5;
`

export const Button = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  padding: 5px;
`
