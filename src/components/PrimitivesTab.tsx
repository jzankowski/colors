import { useState } from 'react'
import { makeStyles, tokens } from '@fluentui/react-components'

// Color utility functions (same as other components)
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

// Determine interaction pattern based on step mapping
function shouldUseDarken(step: number): boolean {
  return step === 70 || step === 80 || step > 100
}

// Get contrast ratio text for each level
function getContrastRatioText(level: number): string {
  switch (level) {
    case 0: return '10 - 21:1' // Only for Neutral level 0
    case 1: return '60 - 7:1'
    case 2: return '80 - 4.5:1'
    case 3: return '100 - 3:1'
    case 4: return '130 - 1.3:1'
    case 5: return '140 - 1.2:1'
    case 6: return '150 - 1.1:1'
    default: return ''
  }
}

const useStyles = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: tokens.spacingHorizontalL,
    alignItems: 'start',
  },
  categoryColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
  },
  categoryTitle: {
    fontSize: '18px',
    fontWeight: '600',
    margin: '0 0 16px 0',
    color: '#242424',
    borderBottom: `2px solid ${tokens.colorNeutralStroke1}`,
    paddingBottom: tokens.spacingVerticalXS,
  },
  colorRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
    marginBottom: tokens.spacingVerticalS,
  },
  colorTitle: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    margin: 0,
    color: tokens.colorNeutralForeground1,
  },
  colorSample: {
    width: '100%',
    height: '60px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: tokens.fontWeightSemibold,
    borderRadius: tokens.borderRadiusMedium,
    cursor: 'pointer',
    transition: 'background-color 0.15s ease-in-out',
    gap: '2px',
  },
  hexValue: {
    fontSize: '10px',
    fontFamily: 'monospace',
    opacity: 0.9,
  },
})

// Primitive colors based on Global (Bebop) colors from variables.json
const primitiveColors = [
  // Neutral primitives (0-6)
  { category: 'Neutral', level: 0, step: 10, color: '#242424', label: '0' },
  { category: 'Neutral', level: 1, step: 60, color: '#5d5d5d', label: '1' },
  { category: 'Neutral', level: 2, step: 80, color: '#6f6f6f', label: '2' },
  { category: 'Neutral', level: 3, step: 100, color: '#929292', label: '3' },
  { category: 'Neutral', level: 4, step: 130, color: '#dedede', label: '4' },
  { category: 'Neutral', level: 5, step: 140, color: '#ebebeb', label: '5' },
  { category: 'Neutral', level: 6, step: 150, color: '#f5f5f5', label: '6' },
  
  // Danger primitives (1-6)
  { category: 'Danger', level: 1, step: 60, color: '#aa1546', label: '1' },
  { category: 'Danger', level: 2, step: 80, color: '#c02d56', label: '2' },
  { category: 'Danger', level: 3, step: 100, color: '#e2617b', label: '3' },
  { category: 'Danger', level: 4, step: 130, color: '#ffd0d6', label: '4' },
  { category: 'Danger', level: 5, step: 140, color: '#ffe3e6', label: '5' },
  { category: 'Danger', level: 6, step: 150, color: '#fff1f3', label: '6' },
  
  // Warning primitives (1-6) 
  { category: 'Warning', level: 1, step: 60, color: '#a93901', label: '1' },
  { category: 'Warning', level: 2, step: 80, color: '#cd4808', label: '2' },
  { category: 'Warning', level: 3, step: 100, color: '#e2693c', label: '3' },
  { category: 'Warning', level: 4, step: 130, color: '#ffd3c4', label: '4' },
  { category: 'Warning', level: 5, step: 140, color: '#ffe5dc', label: '5' },
  { category: 'Warning', level: 6, step: 150, color: '#fff2ee', label: '6' },
  
  // Success primitives (1-6)
  { category: 'Success', level: 1, step: 60, color: '#017048', label: '1' },
  { category: 'Success', level: 2, step: 80, color: '#008455', label: '2' },
  { category: 'Success', level: 3, step: 100, color: '#05ad72', label: '3' },
  { category: 'Success', level: 4, step: 130, color: '#b9eccf', label: '4' },
  { category: 'Success', level: 5, step: 140, color: '#d0f6e0', label: '5' },
  { category: 'Success', level: 6, step: 150, color: '#e7fbef', label: '6' },
]

export function PrimitivesTab() {
  const styles = useStyles()
  const [hoveredColor, setHoveredColor] = useState<string | null>(null)
  const [pressedColor, setPressedColor] = useState<string | null>(null)

  // Group colors by category
  const groupedColors = primitiveColors.reduce((acc, colorInfo) => {
    if (!acc[colorInfo.category]) {
      acc[colorInfo.category] = []
    }
    acc[colorInfo.category].push(colorInfo)
    return acc
  }, {} as Record<string, typeof primitiveColors>)

  return (
    <div className={styles.container}>
      {Object.entries(groupedColors).map(([category, colors]) => (
        <div key={category} className={styles.categoryColumn}>
          <h2 className={styles.categoryTitle}>{category}</h2>
          {colors.map((colorInfo) => {
            const uniqueKey = `${colorInfo.category}-${colorInfo.level}`
            const isHovered = hoveredColor === uniqueKey
            const isPressed = pressedColor === uniqueKey
            
            let displayColor = colorInfo.color
            if (isPressed) {
              displayColor = shouldUseDarken(colorInfo.step) 
                ? darkenColor(colorInfo.color, 6) 
                : lightenColor(colorInfo.color, 6)
            } else if (isHovered) {
              displayColor = shouldUseDarken(colorInfo.step) 
                ? darkenColor(colorInfo.color, 3) 
                : lightenColor(colorInfo.color, 3)
            }
            
            const textColor = ['#ffffff', '#fcfcfc', '#fff1f3', '#fff2ee', '#e7fbef', '#f5f5f5', '#dedede', '#ebebeb', '#ffd0d6', '#ffe3e6', '#ffd3c4', '#ffe5dc', '#b9eccf', '#d0f6e0'].includes(colorInfo.color)
              ? '#424242'
              : '#ffffff'
            
            return (
              <div key={uniqueKey} className={styles.colorRow}>
                <h3 className={styles.colorTitle}>{colorInfo.label}</h3>
                <div
                  className={styles.colorSample}
                  style={{ 
                    backgroundColor: displayColor,
                    color: textColor
                  }}
                  onMouseEnter={() => setHoveredColor(uniqueKey)}
                  onMouseLeave={() => setHoveredColor(null)}
                  onMouseDown={() => setPressedColor(uniqueKey)}
                  onMouseUp={() => setPressedColor(null)}
                >
                  <div>{getContrastRatioText(colorInfo.level)}</div>
                  <div className={styles.hexValue}>{displayColor.toUpperCase()}</div>
                </div>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}