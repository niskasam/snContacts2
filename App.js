import React, { useState } from "react";
import * as Contacts from "expo-contacts";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { Header, Button, ListItem } from "react-native-elements";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [amount, setAmount] = useState(0);

  const getAllContacts = async () => {
    console.log("Test");
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        setContacts(data);
        setAmount(data.length);
      }
    }
  };
  return (
    <View style={styles.container}>
      <Header
        leftComponent={{ icon: "menu", color: "#fff" }}
        centerComponent={{
          text: "Contacts",
          style: { color: "#fff", fontSize: 18 },
        }}
        rightComponent={{
          icon: "home",
          color: "#fff",
        }}
      />

      <View style={styles.buttonContainer}>
        <Button
          buttonStyle={styles.saveButton}
          raised
          icon={{ name: "search", color: "white" }}
          onPress={getAllContacts}
          title="Get all contacts"
        />
      </View>

      <Text h3>{amount} contacts found</Text>

      <View style={styles.flatListContainer}>
        <FlatList
          keyExtractor={(item) => item.id}
          data={contacts}
          renderItem={({ item }) => (
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle>
                  {item.phoneNumbers
                    ? item.phoneNumbers[0].number
                    : "No phone number available"}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },

  flatListContainer: {
    flex: 1,
    width: "100%",
    margin: 0,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
});
