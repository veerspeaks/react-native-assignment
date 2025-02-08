import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from '@/hooks/useColorScheme';
import HomeScreen from './index';
import TrackDetailScreen from './track/[id]';

// Define your navigation types
export type RootStackParamList = {
  Home: undefined;
  Tabs: undefined;
  'track/[id]': { id: string };
};

export type TabParamList = {
  Home: undefined;
  
};

const Stack = createNativeStackNavigator<RootStackParamList>();


export default function Navigation() {
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'none',
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          animation: 'none',
        }}
      />
      <Stack.Screen
        name="track/[id]"
        component={TrackDetailScreen}
        options={{
          animation: 'none',
          freezeOnBlur: true,
        }}
      />
    </Stack.Navigator>
  );
}

