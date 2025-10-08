import { makeStyles, tokens } from '@fluentui/react-components'
import { PersonRegular, AlertRegular, CheckmarkRegular } from '@fluentui/react-icons'

// Color utility functions (same as ColorScale)
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

// Map each color to its equivalent step in the color scale for appropriate interactions
function getColorStepEquivalent(hex: string): number {
  // Map based on the actual color values from variables.json
  const colorStepMap: Record<string, number> = {
    // Neutral colors (steps 10-160)
    '#242424': 10,  // Neutral 10
    '#5d5d5d': 60,  // Neutral 60  
    '#6f6f6f': 80,  // Neutral 80
    '#929292': 100, // Neutral 100
    '#dedede': 130, // Neutral 130
    '#f5f5f5': 150, // Neutral 150
    '#fcfcfc': 160, // Neutral 160
    '#ffffff': 170, // White (beyond scale, use darken)
    
    // Red colors (steps 10-160)
    '#aa1546': 60,  // Red 60
    '#c02d56': 80,  // Red 80
    '#e2617b': 100, // Red 100
    '#ffd0d6': 130, // Red 130
    '#ffe3e6': 140, // Red 140
    '#fff1f3': 150, // Red 150
    
    // Orange colors (steps 10-160)
    '#a93901': 60,  // Orange 60
    '#cd4808': 80,  // Orange 80/90
    '#f2906e': 110, // Orange 110
    '#ffd3c4': 130, // Orange 130
    '#ffe5dc': 140, // Orange 140
    '#fff2ee': 150, // Orange 150
    
    // Green colors (steps 10-160)
    '#017048': 60,  // Green 60
    '#008455': 80,  // Green 80
    '#5ac692': 110, // Green 110
    '#b9eccf': 130, // Green 130
    '#d0f6e0': 140, // Green 140
    '#e7fbef': 150, // Green 150
    
    // Brand colors (steps 10-160)
    '#3641bc': 50,  // Brand 50 - dark brand blue
    '#4858eb': 80,  // Brand 80 - medium brand blue
    '#92a8ff': 110, // Brand 110 - light brand blue
    '#d3ddff': 130, // Brand 130 - very light brand blue (should darken)
    '#e4ebff': 140, // Brand 140 - very light brand blue (should darken)
    '#f2f5ff': 150, // Brand 150 - lightest brand blue (should darken)
  }
  
  return colorStepMap[hex.toLowerCase()] || 90 // Default to 90 if not found
}

// Use the same interaction logic as ColorScale
function shouldUseDarken(hex: string): boolean {
  const step = getColorStepEquivalent(hex)
  // Match ColorScale logic: lighter colors (step >= 110) should darken
  return step >= 110
}

const useStyles = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: tokens.spacingVerticalM,
    padding: tokens.spacingVerticalM,
  },
  categoryColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
  },
  categoryTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    textAlign: 'left',
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
  statesContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: tokens.spacingHorizontalXS,
  },
  stateColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: tokens.spacingVerticalXXS,
  },
  stateLabel: {
    fontSize: tokens.fontSizeBase100,
    fontWeight: tokens.fontWeightMedium,
    color: tokens.colorNeutralForeground2,
    textAlign: 'center',
  },
  colorSample: {
    width: '100%',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: tokens.fontWeightSemibold,
    borderRadius: tokens.borderRadiusMedium,
    fontSize: tokens.fontSizeBase100,
  },
  foregroundSample: {
    width: '100%',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.spacingHorizontalXXS,
    backgroundColor: '#ffffff',
    borderRadius: tokens.borderRadiusMedium,
    fontSize: tokens.fontSizeBase100,
  },
  hexValue: {
    fontSize: tokens.fontSizeBase100,
    color: tokens.colorNeutralForeground3,
    textAlign: 'center',
    fontFamily: 'monospace',
  },
})

// Using colors from the Generic (Bebop) section in variables.json
const genericColors = [
  // Surface colors
  { category: 'Surface', name: 'Neutral Primary', color: '#ffffff', label: 'Neutral Primary' },
  { category: 'Surface', name: 'Neutral Secondary', color: '#fcfcfc', label: 'Neutral Secondary' },
  
  { category: 'Surface', name: 'Status Brand', color: '#F2F5FF', label: 'Brand' },
  { category: 'Surface', name: 'Status Danger', color: '#fff1f3', label: 'Danger' },
  { category: 'Surface', name: 'Status Warning', color: '#fff2ee', label: 'Warning' },
  { category: 'Surface', name: 'Status Success', color: '#e7fbef', label: 'Success' },
  
  // Background colors
  { category: 'Background', name: 'Neutral Heavy Rest', color: '#242424', label: 'Neutral Heavy' },
  { category: 'Background', name: 'Neutral Loud', color: '#6f6f6f', label: 'Neutral Loud' },
  { category: 'Background', name: 'Neutral Soft', color: '#dedede', label: 'Neutral Soft' },
  { category: 'Background', name: 'Neutral Subtle', color: '#f5f5f5', label: 'Neutral Subtle' },
  { category: 'Background', name: 'Status Brand Loud', color: '#4858EB', label: 'Brand Loud' },
  { category: 'Background', name: 'Status Brand Soft', color: '#D3DDff', label: 'Brand Soft' },
  { category: 'Background', name: 'Status Brand Subtle', color: '#E4EBFF', label: 'Brand Subtle' },
  { category: 'Background', name: 'Status Danger Loud', color: '#c02d56', label: 'Danger Loud' },
  { category: 'Background', name: 'Status Danger Soft', color: '#ffd0d6', label: 'Danger Soft' },
  { category: 'Background', name: 'Status Danger Subtle', color: '#ffe3e6', label: 'Danger Subtle' },
  { category: 'Background', name: 'Status Warning Loud', color: '#cd4808', label: 'Warning Loud' },
  { category: 'Background', name: 'Status Warning Soft', color: '#ffd3c4', label: 'Warning Soft' },
  { category: 'Background', name: 'Status Warning Subtle', color: '#ffe5dc', label: 'Warning Subtle' },
  { category: 'Background', name: 'Status Success Loud', color: '#008455', label: 'Success Loud' },
  { category: 'Background', name: 'Status Success Soft', color: '#b9eccf', label: 'Success Soft' },
  { category: 'Background', name: 'Status Success Subtle', color: '#d0f6e0', label: 'Success Subtle' },
  
  // Border colors  
  { category: 'Border', name: 'Neutral Primary', color: '#6f6f6f', label: 'Neutral Primary' },
  { category: 'Border', name: 'Neutral Secondary', color: '#929292', label: 'Neutral Secondary' },
  { category: 'Border', name: 'Neutral Tertiary', color: '#dedede', label: 'Neutral Tertiary' },
  { category: 'Border', name: 'Status Brand Primary', color: '#4858EB', label: 'Brand Primary' },
  { category: 'Border', name: 'Status Brand Secondary', color: '#92A8FF', label: 'Brand Secondary' },
  { category: 'Border', name: 'Status Brand Tertiary', color: '#D3DDff', label: 'Brand Tertiary' },
  { category: 'Border', name: 'Status Danger Primary', color: '#c02d56', label: 'Danger Primary' },
  { category: 'Border', name: 'Status Danger Secondary', color: '#e2617b', label: 'Danger Secondary' },
  { category: 'Border', name: 'Status Danger Tertiary', color: '#ffd0d6', label: 'Danger Tertiary' },
  { category: 'Border', name: 'Status Warning Primary', color: '#cd4808', label: 'Warning Primary' },
  { category: 'Border', name: 'Status Warning Secondary', color: '#f2906e', label: 'Warning Secondary' },
  { category: 'Border', name: 'Status Warning Tertiary', color: '#ffd3c4', label: 'Warning Tertiary' },
  { category: 'Border', name: 'Status Success Primary', color: '#008455', label: 'Success Primary' },
  { category: 'Border', name: 'Status Success Secondary', color: '#5ac692', label: 'Success Secondary' },
  { category: 'Border', name: 'Status Success Tertiary', color: '#b9eccf', label: 'Success Tertiary' },
  
  // Foreground colors
  { category: 'Foreground', name: 'Text Primary', color: '#242424', label: 'Primary' },
  { category: 'Foreground', name: 'Text Secondary', color: '#5d5d5d', label: 'Secondary' },
  { category: 'Foreground', name: 'Text Placeholder', color: '#929292', label: 'Placeholder' },
  { category: 'Foreground', name: 'Status Brand Text', color: '#3641BC', label: 'Primary' },
  { category: 'Foreground', name: 'Status Brand Icon', color: '#4858EB', label: 'Secondary' },
  { category: 'Foreground', name: 'Status Danger Text', color: '#aa1546', label: 'Primary' },
  { category: 'Foreground', name: 'Status Danger Icon', color: '#c02d56', label: 'Secondary' },
  { category: 'Foreground', name: 'Status Warning Text', color: '#a93901', label: 'Primary' },
  { category: 'Foreground', name: 'Status Warning Icon', color: '#cd4808', label: 'Secondary' },
  { category: 'Foreground', name: 'Status Success Text', color: '#017048', label: 'Primary' },
  { category: 'Foreground', name: 'Status Success Icon', color: '#008455', label: 'Secondary' },
]

export function GenericColorsTab() {
  const styles = useStyles()

  // Group colors by category
  const groupedColors = genericColors.reduce((acc, colorInfo) => {
    if (!acc[colorInfo.category]) {
      acc[colorInfo.category] = []
    }
    acc[colorInfo.category].push(colorInfo)
    return acc
  }, {} as Record<string, typeof genericColors>)

  return (
    <div className={styles.container}>
      {Object.entries(groupedColors).map(([category, colors]) => (
        <div key={category} className={styles.categoryColumn}>
          <h2 className={styles.categoryTitle}>{category}</h2>
          {colors.map((colorInfo) => {
            const restColor = colorInfo.color
            const hoverColor = shouldUseDarken(colorInfo.color) 
              ? darkenColor(colorInfo.color, 3) 
              : lightenColor(colorInfo.color, 6)
            const pressedColor = shouldUseDarken(colorInfo.color) 
              ? darkenColor(colorInfo.color, 6) 
              : lightenColor(colorInfo.color, 3)

            const states = [
              { label: 'Rest', color: restColor },
              { label: 'Hover', color: hoverColor },
              { label: 'Pressed', color: pressedColor }
            ]
            
            // Choose appropriate icon based on color type
            const getIcon = () => {
              if (colorInfo.name.includes('Danger')) return <AlertRegular />
              if (colorInfo.name.includes('Success')) return <CheckmarkRegular />
              return <PersonRegular />
            }

            return (
              <div key={`${colorInfo.category}-${colorInfo.label}`} className={styles.colorRow}>
                <h3 className={styles.colorTitle}>{colorInfo.label}</h3>
                <div className={styles.statesContainer}>
                  {states.map((state) => {
                    const currentTextColor = ['#ffffff', '#fcfcfc', '#fff1f3', '#fff2ee', '#e7fbef', '#f5f5f5', '#dedede', '#F2F5FF', '#D3DDff', '#E4EBFF', '#92A8FF', '#b4c5ff', '#d3ddff', '#e4ebff', '#f2f5ff'].includes(state.color.toLowerCase())
                      ? '#424242'
                      : '#ffffff'

                    return (
                      <div key={state.label} className={styles.stateColumn}>
                        <div className={styles.stateLabel}>{state.label}</div>
                        {colorInfo.category === 'Foreground' ? (
                          <div
                            className={styles.foregroundSample}
                          >
                            <div style={{ color: state.color, fontSize: '16px' }}>
                              {getIcon()}
                            </div>
                            <span style={{ color: state.color, fontWeight: tokens.fontWeightSemibold }}>
                              Text
                            </span>
                          </div>
                        ) : (
                          <div
                            className={styles.colorSample}
                            style={colorInfo.category === 'Border' ? {
                              backgroundColor: 'transparent',
                              border: `2px solid ${state.color}`,
                              color: '#242424',
                            } : { 
                              backgroundColor: state.color,
                              color: currentTextColor
                            }}
                          >
                          </div>
                        )}
                        <div className={styles.hexValue}>{state.color.toUpperCase()}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}