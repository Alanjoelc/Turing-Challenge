import { StyleSheet, Text, View } from "react-native";
import Home from "./src/home";
import Register from "./src/register";
import Login from "./src/login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  if (!sessionStorage.user) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={style2} />
          <Stack.Screen name="Register" component={Register} options={style} />
          <Stack.Screen
            options={{
              headerLeft: null,
              title: "To Do",
              headerStyle: {
                backgroundColor: "#76BEDB",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
            name="Home"
            component={Home}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Login" component={Login} options={style2} />
          <Stack.Screen name="Register" component={Register} options={style} />
          <Stack.Screen
            options={{
              headerLeft: null,
              title: "To Do",
              headerStyle: {
                backgroundColor: "#76BEDB",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
            name="Home"
            component={Home}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const style = {
  headerStyle: {
    backgroundColor: "#76BEDB",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};

const style2 = {
  headerStyle: {
    backgroundColor: "#76BEDB",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
  headerLeft: null,
};
