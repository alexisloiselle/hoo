import React, { useState, useContext } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  Pressable,
} from "react-native";
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
    <ScrollView style={{ backgroundColor: Colors.ocean }}>
      <View
        style={{
          margin: 18,
          marginTop: 60,
        }}
      >
        <Text
          style={{
            marginBottom: 18,
            color: Colors.white,
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Ta posologie
        </Text>
        <TextInput
          style={{
            borderColor: Colors.deepOcean,
            borderWidth: 1,
            borderRadius: 4,
            padding: 4,
            marginBottom: 18,
            backgroundColor: Colors.lac,
          }}
          placeholder="Username"
          value={name}
          onChangeText={async (nameValue) => setName(nameValue)}
        />
        <TextInput
          style={{
            borderColor: Colors.deepOcean,
            borderWidth: 1,
            borderRadius: 4,
            padding: 4,
            marginBottom: 18,
            backgroundColor: Colors.lac,
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
            minimumTrackTintColor={Colors.lac}
            maximumTrackTintColor={Colors.ruisseau}
            thumbTintColor={Colors.hibou}
          />
          <Text style={{ color: Colors.white, fontWeight: "500" }}>
            {age} sun revolutions (yrs)
          </Text>
        </View>
        <Slider
          step={1}
          minimumValue={75}
          maximumValue={325}
          value={weight}
          onValueChange={(weightValue) => setWeight(weightValue)}
          minimumTrackTintColor={Colors.lac}
          maximumTrackTintColor={Colors.ruisseau}
          thumbTintColor={Colors.hibou}
        />
        <Text style={{ color: Colors.white, fontWeight: "500" }}>
          {weight} half-dictionaries (lbs)
        </Text>
        <Text style={{ color: Colors.white, fontWeight: "500", marginTop: 16 }}>
          Gender
        </Text>
        <Picker
          style={{
            backgroundColor: Colors.lac,
            borderRadius: 16,
            marginTop: 16,
          }}
          selectedValue={gender}
          onValueChange={(genderValue) => setGender(genderValue)}
        >
          <Picker.Item label="Female" value="FEMALE" />
          <Picker.Item label="Male" value="MALE" />
          <Picker.Item label="Other" value="IN_BETWEEN" />
        </Picker>
        <Text style={{ color: Colors.white, fontWeight: "500", marginTop: 16 }}>
          Level of activity
        </Text>
        <Picker
          style={{
            backgroundColor: Colors.lac,
            borderRadius: 16,
            marginTop: 16,
          }}
          selectedValue={activityLevel}
          onValueChange={(activityValue) => setActivityLevel(activityValue)}
        >
          <Picker.Item label="Low" value="LOW" />
          <Picker.Item label="Medium" value="MEDIUM" />
          <Picker.Item label="High" value="HIGH" />
        </Picker>
        <Pressable
          style={{
            backgroundColor: Colors.lac,
            borderRadius: 16,
            marginTop: 16,
            padding: 16,
          }}
          onPress={() => {
            setUsername(name);
            handleCreate();
          }}
        >
          <Text
            style={{
              color: Colors.ocean,
              fontSize: 24,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Start Drinking
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default PosoFormScreen;
