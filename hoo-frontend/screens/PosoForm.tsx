import React, { useState, useContext } from "react";
import { Text, View, TextInput, Button, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Slider from "@react-native-community/slider";
import Colors from "../constants/Colors";
import { AuthenticationContext } from "../providers/AuthenticationProvider";
import { useCreateUser } from "../api/User/UserService";

const PosoFormScreen = () => {
  const [name, setName] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [weight, setWeight] = useState<number>(125);
  const [gender, setGender] = useState<"MALE" | "FEMALE" | "IN_BETWEEN">(
    "FEMALE"
  );
  const [activityLevel, setActivityLevel] = useState<"LOW" | "MEDIUM" | "HIGH">(
    "LOW"
  );

  const { setUsername } = useContext(AuthenticationContext);
  const { createUser } = useCreateUser(name, age, gender, weight, region);

  const handleCreate = () => {
    createUser();
  };

  return (
    <ScrollView>
      <View
        style={{
          margin: 18,
          marginTop: 60,
        }}
      >
        <Text
          style={{
            marginBottom: 18,
            color: Colors.darkGrey,
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Ta posologie
        </Text>

        <TextInput
          style={{
            borderColor: Colors.grey,
            borderWidth: 1,
            borderRadius: 4,
            padding: 4,
            marginBottom: 18,
          }}
          placeholder="Username"
          value={name}
          onChangeText={async (nameValue) => setName(nameValue)}
        />

        <TextInput
          style={{
            borderColor: Colors.grey,
            borderWidth: 1,
            borderRadius: 4,
            padding: 4,
            marginBottom: 18,
          }}
          placeholder="Region"
          value={region}
          onChangeText={(regionValue) => setRegion(regionValue)}
        />

        <View style={{ display: "flex" }}>
          <Slider
            step={1}
            minimumValue={0}
            maximumValue={117}
            value={age}
            onValueChange={(ageValue) => setAge(ageValue)}
            minimumTrackTintColor={Colors.lightestPrimary}
            maximumTrackTintColor={Colors.lightPrimary}
            thumbTintColor={Colors.accent}
          />
          <Text>{age} sun revolutions</Text>
        </View>

        <Slider
          step={1}
          minimumValue={75}
          maximumValue={325}
          value={weight}
          onValueChange={(weightValue) => setWeight(weightValue)}
          minimumTrackTintColor={Colors.lightestPrimary}
          maximumTrackTintColor={Colors.lightPrimary}
          thumbTintColor={Colors.accent}
        />
        <Text>{weight} demi-dictionaries</Text>

        <Picker
          selectedValue={gender}
          onValueChange={(genderValue) => setGender(genderValue)}
        >
          <Picker.Item label="Female" value="FEMALE" />
          <Picker.Item label="Male" value="MALE" />
          <Picker.Item label="Other" value="IN_BETWEEN" />
        </Picker>

        <Picker
          selectedValue={activityLevel}
          onValueChange={(activityValue) => setActivityLevel(activityValue)}
        >
          <Picker.Item label="Low" value="LOW" />
          <Picker.Item label="Medium" value="MEDIUM" />
          <Picker.Item label="High" value="HIGH" />
        </Picker>

        <Button
          onPress={() => {
            setUsername(name);
            handleCreate();
          }}
          title="Start Drinking"
          color={Colors.darkGrey}
        />
      </View>
    </ScrollView>
  );
};

export default PosoFormScreen;
