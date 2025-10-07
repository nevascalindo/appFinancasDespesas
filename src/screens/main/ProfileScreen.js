import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { COLORS, SIZES } from '../../constants/theme';

const ProfileScreen = ({ navigation }) => {
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(false);

  // -- Realizar logout do usuário
  const handleLogout = () => {
    Alert.alert(
      'Sair da Conta',
      'Tem certeza que deseja sair?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              await signOut();
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível sair da conta');
              console.error('Erro ao fazer logout:', error);
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  // -- Extrair dados do usuário
  const fullName = user?.user_metadata?.full_name || 'Usuário';
  const email = user?.email || '';
  const initials = fullName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.title}>Perfil</Text>
          <View style={{ width: 40 }} />
        </View>

        <Card style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
          </View>
          <Text style={styles.userName}>{fullName}</Text>
          <Text style={styles.userEmail}>{email}</Text>
        </Card>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conta</Text>

          <Card style={styles.optionCard}>
            <TouchableOpacity style={styles.option}>
              <View style={styles.optionLeft}>
                <View style={[styles.optionIcon, { backgroundColor: COLORS.primary + '20' }]}>
                  <Ionicons name="person-outline" size={20} color={COLORS.primary} />
                </View>
                <Text style={styles.optionText}>Informações da Conta</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.gray400} />
            </TouchableOpacity>
          </Card>

          <Card style={styles.optionCard}>
            <TouchableOpacity style={styles.option}>
              <View style={styles.optionLeft}>
                <View style={[styles.optionIcon, { backgroundColor: COLORS.warning + '20' }]}>
                  <Ionicons name="settings-outline" size={20} color={COLORS.warning} />
                </View>
                <Text style={styles.optionText}>Configurações</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.gray400} />
            </TouchableOpacity>
          </Card>

          <Card style={styles.optionCard}>
            <TouchableOpacity style={styles.option}>
              <View style={styles.optionLeft}>
                <View style={[styles.optionIcon, { backgroundColor: COLORS.info + '20' }]}>
                  <Ionicons name="help-circle-outline" size={20} color={COLORS.info} />
                </View>
                <Text style={styles.optionText}>Ajuda e Suporte</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.gray400} />
            </TouchableOpacity>
          </Card>
        </View>

        <View style={styles.logoutSection}>
          <Button
            title="Sair da Conta"
            onPress={handleLogout}
            variant="outline"
            loading={loading}
            icon={<Ionicons name="log-out-outline" size={20} color={COLORS.expense} />}
            style={styles.logoutButton}
            textStyle={styles.logoutButtonText}
          />
        </View>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Versão 1.0.0</Text>
          <Text style={styles.versionSubtext}>App Finanças Pessoais</Text>
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
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.margin * 2,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: SIZES.xxl,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  profileCard: {
    alignItems: 'center',
    paddingVertical: SIZES.padding * 2,
    marginBottom: SIZES.margin * 2,
  },
  avatarContainer: {
    marginBottom: SIZES.margin,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 36,
    fontWeight: '700',
    color: COLORS.white,
  },
  userName: {
    fontSize: SIZES.xl,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
  },
  section: {
    marginBottom: SIZES.margin * 2,
  },
  sectionTitle: {
    fontSize: SIZES.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SIZES.margin,
  },
  optionCard: {
    marginBottom: SIZES.margin * 0.75,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionText: {
    fontSize: SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  logoutSection: {
    marginTop: SIZES.margin,
  },
  logoutButton: {
    borderColor: COLORS.expense,
  },
  logoutButtonText: {
    color: COLORS.expense,
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: SIZES.margin * 2,
  },
  versionText: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  versionSubtext: {
    fontSize: SIZES.xs,
    color: COLORS.gray400,
  },
});

export default ProfileScreen;