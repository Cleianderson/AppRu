import styled from 'styled-components/native'
import PageView from '@react-native-community/viewpager'

export const Container = styled.View`
  flex: 1;
  /* justify-content: center;
  align-items: center; */
  background: #fff;
`

export const Content = styled(PageView)`
  flex: 1;
`
export const BottomContainer = styled.View`
  flex-direction: row;
  background: #ccc;
  padding: 20px 7px;
  justify-content: space-between;
  align-items: center;
`

export const NavButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: 2px 7px;
  width: 100px;
  height: 31px;
`

export const Title = styled.Text`
  color: #1b2d4f;
  font-weight: 700;
  font-size: 27px;
  margin: 20px;
`

export const Text = styled.Text``

export const PageContainer = styled.ScrollView`
  /* padding: 20px; */
`

export const DotsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
`

export const AcceptButton = styled.TouchableOpacity`
  background: #1b2d4f;
  border-radius: 5px;
  padding: 10px 15px;
  width: 180px;
  align-items: center;
`