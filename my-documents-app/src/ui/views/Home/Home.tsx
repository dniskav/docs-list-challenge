import { h } from '../../../core/fTree/jsxRuntime'
import { Header } from '../../components'
import { DocumentList } from '../../components/DocumentsManager/DocumentList'

export function Home() {
  return (
    <div>
      <Header />

      <main>
        <DocumentList />
      </main>
    </div>
  )
}
