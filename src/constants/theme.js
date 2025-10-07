// ============================================
// TEMA E CONSTANTES DE ESTILO
// ============================================

export const COLORS = {
  // Cores principais
  primary: '#6366F1',
  primaryDark: '#4F46E5',
  primaryLight: '#818CF8',
  
  // Cores secundárias
  secondary: '#EC4899',
  secondaryDark: '#DB2777',
  secondaryLight: '#F472B6',
  
  // Cores de status
  success: '#10B981',
  successLight: '#34D399',
  error: '#EF4444',
  errorLight: '#F87171',
  warning: '#F59E0B',
  warningLight: '#FBBF24',
  info: '#3B82F6',
  infoLight: '#60A5FA',
  
  // Cores de receita e despesa
  income: '#10B981',
  incomeLight: '#D1FAE5',
  expense: '#EF4444',
  expenseLight: '#FEE2E2',
  
  // Cores neutras
  white: '#FFFFFF',
  black: '#000000',
  
  // Tons de cinza
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
  
  // Cores de fundo
  background: '#F9FAFB',
  backgroundDark: '#111827',
  surface: '#FFFFFF',
  surfaceDark: '#1F2937',
  
  // Cores de texto
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textLight: '#9CA3AF',
  textWhite: '#FFFFFF',
  
  // Cores de borda
  border: '#E5E7EB',
  borderDark: '#374151',
  
  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
};

export const SIZES = {
  // Tamanhos de fonte
  xs: 10,
  sm: 12,
  base: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  
  // Espaçamentos
  padding: 16,
  margin: 16,
  
  // Raio de borda
  radiusXs: 4,
  radiusSm: 8,
  radiusMd: 12,
  radiusLg: 16,
  radiusXl: 24,
  radiusFull: 9999,
  
  // Tamanhos de ícones
  iconXs: 16,
  iconSm: 20,
  iconMd: 24,
  iconLg: 32,
  iconXl: 48,
  
  // Tamanhos de botões
  buttonHeight: 48,
  buttonHeightSm: 36,
  buttonHeightLg: 56,
  
  // Tamanhos de input
  inputHeight: 48,
  inputHeightSm: 36,
  inputHeightLg: 56,
};

export const FONTS = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
  semiBold: 'System',
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
};

// Categorias padrão com ícones e cores
export const DEFAULT_CATEGORIES = {
  expense: [
    { name: 'Alimentação', icon: '🍔', color: '#F59E0B' },
    { name: 'Transporte', icon: '🚗', color: '#3B82F6' },
    { name: 'Moradia', icon: '🏠', color: '#8B5CF6' },
    { name: 'Saúde', icon: '⚕️', color: '#EF4444' },
    { name: 'Educação', icon: '📚', color: '#10B981' },
    { name: 'Lazer', icon: '🎮', color: '#EC4899' },
    { name: 'Compras', icon: '🛍️', color: '#F97316' },
    { name: 'Contas', icon: '📄', color: '#6366F1' },
  ],
  income: [
    { name: 'Salário', icon: '💰', color: '#10B981' },
    { name: 'Freelance', icon: '💼', color: '#3B82F6' },
    { name: 'Investimentos', icon: '📈', color: '#8B5CF6' },
    { name: 'Outros', icon: '💵', color: '#6366F1' },
  ],
};

// Opções de cores para categorias personalizadas
export const CATEGORY_COLORS = [
  '#6366F1', // Indigo
  '#EC4899', // Pink
  '#10B981', // Green
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#3B82F6', // Blue
  '#8B5CF6', // Purple
  '#F97316', // Orange
  '#14B8A6', // Teal
  '#06B6D4', // Cyan
];

// Opções de ícones para categorias personalizadas
export const CATEGORY_ICONS = [
  '🍔', '🚗', '🏠', '⚕️', '📚', '🎮', '🛍️', '📄',
  '💰', '💼', '📈', '💵', '✈️', '🎬', '☕', '🎵',
  '💪', '🐕', '🌱', '🔧', '📱', '💻', '🎨', '📷',
];

export default {
  COLORS,
  SIZES,
  FONTS,
  SHADOWS,
  DEFAULT_CATEGORIES,
  CATEGORY_COLORS,
  CATEGORY_ICONS,
};