import { StyleSheet, ScrollView, View, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TrackCard } from '@/components/TrackCard';
import Animated, {FadeIn} from 'react-native-reanimated';

export default function HomeScreen() {
  console.log('HomeScreen rendering');
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>pick your track</ThemedText>
        <ThemedView style={styles.subtitleContainer}>
          <ThemedText style={styles.subtitle}>time to build</ThemedText>
          <ThemedText style={styles.rocketEmoji}>🚀</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.techBadge}>
          <ThemedText style={styles.techText}>tech</ThemedText>
          <Image 
            source={require('@/assets/images/level.png')} 
            style={styles.levelImage}
          />
        </ThemedView>

        <ThemedView style={styles.checklistContainer}>
          <ThemedView style={styles.checkItem}>
            <ThemedText style={styles.checkmark}>✓</ThemedText>
            <ThemedText style={styles.checkText}>switch or add tracks anytime as you grow</ThemedText>
          </ThemedView>
          <ThemedView style={styles.checkItem}>
            <ThemedText style={styles.checkmark}>✓</ThemedText>
            <ThemedText style={styles.checkText}>complete your track to unlock new skills and projects!</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardsScrollContainer}
      >
        <View style={styles.cardWrapper}>
          <TrackCard
            title="web dev"
            emoji="🌐"
            description="start building websites with html & css, the building blocks that power the web. grow into full-stack coding!"
            image={require('@/assets/images/web-dev-track.gif')}
            href="/track/web-dev"
          />
        </View>
        <View style={styles.cardWrapper}>
          <TrackCard
            title="ai python"
            emoji="🤖"
            description="learn python basics and dive into ai. build practical ai apps, get hands-on with ml models and grow into ai engineering!"
            image={require('@/assets/images/ai-track.gif')}
            href="/track/ai-python"
          />
        </View>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 24,
    fontFamily: 'NTBrickSans',
    color: '#fff',
    letterSpacing: 0.5,
    lineHeight: 34,
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -4,
    backgroundColor: 'transparent',
  },
  subtitle: {
    fontSize: 22,
    fontFamily: 'NTBrickSans',
    color: '#FFD700',
    letterSpacing: 0.5,
    lineHeight: 34,
  },
  rocketEmoji: {
    fontSize: 18,
    marginLeft: 4,
  },
  techBadge: {
    position: 'absolute',
    right: 20,
    top: 60,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  techText: {
    color: '#00FF9D',
    fontSize: 20,
    fontFamily: 'NTBrickSans',
    marginBottom: 4,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
  levelImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  checklistContainer: {
    marginTop: 70,
    gap: 12,
    backgroundColor: 'transparent',
    marginBottom: 32,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
  },
  checkmark: {
    color: '#00FF9D',
    fontSize: 18,
    marginRight: 12,
    marginTop: -2,
  },
  checkText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 18,
    fontFamily: 'CircularLight',
    flex: 1,
    lineHeight: 20,
  },
  cardsScrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 16,
    minHeight: 520,
  },
  cardWrapper: {
    height: 500,
  }
});
