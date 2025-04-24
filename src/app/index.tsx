import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withRepeat,
} from 'react-native-reanimated';
import '../../global.css';

const Main = () => {
  // Shared animation values
  const circleScale = useSharedValue(0);
  const squareOpacity = useSharedValue(0);
  const pillScale = useSharedValue(1);

  useEffect(() => {
    // Bounce-in circle
    circleScale.value = withTiming(1, {
      duration: 700,
      easing: Easing.out(Easing.exp),
    });

    // Fade-in square
    squareOpacity.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.quad),
    });

    // Pulse pill forever
    pillScale.value = withRepeat(
      withTiming(1.1, { duration: 600, easing: Easing.inOut(Easing.ease) }),
      -1,
      true // reverse
    );
  }, []);

  // Animated styles
  const circleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: circleScale.value }],
  }));

  const squareStyle = useAnimatedStyle(() => ({
    opacity: squareOpacity.value,
  }));

  const pillStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pillScale.value }],
  }));

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-green-500">
      <ScrollView
        className="w-full"
        contentContainerStyle={{ paddingVertical: 30, alignItems: 'center' }}>
        {/* Title Block */}
        <Animated.View className="w-11/12 rounded-2xl bg-indigo-100 p-6 shadow-md">
          <Text className="text-center text-lg font-bold text-indigo-800">
            Welcome to your animated screen!
          </Text>
        </Animated.View>

        {/* Shapes Section */}
        <Animated.View
          style={circleStyle}
          className="mt-8 h-24 w-24 rounded-full bg-pink-400 shadow-lg"
        />
        <Animated.View style={squareStyle} className="mt-6 h-20 w-20 bg-green-400 shadow-md" />
        <Animated.View
          style={pillStyle}
          className="mt-6 h-12 w-48 rounded-full bg-yellow-400 shadow"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Main;
