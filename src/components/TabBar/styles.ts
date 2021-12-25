import styled from 'styled-components/native'
import { Animated } from 'react-native'

type CommonProps = {
    focused: boolean
}

export const Container = styled.View`
    background-color: #FFFFFF;
    height: 55px;
    border: 0 solid #ccc;
    border-top-width: 1px;
`
export const Content = styled.View`
    flex-direction: row;
    justify-content: space-around;
    align-items:center;
    height: 100%;
`

export const Button = styled.TouchableOpacity<CommonProps>`
  padding: 2px 15px;
    /* border-radius: 50px; */
    /* width: 60px; */
`

export const Label = styled.Text<CommonProps>`
    color: ${props => props.focused ? '#1b2d4f' : '#aaa'};
`

export const ButtonContent = styled.View`
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
export const Line = styled(Animated.View)`
    height: 3px;
    background: #1b2d4f;
`
