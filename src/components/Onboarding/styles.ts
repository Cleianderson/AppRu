import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  justify-content: center;
`

export const Content = styled.ScrollView`
  flex: 1;
  margin: 15px;
`

export const Text = styled.Text`
  margin-bottom: 15px;
`

export const List = styled.ScrollView``

export const ListItem = styled.Text`
  text-align: center;
`

export const Button = styled.TouchableOpacity`
  background: ${({ activated, color }) =>
    activated ? color || '#1b2d4f' : '#ccc'};
  padding: 5px 10px;
  justify-content: center;
  width: 120px;
  border-radius: 10px;
`

export const ButtonText = styled.Text`
  text-align: center;
  color: white;
`
