import { makeStyles, tokens } from '@fluentui/react-components'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalL,
  },
  colorRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
  },
  colorTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    margin: 0,
  },
  colorSample: {
    width: '200px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: tokens.fontWeightSemibold,
    borderRadius: tokens.borderRadiusMedium,
  },
})

// Using colors from the Primitive (Bebop) variables
const genericColors = [
  { name: 'Neutral', color: '#5d5d5d', label: 'Neutral' }, // neutral.1.rest
  { name: 'Status Danger', color: '#aa1546', label: 'Danger' }, // status.danger.1.rest
  { name: 'Status Warning', color: '#a93901', label: 'Warning' }, // status.warning.1.rest  
  { name: 'Status Success', color: '#017048', label: 'Success' }, // status.success.1.rest
]

export function GenericColorsTab() {
  const styles = useStyles()

  return (
    <div className={styles.container}>
      {genericColors.map((colorInfo) => (
        <div key={colorInfo.name} className={styles.colorRow}>
          <h3 className={styles.colorTitle}>{colorInfo.name}</h3>
          <div 
            className={styles.colorSample}
            style={{ 
              backgroundColor: colorInfo.color,
              color: colorInfo.name === 'Status Warning' ? '#000' : '#fff'
            }}
          >
            {colorInfo.label}
          </div>
        </div>
      ))}
    </div>
  )
}