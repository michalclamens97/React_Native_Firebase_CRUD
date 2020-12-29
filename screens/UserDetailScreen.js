import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
  Alert,
} from "react-native";
import firebase from "../database/firebase";

const UserList = (props) => {
  const initialState = {
    id: "",
    name: "",
    email: "",
    phone: "",
  };
  const [user, setUser] = useState(initialState);

  const [loading, setLoading] = useState(true);

  const getUserByid = async (id) => {
    const dbRef = firebase.db.collection("users").doc(id);
    const doc = await dbRef.get();
    const user = doc.data(); //data is used to transform the result in a format that we can easily understand
    //console.log(user);
    setUser({
      ...user,
      id: doc.id,
    });
    setLoading(false);
  };

  useEffect(() => {
    getUserByid(props.route.params.userId);
  }, []);

  const handleChangeText = (value, name) => {
    setUser({ ...user, [name]: value });
  };

  const deleteUser = async () => {
    const dbRef = firebase.db
      .collection("users")
      .doc(props.route.params.userId);
    await dbRef.delete();
    props.navigation.navigate("UserList");
  };

  const updateUser = async () => {
    const dbRef = firebase.db.collection("users").doc(user.id);
    await dbRef.set({
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
    setUser(initialState);
    props.navigation.navigate("UserList");
  };

  const openConfirmationAlert = () => {
    Alert.alert("Remove The User", "Are you sure?", [
      { text: "Yes", onPress: () => deleteUser() },
      { text: "No", onPress: () => console.log("false") },
    ]);
  };

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#9e9e9e" />
      </View>
    );
  }

  //console.log(props.route.params.userId);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Name User"
          value={user.name}
          onChangeText={(value) => handleChangeText(value, "name")}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Email User"
          value={user.email}
          onChangeText={(value) => handleChangeText(value, "email")}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Phone User User"
          value={user.phone}
          onChangeText={(value) => handleChangeText(value, "phone")}
        />
      </View>
      <View>
        <Button
          color="#19AC52"
          title="Update User"
          onPress={() => updateUser()}
        />
      </View>
      <View>
        <Button
          color="#E37399"
          title="Delete User"
          onPress={() => openConfirmationAlert()}
        />
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
export default UserList;
