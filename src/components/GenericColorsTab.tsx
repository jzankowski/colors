import { makeStyles, tokens } from '@fluentui/react-components'
import { PersonRegular, AlertRegular, CheckmarkRegular } from '@fluentui/react-icons'

// Map colors to their primitive levels for display
function getPrimitiveLevel(color: string): string {
  const colorToPrimitive: Record<string, string> = {
    // Neutral primitives
    '#242424': 'Neutral 0',
    '#5d5d5d': 'Neutral 1', 
    '#6f6f6f': 'Neutral 2',
    '#929292': 'Neutral 3',
    '#dedede': 'Neutral 4',
    '#ebebeb': 'Neutral 5',
    '#f5f5f5': 'Neutral 6',
    '#ffffff': 'White',
    '#fcfcfc': 'Neutral 7',
    
    // Brand primitives
    '#3B47CF': 'Brand 1',
    '#4858EB': 'Brand 2', 
    '#6D86FF': 'Brand 3',
    '#D3DDff': 'Brand 4',
    '#E4EBFF': 'Brand 5',
    '#F2F5FF': 'Brand 6',
    
    // Danger primitives
    '#aa1546': 'Danger 1',
    '#c02d56': 'Danger 2',
    '#e2617b': 'Danger 3', 
    '#ffd0d6': 'Danger 4',
    '#ffe3e6': 'Danger 5',
    '#fff1f3': 'Danger 6',
    
    // Warning primitives  
    '#a93901': 'Warning 1',
    '#cd4808': 'Warning 2',
    '#e2693c': 'Warning 3',
    '#ffd3c4': 'Warning 4', 
    '#ffe5dc': 'Warning 5',
    '#fff2ee': 'Warning 6',
    
    // Success primitives
    '#017048': 'Success 1',
    '#008455': 'Success 2',
    '#05ad72': 'Success 3',
    '#b9eccf': 'Success 4',
    '#d0f6e0': 'Success 5', 
    '#e7fbef': 'Success 6',
  }
  
  return colorToPrimitive[color] || ''
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
  { category: 'Border', name: 'Status Brand Secondary', color: '#6D86FF', label: 'Brand Secondary' },
  { category: 'Border', name: 'Status Brand Tertiary', color: '#D3DDff', label: 'Brand Tertiary' },
  { category: 'Border', name: 'Status Danger Primary', color: '#c02d56', label: 'Danger Primary' },
  { category: 'Border', name: 'Status Danger Secondary', color: '#e2617b', label: 'Danger Secondary' },
  { category: 'Border', name: 'Status Danger Tertiary', color: '#ffd0d6', label: 'Danger Tertiary' },
  { category: 'Border', name: 'Status Warning Primary', color: '#cd4808', label: 'Warning Primary' },
  { category: 'Border', name: 'Status Warning Secondary', color: '#e2693c', label: 'Warning Secondary' },
  { category: 'Border', name: 'Status Warning Tertiary', color: '#ffd3c4', label: 'Warning Tertiary' },
  { category: 'Border', name: 'Status Success Primary', color: '#008455', label: 'Success Primary' },
  { category: 'Border', name: 'Status Success Secondary', color: '#05ad72', label: 'Success Secondary' },
  { category: 'Border', name: 'Status Success Tertiary', color: '#b9eccf', label: 'Success Tertiary' },
  
  // Foreground colors
  { category: 'Foreground', name: 'Text Primary', color: '#242424', label: 'Primary' },
  { category: 'Foreground', name: 'Text Secondary', color: '#5d5d5d', label: 'Secondary' },
  { category: 'Foreground', name: 'Text Placeholder', color: '#929292', label: 'Placeholder' },
  { category: 'Foreground', name: 'Status Brand Text', color: '#3B47CF', label: 'Primary' },
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
            
            // Choose appropriate icon based on color type
            const getIcon = () => {
              if (colorInfo.name.includes('Danger')) return <AlertRegular />
              if (colorInfo.name.includes('Success')) return <CheckmarkRegular />
              return <PersonRegular />
            }

            const currentTextColor = ['#ffffff', '#fcfcfc', '#fff1f3', '#fff2ee', '#e7fbef', '#f5f5f5', '#dedede', '#F2F5FF', '#D3DDff', '#E4EBFF', '#92A8FF', '#b4c5ff', '#d3ddff', '#e4ebff', '#f2f5ff'].includes(restColor.toLowerCase())
              ? '#424242'
              : '#ffffff'

            return (
              <div key={`${colorInfo.category}-${colorInfo.label}`} className={styles.colorRow}>
                <h3 className={styles.colorTitle}>{colorInfo.label}</h3>
                {colorInfo.category === 'Foreground' ? (
                  <div>
                    <div
                      className={styles.foregroundSample}
                    >
                      <div style={{ color: restColor, fontSize: '16px' }}>
                        {getIcon()}
                      </div>
                      <span style={{ color: restColor, fontWeight: tokens.fontWeightSemibold }}>
                        Text
                      </span>
                    </div>
                    <div className={styles.hexValue}>
                      {restColor.toUpperCase()}
                      {getPrimitiveLevel(restColor) && ` • ${getPrimitiveLevel(restColor)}`}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div
                      className={styles.colorSample}
                      style={colorInfo.category === 'Border' ? {
                        backgroundColor: 'transparent',
                        border: `2px solid ${restColor}`,
                        color: '#242424',
                      } : { 
                        backgroundColor: restColor,
                        color: currentTextColor
                      }}
                    >
                    </div>
                    <div className={styles.hexValue}>
                      {restColor.toUpperCase()}
                      {getPrimitiveLevel(restColor) && ` • ${getPrimitiveLevel(restColor)}`}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}