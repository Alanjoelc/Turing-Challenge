import { StyleSheet, Text, View, TextInput, Button, se } from "react-native";
import { useState } from "react";
import { API_URL } from "@env";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validate = async () => {
    let data = {
      email: email,
      password: password,
    };
    if (data.email.length && data.password.length) {
      let response = await fetch(`${API_URL}/validate`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let json = await response.json();
      if (json === "Unregistered email" || json === "Password is incorrect") {
        setError(json);
      } else {
        setError("");
        setEmail("");
        setPassword("");
        sessionStorage.setItem("user", json);
        navigation.navigate("Home");
      }
    } else {
      setError("Incomplete parameters*");
    }
  };

  const goTo = () => {
    setError("");
    setEmail("");
    setPassword("");
    navigation.navigate("Register");
  };

  return (
    <View style={[styles.container, { flexDirection: "column", top: 200 }]}>
      <Text style={{ color: "red", fontSize: 15 }}>{error}</Text>
      <Text>E-mail *</Text>
      <TextInput
        value={email}
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
        value={password}
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
      <View style={{ marginBottom: 5 }}>
        <Button title="sign in" onPress={() => validate()} color={"#1B66CA"} />
      </View>
      <Button title="sign up" onPress={() => goTo()} color={"#D42B23"} />
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
