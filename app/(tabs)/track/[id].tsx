import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StyleSheet, ScrollView, View, Pressable, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ToolsSection } from '@/components/ToolsSection';
import Animated, { 
  FadeIn,
  withTiming,
  Easing,
  useAnimatedStyle,
  SharedTransitionType,
  withSpring,
  SharedTransition,
} from 'react-native-reanimated';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/app/(tabs)/_layout';

const { width } = Dimensions.get('window');

type TrackDetailScreenProps = {
  route: RouteProp<RootStackParamList, 'track/[id]'>;
};

//for custom shared transition
const transition = SharedTransition.custom((values) => {
  'worklet';
  return {
    height: withTiming(values.targetHeight, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
    width: withTiming(values.targetWidth, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
  };
})
  .progressAnimation((values, progress) => {
    'worklet';
    const getValue = (
      progress: number,
      target: number,
      current: number
    ): number => {
      return progress * (target - current) + current;
    };
    return {
      width: withTiming(values.targetWidth, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      height: withTiming(values.targetHeight, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      originX: withTiming(values.targetOriginX, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      originY: withTiming(values.targetOriginY, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
    };
  })
  .defaultTransitionType(SharedTransitionType.ANIMATION);


export default function TrackDetailScreen({ route }: TrackDetailScreenProps) {
  const { id } = route.params;
  console.log('id', id);
  
  // Since id is passed as a prop, it is guaranteed to be defined.
  const [activeTrack, setActiveTrack] = useState<'web-dev' | 'ai-python'>(() => {
    const trackId = id.toLowerCase();
    return trackId.includes('ai') || trackId.includes('python') ? 'ai-python' : 'web-dev';
  });   

  // Optionally, update activeTrack if id changes while the component is mounted.
  useEffect(() => {
    const trackId = id.toLowerCase();
    if (trackId.includes('ai') || trackId.includes('python')) {
      setActiveTrack('ai-python');
    } else {
      setActiveTrack('web-dev');
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
          style={({ pressed }) => [styles.tabButton, pressed && { opacity: 0.7 }]}
        >
          <ThemedText style={[styles.trackOption, isWebTrack && styles.activeTrack]}>
            INTRO TO WEB DEV
          </ThemedText>
        </Pressable>
        <View style={styles.divider} />
        <Pressable 
          onPress={() => setActiveTrack('ai-python')}
          style={({ pressed }) => [styles.tabButton, pressed && { opacity: 0.7 }]}
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
                <Animated.View sharedTransitionTag="image-web-dev" sharedTransitionStyle={transition} style={styles.imageContainer}>
                  <Animated.Image
                    source={require('@/assets/images/web-dev-track.gif')}
                    style={styles.trackImage}
                  />
                </Animated.View>
                <Animated.View  sharedTransitionTag="title-web-dev">
                  <Animated.Text sharedTransitionTag="title-web-dev" sharedTransitionStyle={transition} style={styles.title}>
                    intro to coding with web dev 🌐
                  </Animated.Text>
                </Animated.View>
                <Animated.View sharedTransitionTag="description-web-dev" sharedTransitionStyle={transition}>
                  <ThemedText style={styles.description}>
                    start building websites with html & css, the building blocks that power the web. grow into full-stack coding!
                  </ThemedText>
                </Animated.View>
                <ToolsSection />
                <ThemedText style={styles.startTitle}>
                  let's choose your starting point{'\n'}for this track ⛳
                </ThemedText>
                <ThemedView style={styles.checklistContainer}>
                  <ThemedView style={styles.checkItem}>
                    <ThemedText style={styles.checkmark}>✓</ThemedText>
                    <ThemedText style={styles.checkText}>
                      You are assigned sub-skill ⚡️ LEVEL 3
                    </ThemedText>
                  </ThemedView>
                  <ThemedView style={styles.checkItem}>
                    <ThemedText style={styles.checkmark}>✓</ThemedText>
                    <ThemedText style={styles.checkText}>
                      You can change levels if you wish!
                    </ThemedText>
                  </ThemedView>
                </ThemedView>
              </View>
            </Animated.View>
            <Animated.View style={aiContentStyle}>
              <View style={styles.content}>
                <Animated.View sharedTransitionTag="image-ai-python" style={styles.imageContainer}>
                  <Animated.Image
                    source={require('@/assets/images/ai-track.gif')}
                    style={styles.trackImage}
                  />
                </Animated.View>
                <Animated.Text sharedTransitionTag="title-ai-python" style={styles.title}>
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
                    <ThemedText style={styles.checkText}>
                      You are assigned sub-skill ⚡️ LEVEL 3
                    </ThemedText>
                  </ThemedView>
                  <ThemedView style={styles.checkItem}>
                    <ThemedText style={styles.checkmark}>✓</ThemedText>
                    <ThemedText style={styles.checkText}>
                      You can change levels if you wish!
                    </ThemedText>
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
  scrollView: {
    flex: 1,
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
  scrollContentContainer: {
    minHeight: '100%',
    position: 'relative',
    marginTop: 0,
  },
  contentContainer: {
    minHeight: '100%',
    position: 'relative',
    marginTop: 0,
  },
  animatedContentWrapper: {
    position: 'relative',
    width: '100%',
  },
  content: {
    padding: 20,
    paddingTop: 0,
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
    backgroundColor: '#171717',
    padding: 10,
    borderRadius: 12,
    marginBottom: 16,
  },
  checkItem: {
    flexDirection: 'row',
    backgroundColor: '#171717',
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