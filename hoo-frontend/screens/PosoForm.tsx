import React, { useState } from "react";
import { Text, View, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Slider from "@react-native-community/slider";

const PosoFormScreen = () => {
  const [name, setName] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [weight, setWeight] = useState<number>(125);
  const [gender, setGender] = useState<"male" | "female" | "other">("female");
  const [activityLevel, setActivityLevel] = useState<"LOW" | "MEDIUM" | "HIGH">(
    "LOW"
  );

  const onSubmit = () => {
    
  }

  return (
    <View>
      <View>
        <TextInput
          placeholder="Jacquees"
          value={name}
          onChangeText={(nameValue) => setName(nameValue)}
        />

        <Slider
          step={1}
          minimumValue={0}
          maximumValue={117}
          value={age}
          onValueChange={(ageValue) => setAge(ageValue)}
          minimumTrackTintColor="#1fb28a"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#b9e4c9"
        />
        <Text>{age} sun revolutions</Text>

        <Slider
          step={1}
          minimumValue={75}
          maximumValue={325}
          value={weight}
          onValueChange={(weightValue) => setWeight(weightValue)}
          minimumTrackTintColor="#1fb28a"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#b9e4c9"
        />
        <Text>{weight} pounds</Text>

        <Picker
          selectedValue={gender}
          onValueChange={(genderValue) => setGender(genderValue)}
        >
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="other" value="other" />
        </Picker>

        <Picker
          selectedValue={activityLevel}
          onValueChange={(activityValue) => setActivityLevel(activityValue)}
        >
          <Picker.Item label="Low" value="LOW" />
          <Picker.Item label="Medium" value="MEDIUM" />
          <Picker.Item label="High" value="HIGH" />
        </Picker>

        <TextInput
          placeholder="Wentworth-North"
          value={region}
          onChangeText={(regionValue) => setRegion(regionValue)}
        />


        <Text>{name} - {age} - {weight} - {gender} - {activityLevel} - {region}</Text>
      </View>
    </View>
  );
};

export default PosoFormScreen;
