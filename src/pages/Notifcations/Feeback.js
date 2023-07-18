import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Icon } from '@rneui/base';

export const RatingScreen = () => {
  const [selectedStar, setSelectedStar] = useState(null);

  const handleStarPress = (star) => {
    setSelectedStar(star);
    console.log(`Selected star: ${star}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rate The Ride </Text>
      <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => handleStarPress(star)}
            style={styles.starButton}
          >
            <Icon
              name={star <= selectedStar ? 'star' : 'stars'}
              size={40}
              color={star <= selectedStar ? '#FFD700' : '#D3D3D3'}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  starButton: {
    marginHorizontal: 5,
  },
});


