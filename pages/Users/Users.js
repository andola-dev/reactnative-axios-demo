import axios from "axios";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Button,
  Platform,
  TextInput,
} from "react-native";
const baseUrl = "https://reqres.in";
export default function Users() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const onChangeNameHandler = (fullName) => {
    setFullName(fullName);
  };
  const onChangeEmailHandler = (email) => {
    setEmail(email);
  };
  const onSubmitFormHandler = async (event) => {
    if (!fullName.trim() || !email.trim()) {
      alert("Name or Email is invalid");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/api/users`, {
        fullName,
        email,
      });
      if (response.status === 201) {
        alert(` You have created: ${JSON.stringify(response.data)}`);
        setIsLoading(false);
        setFullName('');
        setEmail('');
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      alert("An error has occurred");
      setIsLoading(false);
    }
  };
  const onSubmitUpdateFormHandler = (event) => {
    if (!fullName.trim() || !email.trim()) {
      alert("Name or Email is invalid");
      return;
    }
    setIsLoading(true);
    const configurationObject = {
      url: `${baseUrl}/api/users/2`,
      method: "PUT",
      data: { fullName, email },
    };
    axios(configurationObject)
      .then((response) => {
        if (response.status === 200) {
          alert(` You have updated: ${JSON.stringify(response.data)}`);
          setIsLoading(false);
          setFullName("");
          setEmail("");
        } else {
          throw new Error("An error has occurred");
        }
      })
      .catch((error) => {
        alert("An error has occurred");
        setIsLoading(false);
      });
  };
  const onSubmitDeleteFormHandler = async (event) => {
    if (!fullName.trim() || !email.trim()) {
      alert("Name or Email is invalid");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.delete(`${baseUrl}/api/users/2`, {
        fullName,
        email,
      });
      if (response.status === 204) {
        alert(` You have deleted: ${JSON.stringify(response.data)}`);
        setIsLoading(false);
        setFullName('');
        setEmail('');
      } else {
        throw new Error("Failed to delete resource");
      }
    } catch (error) {
      alert("Failed to delete resource");
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <View style={styles.wrapper}>
          {isLoading ? (
            <Text style={styles.formHeading}> Creating resource </Text>
          ) : (
            <Text style={styles.formHeading}>User Detail</Text>
          )}
        </View>
        <View style={styles.wrapper}>
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#ffffff"
            style={styles.input}
            value={fullName}
            editable={!isLoading}
            onChangeText={onChangeNameHandler}
          />
        </View>
        <View style={styles.wrapper}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#ffffff"
            style={styles.input}
            value={email}
            editable={!isLoading}
            onChangeText={onChangeEmailHandler}
          />
        </View>
        <View style={{ flexDirection:"row" }}>
          <View>
            <Button
              title="Submit"
              onPress={onSubmitFormHandler}
              style={styles.submitButton}
              disabled={isLoading}
            />          
        </View>
        &nbsp;&nbsp;&nbsp;
        <View>
          <Button
              title="Update"
              onPress={onSubmitUpdateFormHandler}
              style={styles.updateButton}
              disabled={isLoading}
            />
          </View>
        &nbsp;&nbsp;&nbsp;
        <View>
          <Button
              title="Delete"
              onPress={onSubmitDeleteFormHandler}
              style={styles.updateButton}
              disabled={isLoading}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252526",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Platform.OS === "ios" ? 0 : 0,
  },
  formHeading: {
    color: "#ffffff",
  },
  wrapper: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 2,
    borderColor: "grey",
    minWidth: 200,
    textAlignVertical: "center",
    paddingLeft: 10,
    borderRadius: 20,
    color: "#ffffff",
  },
  submitButton: {
    backgroundColor: "gray",
    padding: 100,
  },
  updateButton: {
    marginLeft: '50px',
    float: 'right'
  }
});
