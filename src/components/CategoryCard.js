import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from './Card';
import { COLORS, SIZES } from '../constants/theme';

// ============================================
// COMPONENTE DE CARD DE CATEGORIA
// ============================================

const CategoryCard = ({ category, onPress, onEdit, onDelete, showActions = false }) => {
  const formattedAmount = category.total
    ? new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(category.total)
    : null;

  return (
    <Card onPress={onPress} style={styles.card}>
      <View style={styles.container}>
        {/* Ícone da categoria */}
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: category.color + '20' },
          ]}
        >
          <Text style={styles.icon}>{category.icon}</Text>
        </View>

        {/* Informações da categoria */}
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>
            {category.name}
          </Text>
          {category.total !== undefined && (
            <Text style={styles.amount}>{formattedAmount}</Text>
          )}
          {category.count !== undefined && (
            <Text style={styles.count}>
              {category.count} {category.count === 1 ? 'transação' : 'transações'}
            </Text>
          )}
        </View>

        {/* Ações */}
        {showActions && (
          <View style={styles.actions}>
            {onEdit && (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => onEdit(category)}
              >
                <Ionicons name="pencil-outline" size={20} color={COLORS.primary} />
              </TouchableOpacity>
            )}
            {onDelete && (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => onDelete(category)}
              >
                <Ionicons name="trash-outline" size={20} color={COLORS.error} />
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Indicador de tipo */}
        {category.type && category.type !== 'both' && (
          <View
            style={[
              styles.typeBadge,
              category.type === 'income'
                ? styles.typeBadgeIncome
                : styles.typeBadgeExpense,
            ]}
          >
            <Text
              style={[
                styles.typeText,
                category.type === 'income'
                  ? styles.typeTextIncome
                  : styles.typeTextExpense,
              ]}
            >
              {category.type === 'income' ? 'Receita' : 'Despesa'}
            </Text>
          </View>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: SIZES.margin * 0.75,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: SIZES.radiusMd,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 24,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  amount: {
    fontSize: SIZES.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  count: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: SIZES.radiusSm,
    marginLeft: 8,
  },
  typeBadgeIncome: {
    backgroundColor: COLORS.incomeLight,
  },
  typeBadgeExpense: {
    backgroundColor: COLORS.expenseLight,
  },
  typeText: {
    fontSize: SIZES.xs,
    fontWeight: '600',
  },
  typeTextIncome: {
    color: COLORS.income,
  },
  typeTextExpense: {
    color: COLORS.expense,
  },
});

export default CategoryCard;