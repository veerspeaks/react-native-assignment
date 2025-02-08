import React from 'react';
import { StyleSheet, Image, ImageSourcePropType, Dimensions, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/app/(tabs)/_layout';
import * as Haptics from 'expo-haptics';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import Animated, {FadeIn} from 'react-native-reanimated';

interface TrackCardProps {
  title: string;
  description: string;
  image: ImageSourcePropType;
  emoji: string;
  href: string;
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function TrackCard({ title, description, image, emoji, href }: TrackCardProps) {
  const navigation = useNavigation<NavigationProp>();
  const trackId = href.split('/').pop()!;
  console.log('trackId', trackId);
  

  const handlePress = () => {
    if (process.env.EXPO_OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    navigation.navigate('(tabs)', { screen: 'track/[id]', params: { id: trackId } });
  };

  return (
    <Pressable onPress={handlePress} style={styles.card}>
      <ThemedView style={styles.card}>
        <Animated.View  style={styles.imageContainer} sharedTransitionTag={`image-${trackId}`}>
          <Animated.Image 
            source={image} 
            style={styles.image} 
            resizeMode="cover" 
          />
        </Animated.View>
        <ThemedView style={styles.content}>
          <Animated.View sharedTransitionTag={`title-${trackId}`}>
            <Animated.Text style={styles.title}>
              intro to coding with {title} {emoji}
            </Animated.Text>
          </Animated.View>
          <Animated.View sharedTransitionTag={`description-${trackId}`}>
            <Animated.Text style={styles.description}>
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