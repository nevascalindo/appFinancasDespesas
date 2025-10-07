import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { VictoryPie, VictoryChart, VictoryBar, VictoryTheme, VictoryAxis } from 'victory-native';
import { startOfMonth, endOfMonth, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useAuth } from '../../contexts/AuthContext';
import {
  getCurrentMonthTransactions,
  getFinancialSummary,
  getExpensesByCategory,
  getLargestExpense,
} from '../../services/transactionService';
import BalanceCard from '../../components/BalanceCard';
import TransactionCard from '../../components/TransactionCard';
import Card from '../../components/Card';
import { COLORS, SIZES } from '../../constants/theme';

const { width } = Dimensions.get('window');

// ============================================
// TELA DE DASHBOARD
// ============================================

const DashboardScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [expensesByCategory, setExpensesByCategory] = useState([]);
  const [largestExpense, setLargestExpense] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    if (!user) return;

    try {
      const now = new Date();
      const startDate = format(startOfMonth(now), 'yyyy-MM-dd');
      const endDate = format(endOfMonth(now), 'yyyy-MM-dd');

      // Carregar resumo financeiro
      const { data: summaryData } = await getFinancialSummary(
        user.id,
        startDate,
        endDate
      );
      if (summaryData) setSummary(summaryData);

      // Carregar transações recentes
      const { data: transactionsData } = await getCurrentMonthTransactions(user.id);
      if (transactionsData) {
        setRecentTransactions(transactionsData.slice(0, 5));
      }

      // Carregar gastos por categoria
      const { data: categoriesData } = await getExpensesByCategory(
        user.id,
        startDate,
        endDate
      );
      if (categoriesData) {
        setExpensesByCategory(categoriesData.slice(0, 5));
      }

      // Carregar maior despesa
      const { data: largestExpenseData } = await getLargestExpense(
        user.id,
        startDate,
        endDate
      );
      if (largestExpenseData) setLargestExpense(largestExpenseData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadDashboardData();
  }, []);

  const renderExpensesChart = () => {
    if (expensesByCategory.length === 0) {
      return (
        <View style={styles.emptyChart}>
          <Ionicons name="pie-chart-outline" size={48} color={COLORS.gray300} />
          <Text style={styles.emptyChartText}>
            Nenhuma despesa registrada este mês
          </Text>
        </View>
      );
    }

    try {
      const chartData = expensesByCategory.map((cat) => ({
        x: cat.categoryName || 'Sem nome',
        y: parseFloat(cat.total) || 0,
        color: cat.categoryColor || COLORS.primary,
      }));

      // Filtrar dados inválidos
      const validData = chartData.filter(d => d.y > 0);

      if (validData.length === 0) {
        return (
          <View style={styles.emptyChart}>
            <Ionicons name="pie-chart-outline" size={48} color={COLORS.gray300} />
            <Text style={styles.emptyChartText}>
              Nenhuma despesa registrada este mês
            </Text>
          </View>
        );
      }

      return (
        <View style={styles.chartContainer}>
          <VictoryPie
            data={validData}
            x="x"
            y="y"
            width={width - 80}
            height={250}
            padding={{ top: 20, bottom: 20, left: 20, right: 20 }}
            colorScale={validData.map((d) => d.color)}
            innerRadius={50}
            labelRadius={90}
            style={{
              data: {
                fillOpacity: 0.9,
                stroke: COLORS.white,
                strokeWidth: 2,
              },
              labels: {
                fill: COLORS.textPrimary,
                fontSize: 11,
                fontWeight: 'bold',
              },
            }}
            labels={({ datum }) => {
              const percentage = ((datum.y / validData.reduce((sum, d) => sum + d.y, 0)) * 100).toFixed(0);
              return `${percentage}%`;
            }}
          />
        </View>
      );
    } catch (error) {
      console.error('Error rendering chart:', error);
      return (
        <View style={styles.emptyChart}>
          <Ionicons name="alert-circle-outline" size={48} color={COLORS.warning} />
          <Text style={styles.emptyChartText}>
            Erro ao carregar gráfico
          </Text>
        </View>
      );
    }
  };

  const renderCategoryList = () => {
    if (expensesByCategory.length === 0) return null;

    return (
      <View style={styles.categoryList}>
        {expensesByCategory.map((category, index) => (
          <View key={index} style={styles.categoryItem}>
            <View style={styles.categoryInfo}>
              <View
                style={[
                  styles.categoryDot,
                  { backgroundColor: category.categoryColor },
                ]}
              />
              <Text style={styles.categoryName}>{category.categoryName}</Text>
            </View>
            <Text style={styles.categoryAmount}>
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(category.total)}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Olá! 👋</Text>
            <Text style={styles.userName}>{user?.user_metadata?.full_name || 'Usuário'}</Text>
          </View>
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <Ionicons name="person-circle-outline" size={32} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* Card de Saldo */}
        <BalanceCard
          balance={summary.balance}
          income={summary.totalIncome}
          expense={summary.totalExpense}
        />

        {/* Maior Despesa */}
        {largestExpense && (
          <Card style={styles.highlightCard}>
            <View style={styles.highlightHeader}>
              <Ionicons name="alert-circle-outline" size={24} color={COLORS.warning} />
              <Text style={styles.highlightTitle}>Maior Despesa do Mês</Text>
            </View>
            <View style={styles.highlightContent}>
              <Text style={styles.highlightDescription}>
                {largestExpense.description || largestExpense.categories?.name}
              </Text>
              <Text style={styles.highlightAmount}>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(largestExpense.amount)}
              </Text>
            </View>
          </Card>
        )}

        {/* Gráfico de Despesas por Categoria */}
        <Card style={styles.chartCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Despesas por Categoria</Text>
          </View>
          {renderExpensesChart()}
          {renderCategoryList()}
        </Card>

        {/* Transações Recentes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Transações Recentes</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Transactions')}
            >
              <Text style={styles.sectionLink}>Ver todas</Text>
            </TouchableOpacity>
          </View>

          {recentTransactions.length === 0 ? (
            <Card style={styles.emptyState}>
              <Ionicons name="receipt-outline" size={48} color={COLORS.gray300} />
              <Text style={styles.emptyStateText}>
                Nenhuma transação registrada
              </Text>
              <Text style={styles.emptyStateSubtext}>
                Comece adicionando suas receitas e despesas
              </Text>
            </Card>
          ) : (
            recentTransactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
              />
            ))
          )}
        </View>
      </ScrollView>

      {/* Botão Flutuante */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddTransaction')}
      >
        <Ionicons name="add" size={28} color={COLORS.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: SIZES.padding,
    paddingBottom: 80,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.margin * 1.5,
  },
  greeting: {
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
  },
  userName: {
    fontSize: SIZES.xl,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: 4,
  },
  notificationButton: {
    padding: 4,
  },
  highlightCard: {
    marginBottom: SIZES.margin * 1.5,
  },
  highlightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  highlightTitle: {
    fontSize: SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginLeft: 8,
  },
  highlightContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  highlightDescription: {
    fontSize: SIZES.base,
    color: COLORS.textSecondary,
    flex: 1,
  },
  highlightAmount: {
    fontSize: SIZES.lg,
    fontWeight: '700',
    color: COLORS.expense,
  },
  chartCard: {
    marginBottom: SIZES.margin * 1.5,
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: SIZES.margin,
  },
  emptyChart: {
    alignItems: 'center',
    paddingVertical: SIZES.padding * 2,
  },
  emptyChartText: {
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
    marginTop: 12,
  },
  categoryList: {
    marginTop: SIZES.margin,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  categoryName: {
    fontSize: SIZES.md,
    color: COLORS.textPrimary,
  },
  categoryAmount: {
    fontSize: SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  section: {
    marginBottom: SIZES.margin,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.margin,
  },
  sectionTitle: {
    fontSize: SIZES.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  sectionLink: {
    fontSize: SIZES.md,
    color: COLORS.primary,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: SIZES.padding * 2,
  },
  emptyStateText: {
    fontSize: SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginTop: 12,
  },
  emptyStateSubtext: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  fab: {
    position: 'absolute',
    right: SIZES.padding,
    bottom: SIZES.padding,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
});

export default DashboardScreen;