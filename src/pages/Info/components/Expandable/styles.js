import styled from 'styled-components/native'

export const Container = styled.TouchableNativeFeedback``

export const Content = styled.View`
  border: 1px solid #ccc;
  border-radius: 10px;
  margin: 10px;
  padding: 10px 15px;
`

export const Header = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
`

export const Title = styled.Text`
  flex: 1;
  font-size: 16px;
`

export const ExpandButton = styled.TouchableOpacity`
  background: #eee;
  border-radius: 10px;
  padding: 0px 10px;
  elevation: 1;
`
export const ResContainer = styled.View`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 5px 10px;
  margin: 5px;
  margin-top: 10px;
  background: rgba(27, 45, 79, 0.05);
`

export const ResText = styled.Text`
  font-size: 16px;
`
