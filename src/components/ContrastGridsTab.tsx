import { makeStyles, tokens } from '@fluentui/react-components'

// Calculate relative luminance
function getRelativeLuminance(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  
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

// Get contrast level indicator
function getContrastLevel(ratio: number): { level: string, color: string } {
  if (ratio >= 7) return { level: 'AAA', color: '#017048' }
  if (ratio >= 4.5) return { level: 'AA', color: '#a93901' }
  if (ratio >= 3) return { level: 'A', color: '#aa1546' }
  return { level: 'F', color: '#666666' }
}

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalL,
    padding: tokens.spacingVerticalM,
  },
  groupSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
  },
  groupTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightBold,
    margin: 0,
    color: tokens.colorNeutralForeground1,
    borderBottom: `2px solid ${tokens.colorNeutralStroke1}`,
    paddingBottom: tokens.spacingVerticalXS,
  },
  table: {
    borderCollapse: 'collapse',
    width: '100%',
    maxWidth: '800px',
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    overflow: 'hidden',
  },
  headerCell: {
    backgroundColor: tokens.colorNeutralBackground3,
    padding: tokens.spacingVerticalS,
    textAlign: 'center',
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase200,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    minWidth: '60px',
  },
  colorHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
  },
  colorSwatch: {
    width: '24px',
    height: '24px',
    borderRadius: tokens.borderRadiusSmall,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  colorLabel: {
    fontSize: tokens.fontSizeBase100,
    fontWeight: tokens.fontWeightMedium,
  },
  contrastCell: {
    padding: tokens.spacingVerticalXS,
    textAlign: 'center',
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    minWidth: '60px',
    minHeight: '40px',
  },
  contrastValue: {
    display: 'block',
    fontSize: tokens.fontSizeBase100,
    marginBottom: '2px',
  },
  contrastLevel: {
    display: 'inline-block',
    padding: '2px 4px',
    borderRadius: tokens.borderRadiusSmall,
    fontSize: '10px',
    fontWeight: tokens.fontWeightBold,
    color: 'white',
    minWidth: '20px',
  },
})

// Primitive color groups
const colorGroups = {
  Neutral: [
    { level: 0, color: '#242424', label: '0' },
    { level: 1, color: '#5d5d5d', label: '1' },
    { level: 2, color: '#6f6f6f', label: '2' },
    { level: 3, color: '#929292', label: '3' },
    { level: 4, color: '#dedede', label: '4' },
    { level: 5, color: '#ebebeb', label: '5' },
    { level: 6, color: '#f5f5f5', label: '6' },
  ],
  Brand: [
    { level: 1, color: '#3B47CF', label: '1' },
    { level: 2, color: '#4858EB', label: '2' },
    { level: 3, color: '#6D86FF', label: '3' },
    { level: 4, color: '#D3DDff', label: '4' },
    { level: 5, color: '#E4EBFF', label: '5' },
    { level: 6, color: '#F2F5FF', label: '6' },
  ],
  Danger: [
    { level: 1, color: '#aa1546', label: '1' },
    { level: 2, color: '#c02d56', label: '2' },
    { level: 3, color: '#e2617b', label: '3' },
    { level: 4, color: '#ffd0d6', label: '4' },
    { level: 5, color: '#ffe3e6', label: '5' },
    { level: 6, color: '#fff1f3', label: '6' },
  ],
  Warning: [
    { level: 1, color: '#a93901', label: '1' },
    { level: 2, color: '#cd4808', label: '2' },
    { level: 3, color: '#e2693c', label: '3' },
    { level: 4, color: '#ffd3c4', label: '4' },
    { level: 5, color: '#ffe5dc', label: '5' },
    { level: 6, color: '#fff2ee', label: '6' },
  ],
  Success: [
    { level: 1, color: '#017048', label: '1' },
    { level: 2, color: '#008455', label: '2' },
    { level: 3, color: '#05ad72', label: '3' },
    { level: 4, color: '#b9eccf', label: '4' },
    { level: 5, color: '#d0f6e0', label: '5' },
    { level: 6, color: '#e7fbef', label: '6' },
  ],
}

export function ContrastGridsTab() {
  const styles = useStyles()

  return (
    <div className={styles.container}>
      {Object.entries(colorGroups).map(([groupName, colors]) => (
        <div key={groupName} className={styles.groupSection}>
          <h2 className={styles.groupTitle}>{groupName} Contrast Grid</h2>
          
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.headerCell}></th>
                {colors.map((color) => (
                  <th key={color.level} className={styles.headerCell}>
                    <div className={styles.colorHeader}>
                      <div 
                        className={styles.colorSwatch}
                        style={{ backgroundColor: color.color }}
                      />
                      <div className={styles.colorLabel}>{color.label}</div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {colors.map((rowColor) => (
                <tr key={rowColor.level}>
                  <th className={styles.headerCell}>
                    <div className={styles.colorHeader}>
                      <div 
                        className={styles.colorSwatch}
                        style={{ backgroundColor: rowColor.color }}
                      />
                      <div className={styles.colorLabel}>{rowColor.label}</div>
                    </div>
                  </th>
                  {colors.map((colColor) => {
                    const contrastRatio = getContrastRatio(rowColor.color, colColor.color)
                    const { level, color: levelColor } = getContrastLevel(contrastRatio)
                    
                    return (
                      <td 
                        key={colColor.level} 
                        className={styles.contrastCell}
                        style={{ 
                          backgroundColor: rowColor.level === colColor.level 
                            ? tokens.colorNeutralBackground4 
                            : 'transparent' 
                        }}
                      >
                        <span className={styles.contrastValue}>
                          {contrastRatio.toFixed(1)}
                        </span>
                        <span 
                          className={styles.contrastLevel}
                          style={{ backgroundColor: levelColor }}
                        >
                          {level}
                        </span>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}