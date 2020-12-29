import React, { useState } from "react";
import { View, Button, TextInput, ScrollView, StyleSheet } from "react-native";
import firebase from "../database/firebase";

const CreateUserScreen = (props) => {
  const initalState = {
    name: "",
    email: "",
    phone: "",
  };

  const [state, setState] = useState(initalState);

  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const saveNewUser = async () => {
    if (state.name === "") {
      alert("please provide a name");
    } else {
      try {
        await firebase.db.collection("users").add({
          name: state.name,
          email: state.email,
          phone: state.phone,
        });

        props.navigation.navigate("UserList");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Name User"
          onChangeText={(value) => handleChangeText(value, "name")}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Email User"
          onChangeText={(value) => handleChangeText(value, "email")}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Phone User User"
          onChangeText={(value) => handleChangeText(value, "phone")}
        />
      </View>
      <View>
        <Button title="Save User" onPress={() => saveNewUser()} />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default CreateUserScreen;
