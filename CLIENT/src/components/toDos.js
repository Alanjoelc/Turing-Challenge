import { View, Text } from "react-native";
import ToDo from "./todo";

export default function ToDos({ props, refresh }) {
  if (props.length) {
    return (
      <View style={{ marginVertical: 5 }}>
        {props.map((element) => (
          <ToDo
            task={element.content}
            key={element.id}
            id={element.id}
            refresh={refresh}
          ></ToDo>
        ))}
      </View>
    );
  } else {
    return <></>;
  }
}
