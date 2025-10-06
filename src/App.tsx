import { useState } from 'react'
import { 
  Tab, 
  TabList, 
  makeStyles, 
  tokens,
  SelectTabData,
  SelectTabEvent,
} from '@fluentui/react-components'
import { ScalesTab } from './components/ScalesTab'
import { GenericColorsTab } from './components/GenericColorsTab'

const useStyles = makeStyles({
  container: {
    padding: tokens.spacingVerticalL,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
  },
  tabList: {
    marginBottom: tokens.spacingVerticalL,
  },
  content: {
    marginTop: tokens.spacingVerticalL,
  },
})

type TabId = 'scales' | 'generic'

function App() {
  const [selectedTab, setSelectedTab] = useState<TabId>('scales')
  const styles = useStyles()

  const handleTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    setSelectedTab(data.value as TabId)
  }

  return (
    <div className={styles.container}>
      <h1>Color System</h1>
      
      <TabList 
        selectedValue={selectedTab} 
        onTabSelect={handleTabSelect}
        className={styles.tabList}
      >
        <Tab value="scales">Scales</Tab>
        <Tab value="generic">Generic</Tab>
      </TabList>

      <div className={styles.content}>
        {selectedTab === 'scales' && <ScalesTab />}
        {selectedTab === 'generic' && <GenericColorsTab />}
      </div>
    </div>
  )
}

export default App