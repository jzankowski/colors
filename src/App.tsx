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
import { PrimitivesTab } from './components/PrimitivesTab'
import { GenericColorsTab } from './components/GenericColorsTab'
import { ContrastGridsTab } from './components/ContrastGridsTab'

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

type TabId = 'scales' | 'primitives' | 'generic' | 'contrast'

function App() {
  const [selectedTab, setSelectedTab] = useState<TabId>('scales')
  const styles = useStyles()

  const handleTabSelect = (_event: SelectTabEvent, data: SelectTabData) => {
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
        <Tab value="primitives">Primitives</Tab>
        <Tab value="generic">Generic</Tab>
        <Tab value="contrast">Contrast Grids</Tab>
      </TabList>

      <div className={styles.content}>
        {selectedTab === 'scales' && <ScalesTab />}
        {selectedTab === 'primitives' && <PrimitivesTab />}
        {selectedTab === 'generic' && <GenericColorsTab />}
        {selectedTab === 'contrast' && <ContrastGridsTab />}
      </div>
    </div>
  )
}

export default App