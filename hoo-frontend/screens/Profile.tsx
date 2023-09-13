import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
  TextInput,
} from "react-native";
import { useUpdateUser, useUser } from "../api/User/UserService";
import { UserClient } from "../api/User/UserClient";
import { AuthenticationContext } from "../providers/AuthenticationProvider";

const ProfileScreen = () => {
  const { username } = useContext(AuthenticationContext);
  const { user, isLoading } = useUser(username);

  const handleLogout = () => {
    // Logic to handle logging out
  };

  const handleEdit = () => {
    updateUser();
  };

  const [state, setUser] = useState({
    name: user?.username,
    age: user?.age,
    gender: user?.gender,
    weight: user?.weight,
    region: user?.region,
    activityLevel: user?.activityLevel,
    score: user?.score,
    goalMlPerDay: user?.goalMlPerDay,
  });

  useEffect(() => {
    setUser({
      name: user?.username,
      age: user?.age,
      gender: user?.gender,
      weight: user?.weight,
      region: user?.region,
      activityLevel: user?.activityLevel,
      score: user?.score,
      goalMlPerDay: user?.goalMlPerDay,
    });
  }, [user]);

  const { updateUser } = useUpdateUser(
    state.name,
    state.age,
    state.gender,
    state.weight,
    state.region
  );

  return (
    <ScrollView style={styles.container}>
      {user && (
        <>
          <Image
            source={require("../assets/owl.png")}
            style={styles.profileImage}
          />
          <Text style={styles.label}>Name: {user.username}</Text>
          <Text style={styles.label}>Age: </Text>
          <TextInput
            style={styles.nameInput}
            value={state.age ? state.age.toString() : ""}
            onChangeText={(text) =>
              setUser((prevState) => ({ ...prevState, age: parseInt(text) }))
            }
            placeholder={user.age.toString()}
            keyboardType="number-pad"
          ></TextInput>
          <Text style={styles.label}>Weight: </Text>
          <TextInput
            style={styles.nameInput}
            value={state.weight ? state.weight.toString() : ""}
            onChangeText={(text) =>
              setUser((prevState) => ({ ...prevState, weight: parseInt(text) }))
            }
            placeholder={user.weight.toString()}
            keyboardType="number-pad"
          ></TextInput>
          <Text style={styles.label}>Activity Level: </Text>
          <Text style={styles.bio}>{user.activityLevel}</Text>
          <Text style={styles.label}>Gender: </Text>
          <TextInput
            style={styles.nameInput}
            value={state.gender}
            onChangeText={(text) =>
              setUser((prevState) => ({ ...prevState, gender: text }))
            }
            placeholder={user.gender}
          ></TextInput>
          <Text style={styles.label}>Region: </Text>
          <TextInput
            style={styles.nameInput}
            value={state.region}
            onChangeText={(text) =>
              setUser((prevState) => ({ ...prevState, region: text }))
            }
            placeholder={user.region}
          ></TextInput>
          <Text style={styles.label}>Score: </Text>
          <Text style={styles.bio}>{user.score}</Text>
          <Text style={styles.label}>Goal ML Per Day: </Text>
          <Text style={styles.bio}>{user.goalMlPerDay}</Text>

          <View style={styles.buttonContainer}>
            <View style={styles.editButton}>
              <Button title="Edit" onPress={handleEdit} />
            </View>
            <Button title="Log Out" onPress={() => {}} />
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderWidth: 3,
    borderColor: "#E0E0E0",
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  label: {
    fontWeight: "bold",
    marginRight: 10,
    marginTop: 10,
  },
  value: {
    fontSize: 16,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  bio: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  location: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  interests: {
    flexDirection: "row",
    marginBottom: 20,
  },
  interest: {
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
    backgroundColor: "#E0E0E0",
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 30,
    marginBottom: 20,
  },

  editButton: {
    marginBottom: 20,
  },
  nameInput: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 4,
    padding: 5,
  },

  bioInput: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 4,
    padding: 5,
    textAlignVertical: "center",
    textAlignHorizontal: "center",
    height: 50,
  },
});

export default ProfileScreen;
