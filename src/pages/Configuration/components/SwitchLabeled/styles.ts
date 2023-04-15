import styled from "styled-components/native"

export const Container = styled.TouchableOpacity<{ nested?: boolean }>`
  /* display: flex; */
  flex-direction: row;
  align-items: center;
  /* justify-content: center; */
  /* height: 40px; */
  /* border: 0px solid #ccc; */
  margin-left: 1px;
  margin-bottom: 20px;
`

export const Content = styled.View`
  flex: 1;
  flex-direction: column;
  padding: 5px 15px;
  padding-top: 9px;
`

export const WrapSwitch = styled.View`
  flex-direction: column;
  justify-content: flex-end;
`

export const Text = styled.Text`
  font-size: 18px;
`

export const Description = styled.Text`
  color: #666;
`

export const Switch = styled.Switch`
  /* margin-top: 10px; */
`
