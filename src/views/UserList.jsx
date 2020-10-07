import React, { useContext } from "react";
import { View, FlatList, Alert } from "react-native";
import { ListItem, Button, Icon } from "react-native-elements";
import { UsersContext } from "../context/UserContext";

export default (props) => {
  const { state, dispatch } = useContext(UsersContext);

  function confirmUserDeletion(user) {
    Alert.alert("Excluir Usuario", "Deseja excluir o usuario?", [
      {
        text: "Sim",
        onPress() {
          dispatch({
            type: "deleteUser",
            payload: user,
          });
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
        data={state}
        keyExtractor={(user) => user.id.toString()}
        renderItem={getUserItem}
      />
    </View>
  );
};
