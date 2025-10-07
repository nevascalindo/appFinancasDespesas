import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { getTransactions } from '../../services/transactionService';
import TransactionCard from '../../components/TransactionCard';
import Card from '../../components/Card';
import { COLORS, SIZES } from '../../constants/theme';

const TransactionsScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('all'); // all, income, expense

  useEffect(() => {
    loadTransactions();
  }, [filter]);

  const loadTransactions = async () => {
    if (!user) return;

    try {
      const filters = filter !== 'all' ? { type: filter } : {};
      const { data } = await getTransactions(user.id, filters);
      if (data) setTransactions(data);
    } catch (error) {
      console.error('Error loading transactions:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadTransactions();
  }, [filter]);

  const renderEmpty = () => (
    <Card style={styles.emptyState}>
      <Ionicons name="receipt-outline" size={64} color={COLORS.gray300} />
      <Text style={styles.emptyStateText}>Nenhuma transação encontrada</Text>
      <Text style={styles.emptyStateSubtext}>
        Adicione suas receitas e despesas
      </Text>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Transações</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddTransaction')}>
          <Ionicons name="add-circle" size={32} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Filtros */}
      <View style={styles.filters}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'all' && styles.filterButtonActive]}
          onPress={() => setFilter('all')}
        >
          <Text
            style={[
              styles.filterButtonText,
              filter === 'all' && styles.filterButtonTextActive,
            ]}
          >
            Todas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === 'income' && styles.filterButtonActive,
          ]}
          onPress={() => setFilter('income')}
        >
          <Text
            style={[
              styles.filterButtonText,
              filter === 'income' && styles.filterButtonTextActive,
            ]}
          >
            Receitas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === 'expense' && styles.filterButtonActive,
          ]}
          onPress={() => setFilter('expense')}
        >
          <Text
            style={[
              styles.filterButtonText,
              filter === 'expense' && styles.filterButtonTextActive,
            ]}
          >
            Despesas
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lista */}
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionCard
            transaction={item}
          />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
  },
  title: {
    fontSize: SIZES.xxl,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  filters: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding,
    marginBottom: SIZES.margin,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: SIZES.radiusFull,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  filterButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterButtonText: {
    fontSize: SIZES.sm,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  filterButtonTextActive: {
    color: COLORS.white,
  },
  list: {
    paddingHorizontal: SIZES.padding,
    paddingBottom: SIZES.padding,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: SIZES.padding * 3,
    marginTop: SIZES.margin * 2,
  },
  emptyStateText: {
    fontSize: SIZES.lg,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
    marginTop: 8,
  },
});

export default TransactionsScreen;