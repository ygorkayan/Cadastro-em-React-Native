import React from "react";
import { View, FlatList, Alert } from "react-native";
import { ListItem, Button, Icon } from "react-native-elements";
import users from "../data/user";

export default (props) => {
  function confirmUserDeletion(user) {
    Alert.alert("Excluir Usuario", "Deseja excluir o usuario?", [
      {
        text: "Sim",
        onPress() {
          console.warn(`${user.name} Deletado!`);
        },
      },
      { text: "Nao" },
    ]);
  }

  function getActions(user) {
    return (
      <React.Fragment>
        <Button
          onPress={() => props.navigation.navigate("UserForm", user)}
          type="clear"
          icon={<Icon name="edit" size={25} color="orange" />}
        />
        <Button
          onPress={() => confirmUserDeletion(user)}
          type="clear"
          icon={<Icon name="delete" size={25} color="red" />}
        />
      </React.Fragment>
    );
  }

  function getUserItem({ item: user }) {
    return (
      <ListItem
        leftAvatar={{ source: { uri: user.avatarUrl } }}
        key={user.id}
        title={user.name}
        subtitle={user.email}
        bottomDivider
        onPress={() => props.navigation.navigate("UserForm", user)}
        rightElement={getActions(user)}
      />
    );
  }

  return (
    <View>
      <FlatList
        data={users}
        keyExtractor={(user) => user.id.toString()}
        renderItem={getUserItem}
      />
    </View>
  );
};
