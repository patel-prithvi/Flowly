export const Colors = {
  light: {
    background: '#FAF7F2',
    surface: '#FFFFFF',
    surfaceVariant: '#F3EFEA',
    surfaceElevated: '#FFFFFF',
    textPrimary: '#2D2A26',
    textSecondary: '#78736C',
    textMuted: '#A09B93',
    border: '#EDE7DF',
    borderLight: '#F5F0E8',
    shadow: 'rgba(45, 42, 38, 0.06)',

    // Accent Colors
    primary: '#5B8266', // Sage green
    primaryLight: '#E8F0EA',
    secondary: '#E07A5F', // Soft peach
    secondaryLight: '#FCECE7',
    lavender: '#8B7BB8',
    lavenderLight: '#F0ECF7',
    amber: '#E5A93C',
    amberLight: '#FCF5E5',
    sky: '#508991',
    skyLight: '#E6F2F4',

    // Status
    success: '#5B8266',
    warning: '#E5A93C',
    danger: '#D9534F',
    
    // Category Colors
    categoryStudy: '#8B7BB8',
    categoryStudyBg: '#F0ECF7',
    categoryWork: '#508991',
    categoryWorkBg: '#E6F2F4',
    categoryHealth: '#5B8266',
    categoryHealthBg: '#E8F0EA',
    categoryPersonal: '#E07A5F',
    categoryPersonalBg: '#FCECE7',
  },
  dark: {
    background: '#161513',
    surface: '#211F1C',
    surfaceVariant: '#2B2824',
    surfaceElevated: '#282521',
    textPrimary: '#F7F4EF',
    textSecondary: '#A39E96',
    textMuted: '#6B665F',
    border: '#322E29',
    borderLight: '#2A2723',
    shadow: 'rgba(0, 0, 0, 0.3)',

    // Accent Colors
    primary: '#77A383',
    primaryLight: '#233327',
    secondary: '#E89078',
    secondaryLight: '#39251E',
    lavender: '#A596CF',
    lavenderLight: '#2A2438',
    amber: '#EFC168',
    amberLight: '#382F18',
    sky: '#6EAEC4',
    skyLight: '#1C3138',

    // Status
    success: '#77A383',
    warning: '#EFC168',
    danger: '#E57373',

    // Category Colors
    categoryStudy: '#A596CF',
    categoryStudyBg: '#2A2438',
    categoryWork: '#6EAEC4',
    categoryWorkBg: '#1C3138',
    categoryHealth: '#77A383',
    categoryHealthBg: '#233327',
    categoryPersonal: '#E89078',
    categoryPersonalBg: '#39251E',
  },
};

export const Typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    semibold: 'System',
    bold: 'System',
  },
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 22,
    xxl: 28,
    hero: 36,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
  round: 9999,
};
