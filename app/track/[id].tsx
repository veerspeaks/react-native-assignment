import React, { useEffect, useState } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Image, ScrollView, View, Pressable, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ToolsSection } from '@/components/ToolsSection';
import Animated, { 
  useAnimatedStyle,
  withTiming,
  Easing,
  SharedTransition,
  withSpring
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const springConfig = {
  mass: 0.5,
  damping: 15,
  stiffness: 120,
  overshootClamping: false,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 0.01,
};

// Add sharedTransition before the component definition
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

export default function TrackDetailScreen() {
  const { id } = useLocalSearchParams();
  const [activeTrack, setActiveTrack] = useState<'web-dev' | 'ai-python'>(
    id === 'ai-python' ? 'ai-python' : 'web-dev'
  );

  useEffect(() => {
    if (id === 'web-dev' || id === 'ai-python') {
      setActiveTrack(id);
    }
  }, [id]);

  const isWebTrack = activeTrack === 'web-dev';

  const webContentStyle = useAnimatedStyle(() => ({
    transform: [{
      translateX: withTiming(isWebTrack ? 0 : -width, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      })
    }],
    position: 'absolute',
    width: '100%',
  }));

  const aiContentStyle = useAnimatedStyle(() => ({
    transform: [{
      translateX: withTiming(isWebTrack ? width : 0, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      })
    }],
    position: 'absolute',
    width: '100%',
  }));

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: '',
          headerBackTitle: 'BACK',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#171717',
          },
        }} 
      />
      
      {/* Track Selector */}
      <ThemedView style={[styles.trackSelector, { backgroundColor: '#171717' }]}>
        <Pressable 
          onPress={() => setActiveTrack('web-dev')}
          style={({ pressed }) => [
            styles.tabButton,
            pressed && { opacity: 0.7 }
          ]}
        >
          <ThemedText style={[styles.trackOption, isWebTrack && styles.activeTrack]}>
            INTRO TO WEB DEV
          </ThemedText>
        </Pressable>
        <View style={styles.divider} />
        <Pressable 
          onPress={() => setActiveTrack('ai-python')}
          style={({ pressed }) => [
            styles.tabButton,
            pressed && { opacity: 0.7 }
          ]}
        >
          <ThemedText style={[styles.trackOption, !isWebTrack && styles.activeTrack]}>
            INTRO TO AI PYTHON
          </ThemedText>
        </Pressable>
      </ThemedView>

      {/* Content Container */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContentContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.animatedContentWrapper}>
            <Animated.View style={webContentStyle}>
              <View style={styles.content}>
                <Animated.View 
                  sharedTransitionTag="container-web-dev"
                  sharedTransitionStyle={sharedTransition}
                  style={styles.imageContainer}
                >
                  <Animated.Image
                    sharedTransitionTag="image-web-dev"
                    sharedTransitionStyle={sharedTransition}
                    source={require('@/assets/images/web-dev-track.gif')}
                    style={styles.trackImage}
                  />
                </Animated.View>
                <Animated.Text 
                  sharedTransitionTag="title-web-dev"
                  style={styles.title}
                >
                  intro to coding with web dev 🌐
                </Animated.Text>
                <ThemedText style={styles.description}>
                  start building websites with html & css, the building blocks that power the web. grow into full-stack coding!
                </ThemedText>
                <ToolsSection />
                <ThemedText style={styles.startTitle}>
                  let's choose your starting point{'\n'}for this track ⛳
                </ThemedText>
                <ThemedView style={styles.checklistContainer}>
                  <ThemedView style={styles.checkItem}>
                    <ThemedText style={styles.checkmark}>✓</ThemedText>
                    <ThemedText style={styles.checkText}>You are assigned sub-skill ⚡️ LEVEL 3</ThemedText>
                  </ThemedView>
                  <ThemedView style={styles.checkItem}>
                    <ThemedText style={styles.checkmark}>✓</ThemedText>
                    <ThemedText style={styles.checkText}>You can change levels if you wish!</ThemedText>
                  </ThemedView>
                </ThemedView>
              </View>
            </Animated.View>
            <Animated.View style={aiContentStyle}>
              <View style={styles.content}>
                <Animated.View 
                  sharedTransitionTag="container-ai-python"
                  sharedTransitionStyle={sharedTransition}
                  style={styles.imageContainer}
                >
                  <Animated.Image
                    sharedTransitionTag="image-ai-python"
                    sharedTransitionStyle={sharedTransition}
                    source={require('@/assets/images/ai-track.gif')}
                    style={styles.trackImage}
                  />
                </Animated.View>
                <Animated.Text 
                  sharedTransitionTag="title-ai-python"
                  style={styles.title}
                >
                  intro to coding with ai python 🤖
                </Animated.Text>
                <ThemedText style={styles.description}>
                  learn python basics and dive into ai. build practical ai apps, get hands-on with ml models and grow into ai engineering!
                </ThemedText>
                <ToolsSection />
                <ThemedText style={styles.startTitle}>
                  let's choose your starting point{'\n'}for this track ⛳
                </ThemedText>
                <ThemedView style={styles.checklistContainer}>
                  <ThemedView style={styles.checkItem}>
                    <ThemedText style={styles.checkmark}>✓</ThemedText>
                    <ThemedText style={styles.checkText}>You are assigned sub-skill ⚡️ LEVEL 3</ThemedText>
                  </ThemedView>
                  <ThemedView style={styles.checkItem}>
                    <ThemedText style={styles.checkmark}>✓</ThemedText>
                    <ThemedText style={styles.checkText}>You can change levels if you wish!</ThemedText>
                  </ThemedView>
                </ThemedView>
              </View>
            </Animated.View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171717',
  },
  trackSelector: {
    flexDirection: 'row',
    marginTop: 60,
    paddingTop: 20,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    backgroundColor: '#171717',
    gap: 10,
  },
  tabButton: {
    flex: 1,
  },
  trackOption: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'CooperHewittMedium',
    textAlign: 'center',
    paddingBottom: 8,
  },
  activeTrack: {
    color: '#00FF9D',
    borderBottomWidth: 2,
    borderBottomColor: '#00FF9D',
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: '#333',
    alignSelf: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    minHeight: '100%',
    position: 'relative',
    marginTop: 10,
  },
  contentContainer: {
    minHeight: '100%',
    position: 'relative',
    marginTop: 10,
  },
  animatedContentWrapper: {
    position: 'relative',
    width: '100%',
  },
  content: {
    padding: 20,
    backgroundColor: '#171717',
  },
  trackImage: {
    width: '100%',
    height: 240,
    borderRadius: 12,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontFamily: 'CircularBook',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#888',
    fontFamily: 'CircularBook',
    lineHeight: 24,
    marginBottom: 32,
  },
  startTitle: {
    fontSize: 24,
    color: '#999',
    fontFamily: 'CircularBook',
    marginBottom: 24,
  },
  checklistContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  checkmark: {
    color: '#00FF9D',
    fontSize: 18,
    marginTop: 2,
  },
  checkText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'CircularBook',
    flex: 1,
  },
  imageContainer: {
    overflow: 'hidden',
    borderRadius: 12,
    marginBottom: 30,
  },
}); 