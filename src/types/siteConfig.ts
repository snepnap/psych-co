// Site Configuration Types
export interface Branding {
  logoUrl?: string;
  faviconUrl?: string;
  name: string;
  tagline?: string;
}

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  muted: string;
  // Semantic colors
  success: string;
  warning: string;
  error: string;
  info: string;
}

export interface Typography {
  fontFamily: string;
  fontSizeBase: string;
  fontWeightLight: number;
  fontWeightNormal: number;
  fontWeightBold: number;
  headingFontFamily?: string;
}

export interface SectionToggles {
  hero: boolean;
  features: boolean;
  pricing: boolean;
  cta: boolean;
  footer: boolean;
}

export interface SiteConfig {
  branding: Branding;
  colors: ColorPalette;
  typography: Typography;
  sections: SectionToggles;
  // Additional configuration can be added here
  navigation?: {
    items: Array<{
      label: string;
      href: string;
      external?: boolean;
    }>;
  };
  socialLinks?: Array<{
    platform: string;
    url: string;
    icon?: string;
  }>;
}

// Default site configuration
export const defaultSiteConfig: SiteConfig = {
  branding: {
    logoUrl: '',
    faviconUrl: '',
    name: 'Psych Co.',
    tagline: 'Mental Health Services'
  },
  colors: {
    primary: '#4F46E5', // Indigo 600
    secondary: '#10B981', // Emerald 500
    accent: '#F59E0B', // Amber 500
    background: '#F9FAFB', // Gray 50
    text: '#111827', // Gray 900
    muted: '#6B7280', // Gray 500
    // Semantic colors
    success: '#10B981', // Emerald 500
    warning: '#F59E0B', // Amber 500
    error: '#EF4444', // Red 500
    info: '#3B82F6' // Blue 500
  },
  typography: {
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
    fontSizeBase: '16px',
    fontWeightLight: 300,
    fontWeightNormal: 400,
    fontWeightBold: 700,
    headingFontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif'
  },
  sections: {
    hero: true,
    features: true,
    pricing: true,
    cta: true,
    footer: true
  },
  navigation: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/services' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' }
    ]
  },
  socialLinks: [
    { platform: 'twitter', url: '#', icon: 'Twitter' },
    { platform: 'linkedin', url: '#', icon: 'LinkedIn' },
    { platform: 'facebook', url: '#', icon: 'Facebook' },
    { platform: 'instagram', url: '#', icon: 'Instagram' }
  ]
};