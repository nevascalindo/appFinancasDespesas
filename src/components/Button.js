import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';

// ============================================
// COMPONENTE DE BOTÃO
// ============================================

const Button = ({
  title,
  onPress,
  variant = 'primary', // primary, secondary, outline, ghost, danger
  size = 'medium', // small, medium, large
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left', // left, right
  fullWidth = false,
  style,
  textStyle,
}) => {
  const getButtonStyle = () => {
    const styles = [buttonStyles.base];

    // Variantes
    switch (variant) {
      case 'primary':
        styles.push(buttonStyles.primary);
        break;
      case 'secondary':
        styles.push(buttonStyles.secondary);
        break;
      case 'outline':
        styles.push(buttonStyles.outline);
        break;
      case 'ghost':
        styles.push(buttonStyles.ghost);
        break;
      case 'danger':
        styles.push(buttonStyles.danger);
        break;
    }

    // Tamanhos
    switch (size) {
      case 'small':
        styles.push(buttonStyles.small);
        break;
      case 'medium':
        styles.push(buttonStyles.medium);
        break;
      case 'large':
        styles.push(buttonStyles.large);
        break;
    }

    // Estados
    if (disabled) {
      styles.push(buttonStyles.disabled);
    }

    if (fullWidth) {
      styles.push(buttonStyles.fullWidth);
    }

    return styles;
  };

  const getTextStyle = () => {
    const styles = [buttonStyles.text];

    // Variantes de texto
    switch (variant) {
      case 'primary':
        styles.push(buttonStyles.textPrimary);
        break;
      case 'secondary':
        styles.push(buttonStyles.textSecondary);
        break;
      case 'outline':
        styles.push(buttonStyles.textOutline);
        break;
      case 'ghost':
        styles.push(buttonStyles.textGhost);
        break;
      case 'danger':
        styles.push(buttonStyles.textDanger);
        break;
    }

    // Tamanhos de texto
    switch (size) {
      case 'small':
        styles.push(buttonStyles.textSmall);
        break;
      case 'medium':
        styles.push(buttonStyles.textMedium);
        break;
      case 'large':
        styles.push(buttonStyles.textLarge);
        break;
    }

    if (disabled) {
      styles.push(buttonStyles.textDisabled);
    }

    return styles;
  };

  return (
    <TouchableOpacity
      style={[...getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' || variant === 'ghost' ? COLORS.primary : COLORS.white}
        />
      ) : (
        <View style={buttonStyles.content}>
          {icon && iconPosition === 'left' && (
            <View style={buttonStyles.iconLeft}>{icon}</View>
          )}
          <Text style={[...getTextStyle(), textStyle]}>{title}</Text>
          {icon && iconPosition === 'right' && (
            <View style={buttonStyles.iconRight}>{icon}</View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const buttonStyles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.radiusMd,
    ...SHADOWS.small,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Variantes
  primary: {
    backgroundColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  danger: {
    backgroundColor: COLORS.error,
  },
  
  // Tamanhos
  small: {
    height: SIZES.buttonHeightSm,
    paddingHorizontal: SIZES.padding,
  },
  medium: {
    height: SIZES.buttonHeight,
    paddingHorizontal: SIZES.padding * 1.5,
  },
  large: {
    height: SIZES.buttonHeightLg,
    paddingHorizontal: SIZES.padding * 2,
  },
  
  // Estados
  disabled: {
    opacity: 0.5,
  },
  fullWidth: {
    width: '100%',
  },
  
  // Texto
  text: {
    fontWeight: '600',
  },
  textPrimary: {
    color: COLORS.white,
  },
  textSecondary: {
    color: COLORS.white,
  },
  textOutline: {
    color: COLORS.primary,
  },
  textGhost: {
    color: COLORS.primary,
  },
  textDanger: {
    color: COLORS.white,
  },
  textSmall: {
    fontSize: SIZES.sm,
  },
  textMedium: {
    fontSize: SIZES.md,
  },
  textLarge: {
    fontSize: SIZES.lg,
  },
  textDisabled: {
    opacity: 0.7,
  },
  
  // Ícones
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});

export default Button;