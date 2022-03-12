import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-bottom: 15px;
`
export const Content = styled.View`
  padding: 15px;
  padding-top: 0px;
`

export const Header = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* background: #1b2d4f; */
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 10px;
`

export const DateText = styled.Text`
  color: #1b2d4f;
  /* margin: 4px; */
`

export const Title = styled.Text`
  flex: 1;
  font-weight: bold;
  margin: 4px;
  color: #1b2d4f;
`

export const Message = styled.Text`
    line-height: 20px;
    text-align: justify;
`
