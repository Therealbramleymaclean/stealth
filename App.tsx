import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, SafeAreaView, ScrollView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

function Home(): JSX.Element {
  const [money, setMoney] = useState(0);
  const [playerName, setPlayerName] = useState('Your name');
  const [skills, setSkills] = useState({
    pickpocket: 1,
    case: 1,
    // Add other skills here with initial levels
  });

  const [isEditingName, setIsEditingName] = useState(false);
  const [editedPlayerName, setEditedPlayerName] = useState('');

  const buttonPressHandler = () => {
    setMoney((prevMoney) => prevMoney + 1);
  };

  const startEditingName = () => {
    setIsEditingName(true);
    setEditedPlayerName(playerName);
  };

  const saveEditedName = () => {
    setPlayerName(editedPlayerName);
    setIsEditingName(false);
  };

  const updatePlayerName = (name: string) => {
    setEditedPlayerName(name);
  };

  const updateSkillLevel = (skill: string) => {
    const cost = 1;

    // Check if there's enough money to level up
    if (money >= cost) {
      setSkills((prevSkills) => ({
        ...prevSkills,
        [skill]: prevSkills[skill] + 1,
      }));

      setMoney((prevMoney) => prevMoney - cost);
    }
  };

  const calculateTotalLevel = () => {
    // Sum up all skill levels
    return Object.values(skills).reduce((total, level) => total + level, 0);
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={startEditingName}>
            {isEditingName ? (
              <TextInput
                style={{
                  height: RFValue(40),
                  borderColor: 'gray',
                  borderWidth: 1,
                  marginBottom: RFValue(10),
                  fontSize: RFValue(14),
                }}
                onChangeText={updatePlayerName}
                value={editedPlayerName}
                onBlur={saveEditedName}
                autoFocus
              />
            ) : (
              <Text style={{ fontSize: RFValue(18), marginBottom: RFValue(10) }}>Player: {playerName}</Text>
            )}
          </TouchableOpacity>

          <Text style={{ fontSize: RFValue(16), marginBottom: RFValue(10) }}>Total Level: {calculateTotalLevel()}</Text>

          <TouchableOpacity onPress={buttonPressHandler}>
            <Text style={{ fontSize: RFValue(14), marginBottom: RFValue(10) }}>Pickpocket (+1 Money)</Text>
          </TouchableOpacity>

          <Text style={{ fontSize: RFValue(16), marginBottom: RFValue(10) }}>Money: {money}</Text>

          <View style={{ marginBottom: RFValue(10) }}>
            <Text style={{ fontSize: RFValue(14), marginBottom: RFValue(5) }}>Skills:</Text>
            {Object.keys(skills).map((skill) => (
              <TouchableOpacity key={skill} onPress={() => updateSkillLevel(skill)}>
                <Text style={{ fontSize: RFValue(14), marginBottom: RFValue(5) }}>{`${skill}: ${skills[skill]}`}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;
