import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
`

export const Content = styled.View`
  flex: 1;
`

export const Inputs = styled.View`
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  /* background: rgba(27, 45, 79, .05); */
`

export const TextInput = styled.TextInput`
  flex: 1;
  margin-left: 5px;
`

export const Button = styled.TouchableOpacity`
  /* background: #1b2d4f; */
  justify-content: center;
  align-items: center;
  margin: 5px;
  width: 40px;
  height: 40px;
  border-radius: 50px;
`

export const FavContainer = styled.View`
  flex-direction: row;
  margin: 10px;
  border: 1px solid #ccc;
  padding: 10px 20px;
  padding-right: 10px;
  border-radius: 10px;
  align-items: center;
`
export const FavText = styled.Text`
  flex: 1;
`
export const FavButton = styled.TouchableOpacity`
  border-radius: 10px;
  border: 1px solid #b61823;
  padding: 3px;
`

export const EmptyContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`

export const EmptyText = styled.Text`
  color: #666;
`
