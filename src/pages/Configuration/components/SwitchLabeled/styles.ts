import styled from 'styled-components/native'

export const Container = styled.TouchableOpacity<{nested?: boolean}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 40px;
    border: 0px solid #ccc;
    /* border-bottom-width: 1px; */
    padding-left: ${props => props.nested ? '10px' : '0px'};
`

export const Content = styled.View`
    padding: 5px 15px;
    padding-top: 9px;
    flex-direction: row;
`

export const Text = styled.Text<{disabled: boolean | undefined}>`
    display: flex;
    flex: 1;
    font-size: 16px;
    color: ${props => props.disabled ? '#ccc' : '#000'};
`

export const Switch = styled.Switch``
