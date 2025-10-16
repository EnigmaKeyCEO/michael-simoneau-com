declare module 'react-native' {
  import * as React from 'react';

  export type ColorSchemeName = 'light' | 'dark' | null;
  export type PlatformOSType = 'ios' | 'android' | 'macos' | 'windows' | 'web';
  export type TextStyle = Record<string, unknown>;
  export type ViewStyle = Record<string, unknown>;
  export type StyleProp<T> = T | null | undefined | false | ReadonlyArray<StyleProp<T>>;
  export type PressableStateCallbackType = (state: { pressed: boolean }) => StyleProp<ViewStyle>;

  export const View: React.ComponentType<{
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
    pointerEvents?: 'auto' | 'none' | 'box-none' | 'box-only';
  }>;
  export const Text: React.ComponentType<{
    style?: StyleProp<TextStyle>;
    children?: React.ReactNode;
  }>;
  export const ScrollView: React.ComponentType<{
    contentContainerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
  }>;

  export const Pressable: React.ComponentType<{
    style?: StyleProp<ViewStyle> | PressableStateCallbackType;
    children?: React.ReactNode;
    onPress?: () => void;
    onPressIn?: () => void;
    onPressOut?: () => void;
  }>;

  export const StyleSheet: {
    create<T extends Record<string, unknown>>(styles: T): T;
    flatten<T>(style: StyleProp<T>): T;
  };

  export const Appearance: {
    getColorScheme(): ColorSchemeName;
    addChangeListener(listener: (preferences: { colorScheme: ColorSchemeName }) => void): {
      remove(): void;
    };
  };

  export const Platform: {
    OS: PlatformOSType;
    select<T>(spec: { [key in PlatformOSType]?: T } & { default?: T }): T;
  };

  export const AccessibilityInfo: {
    isReduceMotionEnabled(): Promise<boolean>;
    addEventListener(
      type: 'reduceMotionChanged',
      listener: (reduceMotionEnabled: boolean) => void,
    ): { remove(): void };
  };

  export namespace Animated {
    class Value {
      constructor(value: number);
      setValue(value: number): void;
      interpolate(config: { inputRange: number[]; outputRange: number[] }): AnimatedInterpolation;
    }

    type AnimatedInterpolation = {
      __getValue?: () => number;
    };

    type AnimatedCompositeAnimation = {
      start(callback?: (result: { finished: boolean }) => void): void;
      stop(): void;
    };

    function timing(
      value: Value,
      config: { toValue: number; duration: number; useNativeDriver: boolean },
    ): AnimatedCompositeAnimation;

    function spring(
      value: Value,
      config: {
        toValue: number;
        damping?: number;
        stiffness?: number;
        mass?: number;
        useNativeDriver: boolean;
      },
    ): AnimatedCompositeAnimation;

    function sequence(animations: AnimatedCompositeAnimation[]): AnimatedCompositeAnimation;

    function loop(animation: AnimatedCompositeAnimation): AnimatedCompositeAnimation;

    const View: React.ComponentType<{
      style?: StyleProp<ViewStyle>;
      children?: React.ReactNode;
      pointerEvents?: 'auto' | 'none' | 'box-none' | 'box-only';
    }>;
  }

  export const Animated: {
    Value: typeof Animated.Value;
    timing: typeof Animated.timing;
    spring: typeof Animated.spring;
    sequence: typeof Animated.sequence;
    loop: typeof Animated.loop;
    View: typeof Animated.View;
  };
}
