import { supabase } from '../config/supabase';
import { startOfMonth, endOfMonth, format } from 'date-fns';

// -- Buscar todas as transações do usuário
export const getTransactions = async (userId, filters = {}) => {
  try {
    let query = supabase
      .from('transactions')
      .select(`
        *,
        categories (
          id,
          name,
          icon,
          color,
          type
        )
      `)
      .eq('user_id', userId);

    if (filters.type) {
      query = query.eq('type', filters.type);
    }

    if (filters.categoryId) {
      query = query.eq('category_id', filters.categoryId);
    }

    if (filters.startDate) {
      query = query.gte('date', filters.startDate);
    }

    if (filters.endDate) {
      query = query.lte('date', filters.endDate);
    }

    query = query.order('date', { ascending: false });

    const { data, error } = await query;

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return { data: null, error };
  }
};

// -- Buscar transações do mês atual
export const getCurrentMonthTransactions = async (userId) => {
  const now = new Date();
  const startDate = format(startOfMonth(now), 'yyyy-MM-dd');
  const endDate = format(endOfMonth(now), 'yyyy-MM-dd');

  return getTransactions(userId, { startDate, endDate });
};

// -- Buscar uma transação específica
export const getTransaction = async (transactionId) => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select(`
        *,
        categories (
          id,
          name,
          icon,
          color,
          type
        )
      `)
      .eq('id', transactionId)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching transaction:', error);
    return { data: null, error };
  }
};

// -- Criar nova transação
export const createTransaction = async (userId, transactionData) => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .insert([
        {
          user_id: userId,
          type: transactionData.type,
          amount: transactionData.amount,
          category_id: transactionData.categoryId || null,
          description: transactionData.description || '',
          date: transactionData.date || new Date().toISOString().split('T')[0],
          attachment_url: transactionData.attachmentUrl || null,
          attachment_name: transactionData.attachmentName || null,
          notes: transactionData.notes || '',
        },
      ])
      .select(`
        *,
        categories (
          id,
          name,
          icon,
          color,
          type
        )
      `)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating transaction:', error);
    return { data: null, error };
  }
};

// -- Atualizar transação existente
export const updateTransaction = async (transactionId, transactionData) => {
  try {
    const updateData = {
      type: transactionData.type,
      amount: transactionData.amount,
      category_id: transactionData.categoryId || null,
      description: transactionData.description || '',
      date: transactionData.date,
      notes: transactionData.notes || '',
    };

    if (transactionData.attachmentUrl !== undefined) {
      updateData.attachment_url = transactionData.attachmentUrl;
    }
    if (transactionData.attachmentName !== undefined) {
      updateData.attachment_name = transactionData.attachmentName;
    }

    const { data, error } = await supabase
      .from('transactions')
      .update(updateData)
      .eq('id', transactionId)
      .select(`
        *,
        categories (
          id,
          name,
          icon,
          color,
          type
        )
      `)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating transaction:', error);
    return { data: null, error };
  }
};

// -- Deletar transação
export const deleteTransaction = async (transactionId) => {
  try {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', transactionId);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting transaction:', error);
    return { error };
  }
};

// -- Calcular resumo financeiro
export const getFinancialSummary = async (userId, startDate, endDate) => {
  try {
    const { data, error } = await getTransactions(userId, { startDate, endDate });

    if (error) throw error;

    const summary = {
      totalIncome: 0,
      totalExpense: 0,
      balance: 0,
      transactionCount: data?.length || 0,
      incomeCount: 0,
      expenseCount: 0,
    };

    data?.forEach((transaction) => {
      if (transaction.type === 'income') {
        summary.totalIncome += parseFloat(transaction.amount);
        summary.incomeCount++;
      } else {
        summary.totalExpense += parseFloat(transaction.amount);
        summary.expenseCount++;
      }
    });

    summary.balance = summary.totalIncome - summary.totalExpense;

    return { data: summary, error: null };
  } catch (error) {
    console.error('Error calculating financial summary:', error);
    return { data: null, error };
  }
};

// -- Buscar gastos agrupados por categoria
export const getExpensesByCategory = async (userId, startDate, endDate) => {
  try {
    const { data, error } = await getTransactions(userId, {
      type: 'expense',
      startDate,
      endDate,
    });

    if (error) throw error;

    const categoryMap = {};

    data?.forEach((transaction) => {
      const categoryId = transaction.category_id || 'uncategorized';
      const categoryName = transaction.categories?.name || 'Sem categoria';
      const categoryIcon = transaction.categories?.icon || '📁';
      const categoryColor = transaction.categories?.color || '#6366F1';

      if (!categoryMap[categoryId]) {
        categoryMap[categoryId] = {
          categoryId,
          categoryName,
          categoryIcon,
          categoryColor,
          total: 0,
          count: 0,
          transactions: [],
        };
      }

      categoryMap[categoryId].total += parseFloat(transaction.amount);
      categoryMap[categoryId].count++;
      categoryMap[categoryId].transactions.push(transaction);
    });

    const categories = Object.values(categoryMap).sort((a, b) => b.total - a.total);

    return { data: categories, error: null };
  } catch (error) {
    console.error('Error fetching expenses by category:', error);
    return { data: null, error };
  }
};

// -- Buscar maior despesa do período
export const getLargestExpense = async (userId, startDate, endDate) => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select(`
        *,
        categories (
          id,
          name,
          icon,
          color,
          type
        )
      `)
      .eq('user_id', userId)
      .eq('type', 'expense')
      .gte('date', startDate)
      .lte('date', endDate)
      .order('amount', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return { data: data || null, error: null };
  } catch (error) {
    console.error('Error fetching largest expense:', error);
    return { data: null, error };
  }
};

// -- Upload de anexo para o storage
export const uploadAttachment = async (userId, file, fileName) => {
  try {
    const fileExt = fileName.split('.').pop();
    const filePath = `${userId}/${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('attachments')
      .upload(filePath, file);

    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from('attachments')
      .getPublicUrl(filePath);

    return { data: { path: filePath, url: urlData.publicUrl }, error: null };
  } catch (error) {
    console.error('Error uploading attachment:', error);
    return { data: null, error };
  }
};

// -- Deletar anexo do storage
export const deleteAttachment = async (filePath) => {
  try {
    const { error } = await supabase.storage
      .from('attachments')
      .remove([filePath]);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting attachment:', error);
    return { error };
  }
};