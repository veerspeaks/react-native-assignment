import React from 'react';
import { StyleSheet, Image, ImageSourcePropType, Dimensions, TouchableOpacity, Pressable } from 'react-native';
import { Link, useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import Animated, {
  SharedTransition,
  withSpring,
  withTiming,
  Easing,
} from 'react-native-reanimated';

console.log('TrackCard component file is being loaded');

interface TrackCardProps {
  title: string;
  description: string;
  image: ImageSourcePropType;
  emoji: string;
  href: `/track/${string}`;
}

const springConfig = {
  mass: 0.5,
  damping: 15,
  stiffness: 120,
  overshootClamping: false,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 0.01,
};

const sharedTransition = SharedTransition.custom((values) => {
  'worklet';
  return {
    height: withSpring(values.targetHeight, springConfig),
    width: withSpring(values.targetWidth, springConfig),
    originX: withSpring(values.targetOriginX, springConfig),
    originY: withSpring(values.targetOriginY, springConfig),
    transform: [
      { scale: withSpring(values.targetWidth / values.currentWidth, springConfig) }
    ],
  };
});

export function TrackCard({ title, description, image, emoji, href }: TrackCardProps) {
  const router = useRouter();
  const trackId = href.split('/').pop()!;

  const handlePress = () => {
    if (process.env.EXPO_OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    try {
      router.push(href);
    } catch (error) {
      console.error('Navigation failed:', error);
    }
  };

  return (
    <Pressable  
      onPress={handlePress}
      style={styles.card}
    >
      <ThemedView style={styles.card}>
        <Animated.View 
          sharedTransitionTag={`container-${trackId}`}
          sharedTransitionStyle={sharedTransition}
          style={styles.imageContainer}
        >
          <Animated.Image 
            sharedTransitionTag={`image-${trackId}`}
            sharedTransitionStyle={sharedTransition}
            source={image} 
            style={styles.image} 
            resizeMode="cover" 
          />
        </Animated.View>
        <ThemedView style={styles.content}>
          <Animated.View 
            sharedTransitionTag={`title-container-${trackId}`}
            sharedTransitionStyle={sharedTransition}
          >
            <Animated.Text 
              sharedTransitionTag={`title-${trackId}`}
              style={styles.title}
            >
              intro to coding with {title} {emoji}
            </Animated.Text>
          </Animated.View>
          <Animated.View 
            sharedTransitionTag={`desc-container-${trackId}`}
            sharedTransitionStyle={sharedTransition}
          >
            <Animated.Text 
              sharedTransitionTag={`desc-${trackId}`}
              style={styles.description}
            >
              {description}
            </Animated.Text>
          </Animated.View>
          <ThemedView style={styles.button}>
            <ThemedText type="defaultSemiBold" style={styles.buttonText}>
              VIEW TRACK DETAILS →
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </Pressable>
  );
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#171717',
    borderRadius: 12,
    overflow: 'hidden',
    width: 300,
    height: 500,
    opacity: 1,
  },
  pressed: {
    opacity: 0.9,
  },
  imageContainer: {
    overflow: 'hidden',
    width: '100%',
    height: 240,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 20,
    height: 260,
    justifyContent: 'space-between',
    backgroundColor: '#171717',
  },
  title: {
    fontSize: 24,
    color: '#fff',
  },
  emoji: {
    fontSize: 24,
  },
  description: {
    marginTop: 8,
    color: '#888',
    fontSize: 14,
    lineHeight: 20,
  },
  button: {
    marginTop: 'auto',
    borderWidth: 1,
    borderColor: '#333',
    padding: 12,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: '#fff',
    letterSpacing: 1,
  },
}); 