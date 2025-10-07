import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';

// ============================================
// COMPONENTE DE CARD
// ============================================

const Card = ({
  children,
  onPress,
  style,
  variant = 'default', // default, elevated, outlined
  padding = true,
}) => {
  const getCardStyle = () => {
    const styles = [cardStyles.base];

    switch (variant) {
      case 'elevated':
        styles.push(cardStyles.elevated);
        break;
      case 'outlined':
        styles.push(cardStyles.outlined);
        break;
      default:
        styles.push(cardStyles.default);
    }

    if (padding) {
      styles.push(cardStyles.withPadding);
    }

    return styles;
  };

  if (onPress) {
    return (
      <TouchableOpacity
        style={[...getCardStyle(), style]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={[...getCardStyle(), style]}>{children}</View>;
};

const cardStyles = StyleSheet.create({
  base: {
    borderRadius: SIZES.radiusLg,
    backgroundColor: COLORS.white,
  },
  default: {
    ...SHADOWS.small,
  },
  elevated: {
    ...SHADOWS.large,
  },
  outlined: {
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  withPadding: {
    padding: SIZES.padding,
  },
});

export default Card;