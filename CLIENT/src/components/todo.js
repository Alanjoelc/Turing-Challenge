import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { API_URL } from "@env";

export default function ToDo({ task, id, refresh }) {
  const deleteToDo = async () => {
    let data = {
      idTodo: id,
    };
    let response = await fetch(`${API_URL}/todo/deletetodo`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let json = await response.json();
    if (json.message === "Todo deleted") {
      await refresh();
    }
  };

  return (
    <View style={style.todo}>
      <TouchableOpacity style={style.check} onPress={() => deleteToDo()} />
      <Text style={style.text}>{task}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  todo: {
    borderColor: "#8DDEFF",
    backgroundColor: "#EBF3FB",
    borderWidth: 2,
    flexDirection: "row",
    padding: 8,
    alignItems: "center",
    width: 300,
    marginTop: 15,
    borderRadius: 3,
  },
  text: {
    fontWeight: "500",
  },
  check: {
    width: 12,
    height: 12,
    backgroundColor: "#CC081E",
    borderColor: "#8DDEFF",
    borderWidth: 1,
    marginRight: 5,
    borderRadius: 10,
  },
});
