import React, { useState } from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface ImageSelectorProps {
  onImageSelected: (uri: string) => void;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ onImageSelected }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // useEffect(() =>{
  //   selectImage();
  // }, []);

  const selectImage = async () => {
    // req permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    // images
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    //cancel
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      onImageSelected(result.assets[0].uri);
    }
  };

  return (
    <View>
      {/* {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />} */}
      <Button title="Select Image" onPress={selectImage} />
    </View>
  );
};

export default ImageSelector;