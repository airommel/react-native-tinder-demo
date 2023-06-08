import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  PanResponder,
  Animated,
  Text,
  Dimensions,
} from 'react-native';
import Swiper from 'react-native-deck-swiper';

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: ScreenWidth * 0.5, // 50% of the screen width
    height: ScreenHeight * 0.3, // 30% of the screen height
  },
});

type CardType = {
  id: number;
  image: any;
};

export function TinderSwipe() {
  const [swipedCards, setSwipedCards] = useState<CardType[]>([]);

  const cards = [
    {id: 1, image: require('./assets/mui.jpeg')},
    {id: 2, image: require('./assets/day.jpeg')},
    {id: 3, image: require('./assets/ivy.jpeg')},
  ];

  const pan = useState(new Animated.ValueXY())[0];

  const handleSwipeRight = () => {
    console.log('swipe right');
  };

  const handleSwipeLeft = () => {
    console.log('swipe left');
  };
  const handleSwipeAll = ()=>{
    console.log('all images are shown')
  }

  const panResponder = useState(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > 120) {
          // Swiped right
          handleSwipeRight();
        } else if (gesture.dx < -120) {
          // Swiped left
          handleSwipeLeft();
        } else {
          // Reset card position
          Animated.spring(pan, {
            toValue: {x: 0, y: 0},
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  )[0];

  return (
    <View style={styles.container}>
      {swipedCards.length === 3 ? (
        <Text>All cards swiped!</Text>
      ) : (
        <Swiper
          cards={cards}
          renderCard={card => (
            <Animated.View
              {...panResponder.panHandlers}
              style={[pan.getLayout(), styles.card]}>
              <Image
                source={card.image}
                style={{flex: 1, width: ScreenWidth, height: ScreenHeight}}
              />
              <Text>{card.id}</Text>
            </Animated.View>
          )}
          onSwipedRight={handleSwipeRight}
          onSwipedLeft={handleSwipeLeft}
          onSwipedAll={handleSwipeAll}
        
        />
      )}
    </View>
  );
}
