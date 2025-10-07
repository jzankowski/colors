import { useState } from 'react'
import { makeStyles, tokens } from '@fluentui/react-components'

// Color utility functions for cross-browser support
function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h /= 6
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
}

function hslToHex(h: number, s: number, l: number): string {
  h = h / 360
  s = s / 100
  l = l / 100

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1/6) return p + (q - p) * 6 * t
    if (t < 1/2) return q
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
    return p
  }

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q
  const r = hue2rgb(p, q, h + 1/3)
  const g = hue2rgb(p, q, h)
  const b = hue2rgb(p, q, h - 1/3)

  return `#${Math.round(r * 255).toString(16).padStart(2, '0')}${Math.round(g * 255).toString(16).padStart(2, '0')}${Math.round(b * 255).toString(16).padStart(2, '0')}`
}

function lightenColor(hex: string, percentage: number): string {
  const [h, s, l] = hexToHsl(hex)
  const newL = Math.min(100, l + percentage)
  return hslToHex(h, s, newL)
}

function darkenColor(hex: string, percentage: number): string {
  const [h, s, l] = hexToHsl(hex)
  const newL = Math.max(0, l - percentage)
  return hslToHex(h, s, newL)
}

// Convert hex to RGB
function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return [r, g, b]
}

// Calculate relative luminance
function getRelativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex)
  
  const sRGB = [r, g, b].map(c => {
    c = c / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })
  
  return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2]
}

// Calculate contrast ratio between two colors
function getContrastRatio(color1: string, color2: string): number {
  const lum1 = getRelativeLuminance(color1)
  const lum2 = getRelativeLuminance(color2)
  
  const brightest = Math.max(lum1, lum2)
  const darkest = Math.min(lum1, lum2)
  
  return (brightest + 0.05) / (darkest + 0.05)
}

const useStyles = makeStyles({
  scaleContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: tokens.spacingHorizontalXS,
    flexWrap: 'wrap',
  },
  scaleStep: {
    width: '80px',
    height: '95px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase200,
    borderRadius: tokens.borderRadiusMedium,
    cursor: 'pointer',
    transition: 'background-color 0.15s ease-in-out',
    padding: tokens.spacingVerticalXS,
  },
  stepNumber: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightBold,
    marginBottom: '2px',
  },
  hexValue: {
    fontSize: '9px',
    lineHeight: '1',
    textAlign: 'center',
    opacity: 0.9,
    fontFamily: 'monospace',
    marginBottom: '2px',
  },
  contrastInfo: {
    fontSize: '10px',
    lineHeight: '1.1',
    textAlign: 'center',
    opacity: 0.9,
  },
})

interface ColorScaleProps {
  name: string
  colors: Record<string, string>
}

type ColorScaleData = Record<string, string>

// Global (Bebop) color values from variables.json
const colorScales: Record<string, ColorScaleData> = {
  'Red (10)': {
    '10': '#3b171e',
    '20': '#4d1a25',
    '30': '#661b2e',
    '40': '#801936',
    '50': '#9b1640',
    '60': '#aa1546',
    '70': '#b4174a',
    '80': '#c02d56',
    '90': '#d14164',
    '100': '#e2617b',
    '110': '#f38a9b',
    '120': '#ffadb9',
    '130': '#ffd0d6',
    '140': '#ffe3e6',
    '150': '#fff1f3',
    '160': '#fffafb',
  },
  'Orange (40)': {
    '10': '#4d1d0b',
    '20': '#662003',
    '30': '#7c2801',
    '40': '#923001',
    '50': '#a03500',
    '60': '#a93901',
    '70': '#bb4001',
    '80': '#cd4808',
    '90': '#cd4808',
    '100': '#e2693c',
    '110': '#f2906e',
    '120': '#ffb297',
    '130': '#ffd3c4',
    '140': '#ffe5dc',
    '150': '#fff2ee',
    '160': '#fffbf9',
  },
  'Green (160)': {
    '10': '#062014',
    '20': '#013822',
    '30': '#00472c',
    '40': '#025636',
    '50': '#016641',
    '60': '#017048',
    '70': '#03764c',
    '80': '#008455',
    '90': '#008e5c',
    '100': '#05ad72',
    '110': '#5ac692',
    '120': '#8cdbb1',
    '130': '#b9eccf',
    '140': '#d0f6e0',
    '150': '#e7fbef',
    '160': '#f4fff9',
  },
  'Neutral': {
    '10': '#242424',
    '20': '#2e2e2e',
    '30': '#3a3a3a',
    '40': '#484848',
    '50': '#555555',
    '60': '#5d5d5d',
    '70': '#636363',
    '80': '#6f6f6f',
    '90': '#777777',
    '100': '#929292',
    '110': '#aeaeae',
    '120': '#c7c7c7',
    '130': '#dedede',
    '140': '#ebebeb',
    '150': '#f5f5f5',
    '160': '#fcfcfc',
  },
}

export function ColorScale({ name, colors }: ColorScaleProps) {
  const styles = useStyles()
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)
  const [pressedStep, setPressedStep] = useState<number | null>(null)
  
  // Get the color scale for this name
  const scaleColors = colorScales[name as keyof typeof colorScales] || colors
  
  // Generate steps from 10 to 160 in increments of 10
  const steps = Array.from({ length: 16 }, (_, i) => (i + 1) * 10)

  return (
    <div className={styles.scaleContainer}>
      {steps.map((step) => {
        const stepKey = step.toString()
        const baseColor = scaleColors[stepKey] || '#cccccc'
        const textColor = step <= 80 ? 'white' : 'black'
        
        // Calculate the display color based on interaction state
        let displayColor = baseColor
        if (pressedStep === step) {
          if (step === 70 || step === 80 || step > 100) {
            displayColor = darkenColor(baseColor, 6) // 6% darker when pressed for light colors
          } else {
            displayColor = lightenColor(baseColor, 6) // 6% lighter when pressed for dark colors
          }
        } else if (hoveredStep === step) {
          if (step === 70 || step === 80 || step > 100) {
            displayColor = darkenColor(baseColor, 3) // 3% darker when hovered for light colors
          } else {
            displayColor = lightenColor(baseColor, 3) // 3% lighter when hovered for dark colors
          }
        }

        // Calculate contrast ratios for current display color
        const contrastVsWhite = getContrastRatio(displayColor, '#ffffff')
        const contrastVsBlack = getContrastRatio(displayColor, '#000000')
        
        return (
          <div
            key={step}
            className={styles.scaleStep}
            style={{
              backgroundColor: displayColor,
              color: textColor,
            }}
            onMouseEnter={() => setHoveredStep(step)}
            onMouseLeave={() => {
              setHoveredStep(null)
              setPressedStep(null)
            }}
            onMouseDown={() => setPressedStep(step)}
            onMouseUp={() => setPressedStep(null)}
          >
            <div className={styles.stepNumber}>{step}</div>
            <div className={styles.hexValue}>{displayColor.toUpperCase()}</div>
            <div className={styles.contrastInfo}>
              <div>W: {contrastVsWhite.toFixed(1)}</div>
              <div>B: {contrastVsBlack.toFixed(1)}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}