import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useEffect, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { router, useRouter } from 'expo-router';

type CameraProps = {
  onCapture: (uri: string) => void;
  onClose: () => void;
};

export default function Camera({ onCapture, onClose }: CameraProps) {
  const router = useRouter();
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission] = MediaLibrary.usePermissions();
  const [latestPhoto, setLatestPhoto] = useState<string | null>(null);
  const cameraRef = useRef<any>(null);

  useEffect(() => {
    getLatestPhoto();
  }, [mediaLibraryPermission]);

  const getLatestPhoto = async () => {
    const { assets } = await MediaLibrary.getAssetsAsync({
      first: 1,
      mediaType: 'photo'
    });
    if (assets.length > 0) {
      setLatestPhoto(assets[0].uri);
    }
  };

  if (!permission || !mediaLibraryPermission) {
    return <View />;
  }

  if (!permission.granted || !mediaLibraryPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera and access your media library</Text>
        <Button onPress={() => {
          requestPermission();
          requestMediaLibraryPermission();
        }} title="Grant permissions" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const openCameraRoll = () => {
    router.push("/(post)/post")
    console.log('Open camera roll');
  };

  const takePhoto = async () => {
    console.log("ba");
    onCapture("null");
    // if (cameraRef.current) {
    //   const photo = await cameraRef.current.takePictureAsync();
    //   onCapture(photo.uri);
    // }
  };

  return (
    <View style={styles.container}>
      <CameraView 
        style={styles.camera} 
        facing={facing}
        ref={cameraRef}
      >
        <View style={styles.topButtonContainer}>
          <TouchableOpacity style={styles.topButton} onPress={onClose}>
            <Text style={styles.text}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topButton} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomContainer}>
          {latestPhoto && (
            <TouchableOpacity
              style={styles.thumbnailContainer}
              onPress={openCameraRoll}
            >
              <Image
                source={{ uri: latestPhoto }}
                style={styles.thumbnail}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  topButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 40,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
  },
  topButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  thumbnailContainer: {
    position: 'absolute',
    bottom: 35,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'white',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
  },
});