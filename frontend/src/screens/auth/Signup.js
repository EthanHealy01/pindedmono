import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { createUser } from "../../api/users";
import { useNavigation } from "@react-navigation/native";
import HeaderImageLight from "../../svg-assets/signup-header-in-light.svg";
import HeaderImageDark from "../../svg-assets/signup-header-in-dark.svg";
import { useTheme } from "../../styles/ThemeContext";
import SelectInterests from "./SelectInterests";
import EnterDetails from "./EnterDetails";

const Signup = () => {
  const navigation = useNavigation();
  const { styles, theme } = useTheme();
  const [step, setStep] = useState(1);

  // Step 1 states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Step 2 states
  const [nickname, setNickname] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [country, setCountry] = useState("");
  const [county, setCounty] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [address3, setAddress3] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [countryError, setCountryError] = useState("");

  // Step 3 states
  const [selectedInterests, setSelectedInterests] = useState([]);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    const userData = {
      email,
      password,
      nickname,
      dateOfBirth,
      addLine1: address1,
      addLine2: address2,
      addLine3: address3,
      townCity: county,
      country,
      joinDate: new Date().toISOString(),
      emailVerified: false,
      interests: selectedInterests,
    };

    try {
      console.log("Creating user with data:", userData);
      const response = await createUser(userData);
      console.log("User created:", response);
      Alert.alert("Signup Successful", "You can now log in");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Signup failed:", error);
      Alert.alert("Signup Error", "Unable to create account");
    }
  };

  const validateStep2 = () => {
    let valid = true;
    if (!nickname) {
      setNicknameError("Nickname is required");
      valid = false;
    } else {
      setNicknameError("");
    }
    if (!country) {
      setCountryError("Country is required");
      valid = false;
    } else {
      setCountryError("");
    }
    return valid;
  };

  const toggleInterest = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const continueToNextStep = () => {
    if (step === 1) {
      if (email && password && confirmPassword) {
        setStep(2);
      } else {
        Alert.alert("Error", "Please fill in all fields");
      }
    }
  };

  return (
    <SafeAreaView style={[styles.container, localStyle.container]}>
      {step === 1 && (
        <>
          <Text
            style={[
              localStyle.title,
              { color: theme === "dark" ? "#FFFFFF" : "#2C664C" },
            ]}
          >
            Create an Account
          </Text>
          {theme === "light" ? (
            <HeaderImageLight style={styles.headerImage} />
          ) : (
            <HeaderImageDark style={styles.headerImage} />
          )}
          <View style={localStyle.card}>
            <Text style={[localStyle.title, { color: "white" }]}>Sign Up!</Text>
            <TextInput
              style={localStyle.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor={"black"}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={localStyle.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              placeholderTextColor={"black"}
              secureTextEntry
            />
            <TextInput
              style={localStyle.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholderTextColor={"black"}
              secureTextEntry
            />
            <TouchableOpacity
              style={localStyle.button}
              onPress={() => continueToNextStep()}
            >
              <Text style={localStyle.buttonText}>Continue</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 30,
              }}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={{ fontSize: 14, color: "#FFFFFF" }}>
                Alreadt have an account?
              </Text>
              <Text style={{ color: "#9FFFA6", marginLeft: 5, fontSize: 14 }}>
                Sign In!
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      {step === 2 && (
        <EnterDetails
          nickname={nickname}
          setNickname={setNickname}
          dateOfBirth={dateOfBirth}
          setDateOfBirth={setDateOfBirth}
          country={country}
          setCountry={setCountry}
          county={county}
          setCounty={setCounty}
          address1={address1}
          setAddress1={setAddress1}
          address2={address2}
          setAddress2={setAddress2}
          address3={address3}
          setAddress3={setAddress3}
          nicknameError={nicknameError}
          countryError={countryError}
          validateStep2={validateStep2}
          handleSignup={handleSignup}
          localStyle={localStyle}
          theme={theme}
          styles={styles}
          setStep={setStep}
        />
      )}
      {step === 3 && (
        <SelectInterests
          selectedInterests={selectedInterests}
          toggleInterest={toggleInterest}
          handleSignup={handleSignup}
          localStyle={localStyle}
          styles={styles}
          goBack={() => setStep(2)}
        />
      )}
    </SafeAreaView>
  );
};

export default Signup;

const localStyle = StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#2C664C",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
    minHeight: Dimensions.get("window").height / 2.5,
  },
  input: {
    height: 40,
    width: "100%",
    margin: 12,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    color: "black",
  },
  button: {
    backgroundColor: "#9FFFA6",
    color: "#FFFFFF",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 12,
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "500",
  },
  scrollContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 8,
  },
  pill: {
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    margin: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: Dimensions.get("window").width / 3.5,
  },
});
