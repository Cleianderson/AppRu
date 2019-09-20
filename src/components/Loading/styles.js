import styled from 'styled-components/native'
import { Animated } from 'react-native'

export const Modal = styled.Modal`
  
`
export const Content = styled(Animated.View)`
  background-color: #fff;
  flex: 1;
  align-items: center;
  margin: 170px 40px;
  padding:7px;
  border-radius: 7px;
`

export const Message = styled(Animated.Text)`
  font-size:20px;
`
