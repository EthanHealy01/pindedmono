import React from "react";
import { Text, ScrollView, TouchableOpacity, View } from "react-native";

const SelectInterests = ({
  selectedInterests,
  toggleInterest,
  handleSignup,
  localStyle,
  styles,
  goBack,
}) => {
  const interests = [
    "🎸 Music",
    "🌭 Food",
    "⚽️ Sports",
    "🎨 Art",
    "💻 Tech",
    "🧬 Science",
    "📚 Books",
    "🍿 Movies",
    "👗 Fashion",
    "🏋️‍♀️ Fitness",
    "🌍 Travel",
    "📸 Photography",
    "🌱 Nature",
    "🗿 History",
    "🥗 Health",
    "🎮 Gaming",
    "🎭 Theatre",
    "🎤 Comedy",
    "🏊‍♂️ Swimming",
    "🚴‍♀️ Cycling",
    "🐎 Horse Racing",
    "🚣‍♂️ Water Sport",
    "🏌️‍♂️ Golf",
    "👩‍🍳 Cooking"

  ];

  const colors = [
    "#E32F2F",
    "#FFB520",
    "#2F1DFF",
    "#6CE975",
    "#0ACAFF",
    "#AE2DFF",
    "#FF13EB",
  ];

  return (
    <>
      <Text style={[localStyle.title, styles.text]}>Select Your Interests</Text>
      <Text
        style={[
          styles.text,
          {
            marginBottom: 10,
            fontSize: 14,
            fontWeight: "500",
            marginHorizontal: 20,
            textAlign: "center",
          },
        ]}
      >
        We will use these to reccomend events you might like. You can change
        them later. Also, feel free to skip. This is optional!
      </Text>
      <ScrollView
        style={{ maxHeight: 400 }}
        contentContainerStyle={localStyle.scrollContainer}
      >
        {interests.map((interest, index) => {
          const isSelected = selectedInterests.includes(interest);
          const backgroundColor = isSelected
            ? colors[index % colors.length]
            : "#FFFFFF";
          const textColor = isSelected ? "white" : "black";
          return (
            <TouchableOpacity
              key={index}
              style={[
                localStyle.pill,
                {
                  backgroundColor,
                  borderWidth: 2,
                  borderColor: colors[index % colors.length],
                },
              ]}
              onPress={() => toggleInterest(interest)}
            >
              <Text
                style={{ color: textColor }}
                numberOfLines={1} 
                adjustsFontSizeToFit
                minimumFontScale={0.5}
              >
                {interest}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View style={{display:'flex', flexDirection: "row", justifyContent:'space-between'}}>
      <TouchableOpacity style={localStyle.button} onPress={()=>goBack()}>
        <Text style={localStyle.buttonText}>Go Back</Text>
      </TouchableOpacity>
      <TouchableOpacity style={localStyle.button} onPress={handleSignup}>
        <Text style={localStyle.buttonText}>Finish</Text>
      </TouchableOpacity>
      </View>
    </>
  );
};
export default SelectInterests;
