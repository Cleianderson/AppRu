import styled from 'styled-components/native'

type ContainerProps = {
    focused: boolean
}

export const Container = styled.View<ContainerProps>`
    color: ${props => props.focused ? '#1b2d4f' : '#aaa'};
    border-top-color: ${props => props.focused ? '#1b2d4f' : '#fff'}; 
    border-top-width: 2px;
`
