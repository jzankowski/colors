import { makeStyles, tokens } from '@fluentui/react-components'
import { ColorScale } from './ColorScale'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalL,
  },
  scaleRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
  },
  scaleTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    margin: 0,
  },
})

const colorScales = [
  { name: 'Red (10)', displayName: 'Red' },
  { name: 'Orange (40)', displayName: 'Orange' },
  { name: 'Green (160)', displayName: 'Green' },
  { name: 'Neutral', displayName: 'Neutral' },
]

export function ScalesTab() {
  const styles = useStyles()

  return (
    <div className={styles.container}>
      {colorScales.map((scale) => (
        <div key={scale.name} className={styles.scaleRow}>
          <h3 className={styles.scaleTitle}>{scale.displayName}</h3>
          <ColorScale name={scale.name} colors={{}} />
        </div>
      ))}
    </div>
  )
}