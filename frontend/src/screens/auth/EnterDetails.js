import React from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";

const EnterDetails = ({
  nickname,
  setNickname,
  dateOfBirth,
  setDateOfBirth,
  country,
  setCountry,
  county,
  setCounty,
  address1,
  setAddress1,
  address2,
  setAddress2,
  address3,
  setAddress3,
  nicknameError,
  countryError,
  validateStep2,
  localStyle,
  theme,
  setStep,
}) => {
  return (
    <>
      <Text
        style={[
          localStyle.title,
          { color: theme === "dark" ? "#FFFFFF" : "#2C664C" },
        ]}
      >
        Enter Your Details
      </Text>
      <View style={localStyle.card}>
        <TextInput
          style={localStyle.input}
          placeholder="Nickname (required)"
          value={nickname}
          onChangeText={setNickname}
          placeholderTextColor={"black"}
        />
        {nicknameError ? (
          <Text style={localStyle.errorText}>{nicknameError}</Text>
        ) : null}
        <TextInput
          style={localStyle.input}
          placeholder="Date of Birth (optional)"
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
          placeholderTextColor={"black"}
        />
        <TextInput
          style={localStyle.input}
          placeholder="Country (required)"
          value={country}
          onChangeText={setCountry}
          placeholderTextColor={"black"}
        />
        {countryError ? (
          <Text style={localStyle.errorText}>{countryError}</Text>
        ) : null}
        <TextInput
          style={localStyle.input}
          placeholder="County/State (optional)"
          value={county}
          onChangeText={setCounty}
          placeholderTextColor={"black"}
        />
        <TextInput
          style={localStyle.input}
          placeholder="Address Line 1 (optional)"
          value={address1}
          onChangeText={setAddress1}
          placeholderTextColor={"black"}
        />
        <TextInput
          style={localStyle.input}
          placeholder="Address Line 2 (optional)"
          value={address2}
          onChangeText={setAddress2}
          placeholderTextColor={"black"}
        />
        <TextInput
          style={localStyle.input}
          placeholder="Address Line 3 (optional)"
          value={address3}
          onChangeText={setAddress3}
          placeholderTextColor={"black"}
        />

        <View style={{display:'flex', flexDirection:'row', marginLeft:'auto'}}>
        <TouchableOpacity style={[localStyle.button, {marginRight:10}]} onPress={() => setStep(1)}>
          <Text style={localStyle.buttonText}>Go Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[localStyle.button, , {marginLeft:'auto'}]}
          onPress={() => validateStep2() && setStep(3)}
        >
          <Text style={localStyle.buttonText}>Continue</Text>
        </TouchableOpacity>

        </View>
      </View>
    </>
  );
};
export default EnterDetails;
