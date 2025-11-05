import { View } from "react-native";

import type { ReactNode } from "react";

export const FoundationProvider = ({
  children,
}: {
  children: ReactNode;
}) => <View testID="foundation-provider">{children}</View>;
