import { supabase } from '../config/supabase';

// -- Buscar todas as categorias do usuário
export const getCategories = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('user_id', userId)
      .order('name', { ascending: true });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching categories:', error);
    return { data: null, error };
  }
};

// -- Buscar categorias por tipo (income, expense ou both)
export const getCategoriesByType = async (userId, type) => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('user_id', userId)
      .or(`type.eq.${type},type.eq.both`)
      .order('name', { ascending: true });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching categories by type:', error);
    return { data: null, error };
  }
};

// -- Criar nova categoria
export const createCategory = async (userId, categoryData) => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .insert([
        {
          user_id: userId,
          name: categoryData.name,
          icon: categoryData.icon || '📁',
          color: categoryData.color || '#6366F1',
          type: categoryData.type || 'both',
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating category:', error);
    return { data: null, error };
  }
};

// -- Atualizar categoria existente
export const updateCategory = async (categoryId, categoryData) => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .update({
        name: categoryData.name,
        icon: categoryData.icon,
        color: categoryData.color,
        type: categoryData.type,
      })
      .eq('id', categoryId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating category:', error);
    return { data: null, error };
  }
};

// -- Deletar categoria
export const deleteCategory = async (categoryId) => {
  try {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', categoryId);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting category:', error);
    return { error };
  }
};

// -- Criar categorias padrão para novo usuário
export const createDefaultCategories = async (userId, defaultCategories) => {
  try {
    const categories = [];

    defaultCategories.expense.forEach((cat) => {
      categories.push({
        user_id: userId,
        name: cat.name,
        icon: cat.icon,
        color: cat.color,
        type: 'expense',
      });
    });

    defaultCategories.income.forEach((cat) => {
      categories.push({
        user_id: userId,
        name: cat.name,
        icon: cat.icon,
        color: cat.color,
        type: 'income',
      });
    });

    const { data, error } = await supabase
      .from('categories')
      .insert(categories)
      .select();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating default categories:', error);
    return { data: null, error };
  }
};