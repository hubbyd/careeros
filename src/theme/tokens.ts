// theme/tokens.ts — Design Tokens (JS 对象，供组件运行时读取)
export const tokens = {
  color: {
    primary: '#FF6B35',
    primaryLight: '#FF9F1C',
    primaryDark: '#E85D2F',
    gradientPrimary: 'linear-gradient(135deg, #FF6B35 0%, #FF9F1C 100%)',
    gradientEnergy: 'linear-gradient(135deg, #EF476F 0%, #FF6B35 50%, #FF9F1C 100%)',
    gradientSunrise: 'linear-gradient(135deg, #FF9F1C 0%, #FFD23F 100%)',
    accentGold: '#FFD23F',
    accentPink: '#EF476F',
    success: '#06D6A0',
    info: '#118AB2',
    purple: '#7B5EA7',
    dark: '#1A1A2E',
    text: '#2D3142',
    textSecondary: '#6B7280',
    textTertiary: '#9CA3AF',
    bg: '#FFF8F0',
    bgSoft: '#FFF3E6',
    surface: '#FFFFFF',
    surfaceAlt: '#FFF8F0',
    border: '#FFE5D0',
    borderSoft: '#FFF0E0',
  },
  fontSize: {
    xs: '11px',
    sm: '13px',
    base: '15px',
    md: '17px',
    lg: '20px',
    xl: '24px',
    xxl: '30px',
    xxxl: '38px',
  },
  spacing: {
    sp1: '4px',
    sp2: '8px',
    sp3: '12px',
    sp4: '16px',
    sp5: '20px',
    sp6: '24px',
    sp8: '32px',
  },
  radius: {
    sm: '8px',
    md: '14px',
    lg: '20px',
    xl: '28px',
    full: '999px',
  },
  shadow: {
    sm: '0 2px 8px rgba(255,107,53,0.06)',
    md: '0 6px 20px rgba(255,107,53,0.10)',
    lg: '0 12px 36px rgba(255,107,53,0.14)',
    glow: '0 4px 24px rgba(255,107,53,0.30)',
  },
} as const;

// 供 CSS Modules 使用的类名辅助
export const cls = (...classes: (string | false | undefined)[]) =>
  classes.filter(Boolean).join(' ');
