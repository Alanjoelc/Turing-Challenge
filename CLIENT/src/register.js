import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { useState } from "react";
import { API_URL } from "@env";

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const registerUser = async () => {
    let data = {
      email: email,
      password: password,
    };
    if (data.email.length && data.password.length) {
      let response = await fetch(`${API_URL}/newuser`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      let json = await response.json();
      if (json.message === "The email is already registered") {
        setError(json.message);
      } else {
        sessionStorage.setItem("user", json.idNewUser);
        setError("");
        navigation.navigate("Home");
      }
    } else {
      setError("Incomplete parameters *");
    }
  };

  return (
    <View style={[styles.container, { flexDirection: "column", top: 200 }]}>
      <Text style={{ color: "red", fontSize: 15 }}>{error}</Text>
      <Text>E-mail *</Text>
      <TextInput
        maxLength={50}
        style={{
          borderWidth: 1,
          borderColor: "skyblue",
          flex: 1,
          marginBottom: 8,
          maxHeight: 40,
          borderRadius: 6,
          textAlign: "center",
          backgroundColor: "white",
        }}
        onChangeText={(text) => setEmail(text)}
      />

      <Text>Password *</Text>
      <TextInput
        maxLength={50}
        secureTextEntry={true}
        style={{
          borderWidth: 1,
          borderColor: "skyblue",
          flex: 1,
          marginBottom: 8,
          maxHeight: 40,
          borderRadius: 6,
          textAlign: "center",
          backgroundColor: "white",
        }}
        onChangeText={(text) => setPassword(text)}
      />
      <Button
        title="sign up"
        onPress={() => registerUser()}
        color={"#D42B23"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    position: "relative",
    borderColor: "white",
    borderWidth: 1,
    minHeight: 260,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 7,
  },
});
