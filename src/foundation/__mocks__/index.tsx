import React, { type ReactNode } from "react";
import { View } from "react-native";

export const FoundationProvider = ({
  children,
}: {
  children: ReactNode;
}): React.ReactElement => <View testID="foundation-provider">{children}</View>;
