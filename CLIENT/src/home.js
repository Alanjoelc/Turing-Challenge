import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import ToDos from "./components/toDos";
import { API_URL } from "@env";

export default function Home({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [toDos, setToDos] = useState([]);
  const [newToDo, setNewToDo] = useState("");
  const [error, setError] = useState("");
  const [check, setCheck] = useState(false);

  console.log(toDos);

  const toDosUser = async () => {
    let response = await fetch(`${API_URL}/todo/${sessionStorage.user}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    let jsonToDo = await response.json();
    if (jsonToDo.message !== "This user has no tasks yet") {
      setCheck(false);
      setToDos(jsonToDo);
    } else {
      setCheck(true);
    }
  };

  const closeModal = () => {
    setError("");
    setModalVisible(!modalVisible);
  };

  const addTodo = async () => {
    if (newToDo.length) {
      let data = {
        idUser: sessionStorage.user,
        content: newToDo,
      };
      let response = await fetch(`${API_URL}/todo/newtodo`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let json = await response.json();
      if (!json.message) {
        setNewToDo("");
        setError("");
        toDosUser();
      }
    } else {
      setError("Complete the parameters");
    }
  };

  useEffect(() => {
    toDosUser();
  }, []);

  const logOut = () => {
    sessionStorage.removeItem("user");
    navigation.navigate("Login");
  };

  return (
    <View style={styles.backgroud}>
      <View style={styles.Nav}>
        <Pressable
          style={[styles.button, styles.buttonLogout]}
          onPress={() => logOut()}
        >
          <Text style={styles.textStyle}>LOG OUT</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>NEW TASK</Text>
        </Pressable>
      </View>

      <ScrollView>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => closeModal()}
                  >
                    <Text style={styles.textStyle}>CLOSE</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonAdd]}
                    onPress={() => addTodo()}
                  >
                    <Text style={styles.textStyle}>ADD</Text>
                  </Pressable>
                </View>
                <TextInput
                  style={styles.inputModal}
                  value={newToDo}
                  multiline={true}
                  numberOfLines={4}
                  placeholder={"Your new task!"}
                  placeholderTextColor={"#A9A9A9"}
                  onChangeText={(text) => setNewToDo(text)}
                />
                <Text
                  style={{
                    color: "red",
                    fontSize: 15,
                    position: "absolute",
                    bottom: 12,
                  }}
                >
                  {error}
                </Text>
              </View>
            </View>
          </Modal>
          {check ? (
            <Text
              style={{
                marginVertical: 10,
                backgroundColor: "skyblue",
                color: "white",
                padding: 5,
                borderRadius: 10,
                fontWeight: 500,
              }}
            >
              ADD TASKS AND ENOJOY!
            </Text>
          ) : (
            <ToDos props={toDos} refresh={toDosUser}></ToDos>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroud: {
    backgroud: "##FFFFFF",
    flex: 1,
  },
  Nav: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: "30%",
    width: 250,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginBottom: 5,
  },
  buttonOpen: {
    backgroundColor: "#2E9A92",
    width: 100,
    height: 40,
    margin: 10,
  },
  buttonClose: {
    top: 9,
    height: 40,
    flex: 1,
    backgroundColor: "#D42B23",
    width: 100,
    marginHorizontal: 5,
  },
  buttonAdd: {
    flex: 1,
    marginTop: 10,
    backgroundColor: "#1B66CA",
    width: 100,
    marginHorizontal: 5,
  },
  buttonLogout: {
    flex: 1,
    margin: 10,
    backgroundColor: "#D42B23",
    maxWidth: 100,
    height: 40,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  inputModal: {
    height: 200,
    textAlignVertical: "top",
    width: "90%",

    backgroundColor: "#F2F2F2",
    borderColor: "#8DDEFF",
    borderWidth: 2,
    borderRadius: 4,
    marginVertical: 10,
    padding: 5,
  },
});
