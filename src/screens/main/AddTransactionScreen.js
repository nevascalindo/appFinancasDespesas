import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { useAuth } from '../../contexts/AuthContext';
import { createTransaction } from '../../services/transactionService';
import { getCategoriesByType } from '../../services/categoryService';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { COLORS, SIZES } from '../../constants/theme';

// ============================================
// TELA DE ADICIONAR TRANSAÇÃO
// ============================================

const AddTransactionScreen = ({ navigation, route }) => {
  const { user } = useAuth();
  const initialType = route.params?.type || 'expense';

  const [type, setType] = useState(initialType);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadCategories();
  }, [type]);

  const loadCategories = async () => {
    if (!user) return;

    const { data } = await getCategoriesByType(user.id, type);
    if (data) {
      setCategories(data);
      // Resetar categoria selecionada ao mudar o tipo
      setCategoryId('');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = 'Valor deve ser maior que zero';
    }

    if (!description.trim()) {
      newErrors.description = 'Descrição é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setAttachment(result.assets[0]);
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Erro', 'Não foi possível selecionar o arquivo');
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const transactionData = {
        type,
        amount: parseFloat(amount),
        description: description.trim(),
        categoryId: categoryId || null,
        date,
        notes: notes.trim(),
      };

      // TODO: Implementar upload de anexo se necessário
      // if (attachment) {
      //   const { data: uploadData } = await uploadAttachment(user.id, attachment);
      //   transactionData.attachmentUrl = uploadData?.url;
      //   transactionData.attachmentName = attachment.name;
      // }

      const { data, error } = await createTransaction(user.id, transactionData);

      if (error) {
        Alert.alert('Erro', 'Não foi possível criar a transação');
        return;
      }

      Alert.alert('Sucesso', 'Transação criada com sucesso!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.error('Error creating transaction:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao criar a transação');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.title}>Nova Transação</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Seletor de Tipo */}
        <View style={styles.typeSelector}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              type === 'expense' && styles.typeButtonActive,
              type === 'expense' && styles.typeButtonExpense,
            ]}
            onPress={() => setType('expense')}
          >
            <Ionicons
              name="arrow-up-outline"
              size={20}
              color={type === 'expense' ? COLORS.white : COLORS.expense}
            />
            <Text
              style={[
                styles.typeButtonText,
                type === 'expense' && styles.typeButtonTextActive,
              ]}
            >
              Despesa
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.typeButton,
              type === 'income' && styles.typeButtonActive,
              type === 'income' && styles.typeButtonIncome,
            ]}
            onPress={() => setType('income')}
          >
            <Ionicons
              name="arrow-down-outline"
              size={20}
              color={type === 'income' ? COLORS.white : COLORS.income}
            />
            <Text
              style={[
                styles.typeButtonText,
                type === 'income' && styles.typeButtonTextActive,
              ]}
            >
              Receita
            </Text>
          </TouchableOpacity>
        </View>

        {/* Formulário */}
        <View style={styles.form}>
          <Input
            label="Valor"
            value={amount}
            onChangeText={(text) => {
              // Permitir apenas números e ponto decimal
              const cleaned = text.replace(/[^0-9.]/g, '');
              setAmount(cleaned);
              setErrors({ ...errors, amount: '' });
            }}
            placeholder="0,00"
            keyboardType="decimal-pad"
            error={errors.amount}
            leftIcon={
              <Text style={styles.currencySymbol}>R$</Text>
            }
          />

          <Input
            label="Descrição"
            value={description}
            onChangeText={(text) => {
              setDescription(text);
              setErrors({ ...errors, description: '' });
            }}
            placeholder="Ex: Compra no supermercado"
            error={errors.description}
          />

          {/* Seletor de Categoria */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Categoria</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoryScroll}
            >
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryChip,
                    categoryId === category.id && styles.categoryChipActive,
                    categoryId === category.id && {
                      backgroundColor: category.color,
                    },
                  ]}
                  onPress={() => setCategoryId(category.id)}
                >
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                  <Text
                    style={[
                      styles.categoryChipText,
                      categoryId === category.id && styles.categoryChipTextActive,
                    ]}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.addCategoryButton}
                onPress={() => navigation.navigate('Categories')}
              >
                <Ionicons name="add" size={20} color={COLORS.primary} />
                <Text style={styles.addCategoryText}>Nova</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          <Input
            label="Data"
            value={date}
            onChangeText={setDate}
            placeholder="AAAA-MM-DD"
            keyboardType="default"
          />

          <Input
            label="Observações (opcional)"
            value={notes}
            onChangeText={setNotes}
            placeholder="Adicione observações..."
            multiline
            numberOfLines={3}
          />

          {/* Anexo */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Comprovante (opcional)</Text>
            {attachment ? (
              <Card style={styles.attachmentCard}>
                <View style={styles.attachmentInfo}>
                  <Ionicons name="document-outline" size={24} color={COLORS.primary} />
                  <Text style={styles.attachmentName} numberOfLines={1}>
                    {attachment.name}
                  </Text>
                  <TouchableOpacity onPress={() => setAttachment(null)}>
                    <Ionicons name="close-circle" size={24} color={COLORS.error} />
                  </TouchableOpacity>
                </View>
              </Card>
            ) : (
              <TouchableOpacity
                style={styles.attachmentButton}
                onPress={handlePickDocument}
              >
                <Ionicons name="cloud-upload-outline" size={24} color={COLORS.primary} />
                <Text style={styles.attachmentButtonText}>
                  Adicionar comprovante
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Botões */}
        <View style={styles.actions}>
          <Button
            title="Cancelar"
            variant="outline"
            onPress={() => navigation.goBack()}
            style={styles.cancelButton}
          />
          <Button
            title="Salvar"
            onPress={handleSubmit}
            loading={loading}
            style={styles.saveButton}
          />
        </View>
      </ScrollView>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.margin * 1.5,
  },
  title: {
    fontSize: SIZES.xl,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  typeSelector: {
    flexDirection: 'row',
    marginBottom: SIZES.margin * 1.5,
    gap: 12,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: SIZES.radiusMd,
    borderWidth: 2,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  typeButtonActive: {
    borderColor: 'transparent',
  },
  typeButtonExpense: {
    backgroundColor: COLORS.expense,
  },
  typeButtonIncome: {
    backgroundColor: COLORS.income,
  },
  typeButtonText: {
    fontSize: SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginLeft: 8,
  },
  typeButtonTextActive: {
    color: COLORS.white,
  },
  form: {
    marginBottom: SIZES.margin * 2,
  },
  currencySymbol: {
    fontSize: SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  inputGroup: {
    marginBottom: SIZES.margin,
  },
  label: {
    fontSize: SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  categoryScroll: {
    marginTop: 8,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: SIZES.radiusFull,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    marginRight: 8,
  },
  categoryChipActive: {
    borderColor: 'transparent',
  },
  categoryIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  categoryChipText: {
    fontSize: SIZES.sm,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  categoryChipTextActive: {
    color: COLORS.white,
  },
  addCategoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: SIZES.radiusFull,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
  },
  addCategoryText: {
    fontSize: SIZES.sm,
    fontWeight: '600',
    color: COLORS.primary,
    marginLeft: 4,
  },
  attachmentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderRadius: SIZES.radiusMd,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    backgroundColor: COLORS.white,
  },
  attachmentButtonText: {
    fontSize: SIZES.md,
    color: COLORS.primary,
    fontWeight: '600',
    marginLeft: 8,
  },
  attachmentCard: {
    padding: 12,
  },
  attachmentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attachmentName: {
    flex: 1,
    fontSize: SIZES.md,
    color: COLORS.textPrimary,
    marginLeft: 12,
    marginRight: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
  },
  saveButton: {
    flex: 2,
  },
});

export default AddTransactionScreen;