'use client';

import { Brand } from '@/lib/models/brands';
import React, { createContext, useContext, useEffect } from 'react';

interface ThemeContextValue {
    brand: Brand;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('ThemeProvider missing');
    return context;
}

interface ThemeProviderProps {
    brand: Brand;
    children: React.ReactNode;
}

export function ThemeProvider({ brand, children }: ThemeProviderProps) { 
    
    useEffect(() => {
        const body = document.body;

        // Set CSS variables for brand colors dynamically
        body.style.setProperty('--brand-primary-color', brand.primaryColor);
        body.style.setProperty('--brand-secondary-color', brand.secondaryColor);
        body.style.setProperty('--brand-button-color', brand.buttonColor);
        body.style.setProperty('--brand-buttonText-color', brand.buttonTextColor);
        body.style.setProperty('--brand-label-color', brand.labelColor);
    }, [brand])
    
    return (
        <ThemeContext.Provider value={{ brand }}>
            <div
                style={{
                    backgroundColor: brand.secondaryColor,
                    color: brand.primaryColor,
                }}
            >
                {children}
            </div>
        </ThemeContext.Provider>
    );
}