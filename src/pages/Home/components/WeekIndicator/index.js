import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import constants from "../../../../service/constants";
import { getDate } from "../../../../service/DateUtils";
import { Container, Content, Button, BText } from "./styles";

export default function WeekIndicator(props) {
  return (
    <Container>
      <Content>
        {constants.STRING_DAYS.map((day, index) => (
          <Button key={index} onPress={() => props.press(index)}>
            <BText selected={props.day === index} >{day}</BText>
          </Button>
        ))}
      </Content>
    </Container>
  );
}

const style = StyleSheet.create({
  view: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    position: "absolute",
    bottom: 0,
    right: 10,
    left: 10,
  },
  button: {
    elevation: 1,
    backgroundColor: "#eee",
    paddingHorizontal: 15,
    paddingVertical: 2,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#aaa",
  },
  selected: {
    color: constants.SECOND_COLOR,
    textAlign: "center",
    fontWeight: "bold",
  },
  date: {
    opacity: 0,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 3,
  },
  dateSelected: {
    fontWeight: "bold",
    color: constants.SECOND_COLOR,
    textAlign: "center",
    marginTop: 3,
  },
  container: {
    flexDirection: "column",
  },
});
