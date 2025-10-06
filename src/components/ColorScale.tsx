import { makeStyles, tokens } from '@fluentui/react-components'

const useStyles = makeStyles({
  scaleContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: tokens.spacingHorizontalXS,
    flexWrap: 'wrap',
  },
  scaleStep: {
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase200,
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
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
  
  // Get the color scale for this name
  const scaleColors = colorScales[name as keyof typeof colorScales] || colors
  
  // Generate steps from 10 to 160 in increments of 10
  const steps = Array.from({ length: 16 }, (_, i) => (i + 1) * 10)

  return (
    <div className={styles.scaleContainer}>
      {steps.map((step) => {
        const stepKey = step.toString()
        const color = scaleColors[stepKey] || '#cccccc'
        const textColor = step <= 80 ? 'white' : 'black'
        
        return (
          <div
            key={step}
            className={styles.scaleStep}
            style={{
              backgroundColor: color,
              color: textColor,
            }}
          >
            {step}
          </div>
        )
      })}
    </div>
  )
}