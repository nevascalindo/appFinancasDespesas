import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Card from './Card';
import { COLORS, SIZES } from '../constants/theme';

// ============================================
// COMPONENTE DE CARD DE TRANSAÇÃO
// ============================================

const TransactionCard = ({ transaction, onPress }) => {
  const isIncome = transaction.type === 'income';
  const amount = parseFloat(transaction.amount);
  
  const categoryIcon = transaction.categories?.icon || '📁';
  const categoryName = transaction.categories?.name || 'Sem categoria';
  const categoryColor = transaction.categories?.color || COLORS.gray400;

  const formattedDate = format(new Date(transaction.date), "dd 'de' MMM", {
    locale: ptBR,
  });

  const formattedAmount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount);

  return (
    <Card onPress={onPress} style={styles.card}>
      <View style={styles.container}>
        {/* Ícone da categoria */}
        <View style={[styles.iconContainer, { backgroundColor: categoryColor + '20' }]}>
          <Text style={styles.icon}>{categoryIcon}</Text>
        </View>

        {/* Informações da transação */}
        <View style={styles.info}>
          <Text style={styles.description} numberOfLines={1}>
            {transaction.description || categoryName}
          </Text>
          <View style={styles.details}>
            <Text style={styles.category}>{categoryName}</Text>
            <Text style={styles.separator}>•</Text>
            <Text style={styles.date}>{formattedDate}</Text>
          </View>
        </View>

        {/* Valor */}
        <View style={styles.amountContainer}>
          <Text
            style={[
              styles.amount,
              isIncome ? styles.amountIncome : styles.amountExpense,
            ]}
          >
            {isIncome ? '+' : '-'} {formattedAmount}
          </Text>
          {transaction.attachment_url && (
            <Ionicons
              name="attach-outline"
              size={16}
              color={COLORS.gray400}
              style={styles.attachmentIcon}
            />
          )}
        </View>
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
    marginRight: 12,
  },
  description: {
    fontSize: SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  category: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
  },
  separator: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginHorizontal: 6,
  },
  date: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: SIZES.lg,
    fontWeight: '700',
  },
  amountIncome: {
    color: COLORS.income,
  },
  amountExpense: {
    color: COLORS.expense,
  },
  attachmentIcon: {
    marginTop: 4,
  },
});

export default TransactionCard;