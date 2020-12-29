import React, { useState, useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ListItem, Avatar } from "react-native-elements";

import firebase from "../database/firebase";

const UserList = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    firebase.db.collection("users").onSnapshot((querySnapshot) => {
      const users = []; //In this array is where im going to save the result from the ddbb
      querySnapshot.docs.forEach((doc) => {
        //I loop the query
        const { name, email, phone } = doc.data(); //I the resulst from the query in constants (name = doc.name)
        users.push({
          //I save into my array the results of each cicle of the loop and i also save the propertie id so that way I can manipulate an individual object
          id: doc.id,
          name,
          email,
          phone,
        });
      });
      setUsers(users); //I set my state to the array with all the results
    });
  }, []);

  return (
    <ScrollView>
      <Button
        onPress={() => props.navigation.navigate("CreateUserScreen")}
        title="Create User"
      />

      {users.map((user) => {
        return (
          <ListItem
            key={user.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("UserDetailScreen", {
                userId: user.id,
              });
            }}
          >
            <ListItem.Chevron />
            <Avatar rounded />
            <ListItem.Content>
              <ListItem.Title>{user.name}</ListItem.Title>
              <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default UserList;
