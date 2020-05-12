import styled from "styled-components/native";

export const Container = styled.View``;

export const Content = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 20px;
  position: absolute;
  bottom: 0;
  right: 10px;
  left: 10px;
`;

export const Button = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background: #eee;
  padding: 2px 15px;
  border-radius: 10px;
  elevation: 1;
`;

export const BText = styled.Text`
  text-align: center;
  font-weight: bold;
  color: ${({ selected }) => (selected ? "#f9b233" : "#999")};
`;
