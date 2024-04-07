import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, FlatList } from 'react-native';
import axios from 'axios';

export default function DogImage(){
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    fetchDogImages();
  }, []);

  const fetchDogImages = async () => {
    const response = await axios.get('https://api.thedogapi.com/v1/images/search?limit=10');
    setImageUrls(response.data.map(imageData => imageData.url));
  };

  const renderItem = ({ item }) => (
    <View style={{ margin: 5 }}>
      <Image
        source={{ uri: item }}
        style={{ width: 200, height: 200 }}
      />
    </View>
  );

  return (
    <View style={{}}>
      <FlatList
        data={imageUrls}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={true}
      />
      <Button
        title="Refresh"
        onPress={fetchDogImages}
      />
    </View>
  );
};
