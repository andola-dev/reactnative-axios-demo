
import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Button,
  Image,
  Platform,
} from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Users from './pages/Users/Users';
const baseUrl = "https://reqres.in";
function User({ userObject }) {
  return (
    <View>
      <Image
        source={{ uri: userObject.avatar }}
        style={{ width: 128, height: 128, borderRadius: 64 }}
      />
      <View style={{ textAlign: "center", color: "white" }}>
        {`${userObject.first_name} ${userObject.last_name}`}
      </View>
      <View style={{ textAlign: "center", color: "white" }}>
        {`${userObject.email}`}
      </View>
    </View>
  );
}
const Stack = createStackNavigator();
export default function App() {
  const [userId, setUserId] = useState(1);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setErrorFlag] = useState(false);
  const changeUserIdHandler = () => {
    setUserId((userId) => (userId === 3 ? 1 : userId + 1));
  };
  // Passing configuration object to axios
axios({
  method: 'get',
  url: `${baseUrl}/api/users/1`,
}).then((response) => {
  console.log("<<<<<< Passing configuration object to axios >>>>>>", response.data.data);
});
// Invoking get method to perform a GET request
axios.get(`${baseUrl}/api/users/1`).then((response) => {
  console.log("<<<<<< Invoking get method to perform a GET request >>>>>>", response.data.data);
});


// Passing configuration object to axios
const fetchUserFirst = async () => {
  const configurationObject = {
    method: 'get',
    url: `${baseUrl}/api/users/1`,
  };
  const response = await axios(configurationObject);
  console.log("<<<<<< Fetch User First >>>>>>", response.data.data);
};

// Invoking get method to perform a GET request
const fetchUserSecond = async () => {
  const url = `${baseUrl}/api/users/2`;
  const response = await axios.get(url);
  console.log("<<<<<< Fetch User Second >>>>>>", response.data.data);
};

// How to make multiple concurrent API requests using Axios
const concurrentRequests = [
  axios.get(`${baseUrl}/api/users/1`),
  axios.get(`${baseUrl}/api/users/2`),
  axios.get(`${baseUrl}/api/users/3`),
];
// Using Promise.all
Promise.all(concurrentRequests)
.then((result) => {
  console.log("ConcurrentRequests Promise.all", result);
})
.catch((err) => {
  console.log(err);
});
// Using Promise.allSettled
Promise.allSettled(concurrentRequests)
  .then((result) => {
    console.log("ConcurrentRequests Promise.allSettled", result);
  })
  .catch((err) => {
    console.log(err);
});
const axiosInstance = axios.create({ baseURL: 'https://reqres.in/' });
axiosInstance.get('api/users/1').then((response) => {
  console.log("axiosInstance", response.data.data);
});

useEffect(() => {
  const source = axios.CancelToken.source();
  const url = `${baseUrl}/api/users/${userId}`;
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(url, { cancelToken: source.token });
      if (response.status === 200) {
        setUser(response.data.data);
        setIsLoading(false);
        return;
      } else {
        throw new Error("Failed to fetch users");
      }
    } catch (error) {
      if(axios.isCancel(error)){
        console.log('Data fetching cancelled');
      }else{
        setErrorFlag(true);
        setIsLoading(false);
      }
    }
  };
  fetchUsers();
  return () => source.cancel("Data fetching cancelled");
}, [userId]);
return (
  <NavigationContainer>
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.wrapperStyle}>
        {!isLoading && !hasError && user && <User userObject={user} />}
      </View>
      <View style={styles.wrapperStyle}>
        {isLoading && <Text> Loading </Text>}
        {!isLoading && hasError && <Text> An error has occurred </Text>}
      </View>
      <View>
        <Button
          title="Load user"
          onPress={changeUserIdHandler}
          disabled={isLoading}
          style={styles.buttonStyles}
        />
        <div class="row">
          <div class="col-md-2">
            <Button onPress={fetchUserFirst} style={styles.buttonStyles} title="Fetch User First" />
          </div>
          <div class="col-md-2">
            <Button onPress={fetchUserSecond} style={styles.buttonStyles}  title="Fetch User Second" />
          </div>   
        </div>            
      </View>    
    </ScrollView>
    <View style={styles.postUser}>
      <Stack.Navigator>
        <Stack.Screen name="Users" component={Users} />
      </Stack.Navigator>
    </View> 
  </NavigationContainer>  
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "dodgerblue",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Platform.OS === "ios" ? 0 : 0,
  },
  wrapperStyle: {
    minHeight: 128,
  },
  postUser: {
    minHeight: 328,
    width: '100%',
    flex:1
  },
  buttonStyles: {
    padding: 100,
    marginTop: 50
  },
});