declare module 'react-native' {
  import * as React from 'react';

  export type ColorSchemeName = 'light' | 'dark' | null;
  export type PlatformOSType = 'ios' | 'android' | 'macos' | 'windows' | 'web';
  export type TextStyle = Record<string, unknown>;
  export type ViewStyle = Record<string, unknown>;
  export type StyleProp<T> = T | false | Array<T | null | undefined | false> | null | undefined;
  export type PressableStateCallbackType = (state: { pressed: boolean }) => StyleProp<ViewStyle>;

  export const View: React.ComponentType<{
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
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
  }>;

  export const StyleSheet: {
    create<T extends Record<string, unknown>>(styles: T): T;
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
}
