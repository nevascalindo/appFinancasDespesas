import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';

// ============================================
// COMPONENTE DE CARD DE SALDO
// ============================================

const BalanceCard = ({ balance, income, expense }) => {
  const formattedBalance = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(balance || 0);

  const formattedIncome = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(income || 0);

  const formattedExpense = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(expense || 0);

  return (
    <LinearGradient
      colors={[COLORS.primary, COLORS.primaryDark]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.card, SHADOWS.large]}
    >
      {/* Saldo Total */}
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Saldo Atual</Text>
        <Text style={styles.balanceAmount}>{formattedBalance}</Text>
      </View>

      {/* Divisor */}
      <View style={styles.divider} />

      {/* Receitas e Despesas */}
      <View style={styles.summaryContainer}>
        {/* Receitas */}
        <View style={styles.summaryItem}>
          <View style={styles.summaryIconContainer}>
            <Ionicons name="arrow-down-outline" size={20} color={COLORS.income} />
          </View>
          <View style={styles.summaryInfo}>
            <Text style={styles.summaryLabel}>Receitas</Text>
            <Text style={styles.summaryAmount}>{formattedIncome}</Text>
          </View>
        </View>

        {/* Despesas */}
        <View style={styles.summaryItem}>
          <View style={styles.summaryIconContainer}>
            <Ionicons name="arrow-up-outline" size={20} color={COLORS.error} />
          </View>
          <View style={styles.summaryInfo}>
            <Text style={styles.summaryLabel}>Despesas</Text>
            <Text style={styles.summaryAmount}>{formattedExpense}</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: SIZES.radiusLg,
    padding: SIZES.padding * 1.5,
    marginBottom: SIZES.margin * 1.5,
  },
  balanceContainer: {
    alignItems: 'center',
    marginBottom: SIZES.margin,
  },
  balanceLabel: {
    fontSize: SIZES.md,
    color: COLORS.white,
    opacity: 0.9,
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: SIZES.xxxl,
    fontWeight: '700',
    color: COLORS.white,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.white,
    opacity: 0.2,
    marginVertical: SIZES.margin,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  summaryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: SIZES.radiusMd,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  summaryInfo: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: SIZES.sm,
    color: COLORS.white,
    opacity: 0.9,
    marginBottom: 4,
  },
  summaryAmount: {
    fontSize: SIZES.md,
    fontWeight: '600',
    color: COLORS.white,
  },
});

export default BalanceCard;