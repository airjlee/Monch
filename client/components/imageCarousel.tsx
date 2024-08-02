import React, { useState, useRef } from 'react';
import { View, Image, StyleSheet, Dimensions, FlatList, ListRenderItemInfo, TouchableOpacity } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');
const containerPadding = 16;
const carouselWidth = screenWidth - (containerPadding * 2);

interface ImageCarouselProps {
  images: string[];
  onImagePress: (index: number) => void;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, onImagePress }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<string>>(null);

  const renderItem = ({ item, index }: ListRenderItemInfo<string>) => (
    <TouchableOpacity activeOpacity={1} onPress={() => onImagePress(index)} style={styles.imageContainer}>
      <Image
        source={{ uri: item }}
        style={styles.image}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50
  }).current;

  if (images.length === 1) {
    return (
      <View style={styles.container}>
        {renderItem({ item: images[0], index: 0 } as ListRenderItemInfo<string>)}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        decelerationRate="fast"
        snapToInterval={carouselWidth}
        snapToAlignment="center"
      />
      {images.length > 1 && (
        <View style={styles.pagination}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === activeIndex ? styles.paginationDotActive : null
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: carouselWidth,
    height: 350,
    alignSelf: 'center',
  },
  imageContainer: {
    width: carouselWidth,
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    margin: 5,
  },
  paginationDotActive: {
    backgroundColor: '#fff',
  },
});

export default ImageCarousel;