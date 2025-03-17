import { h, render } from './core/fiber'
import { fTree, logFTree } from './core/fiber/fTree'
import { useState } from './core/fiber/hooks'
import { useEffect } from './core/fiber/hooks/useEffect'

const myfTree: Record<string, any> = {}

h.config({
  useFTree: true,
  fTree: myfTree
})

let listData = Array.from({ length: 5 }, (_, i) => i + 1)

const ButtonComponent = () => {
  const [datoPrueba, setDatoPrueba] = useState('daniel')

  const showRef = () => {
    setDatoPrueba(`${Math.random()}`)
    console.log({ fTree })
  }

  return <button onClick={showRef}>Click {datoPrueba}</button>
}

const NumberList = ({ list }: { list: number[] }) => {
  const [mostrar, setMostrar] = useState(true)

  useEffect(() => {
    console.log('✅ Efecto inicial: Solo se ejecuta una vez (montaje)')
  }, []) // 🔥 Solo en el primer render

  useEffect(() => {
    console.log("🔄 Efecto dependiente de 'mostrar':", mostrar)
  }, [mostrar]) // 🔥 Se ejecuta cada vez que 'mostrar' cambia

  const toggleList = () => {
    setMostrar(!mostrar)
    console.log({ fTree })
  }

  return (
    <div>
      <button onClick={toggleList}>mostrar/ocultar:</button>
      {mostrar && <ButtonComponent />}
    </div>
  )
}

// const TextBoxTest = () => {
//   const [text, setText] = useState('')

//   return (
//     <div>
//       <input
//         type="text"
//         value={text}
//         onInput={(e) => {
//           setText((e.target as HTMLInputElement).value)
//         }}
//         placeholder="Escribe algo..."
//       />
//       <p>Texto ingresado: {text}</p>
//     </div>
//   )
// }

// const MyText = ({ data }: { data: string }) => {
//   return <aside>test - {data}</aside>
// }

// const Te = () => {
//   const [data, setData] = useState('init')
//   return (
//     <section>
//       probando
//       <ButtonComponent saludo={1} />
//       <button onClick={() => setData('hola')}>Click</button>
//       <MyText data={data} />
//     </section>
//   )
// }

// const Test0 = () => (
//   <div>
//     <Te />
//   </div>
// )

export function App() {
  return <NumberList list={listData} />
}

// const rootVNode = <App />

function TestList() {
  let list = Array.from({ length: 5 }, (_, i) => i + 1)
  return (
    <ul>
      {list.map((num) => (
        <li> - {num}</li>
      ))}
    </ul>
  )
}

const DocumentList = () => {
  const [documents, setDocuments] = useState<any[]>([])

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch('http://localhost:8080/documents')
        const data = await response.json()
        setDocuments(data)
      } catch (error) {
        console.error('❌ Error al obtener documentos:', error)
      }
    }

    fetchDocuments()
  }, []) // 🔥 Solo se ejecuta en el primer render

  return (
    <div>
      <h2>Lista de Documentos</h2>
      <ul>
        {documents.map((doc) => (
          <li key={doc.ID}>
            <section>
              <p>
                <strong>ID:</strong> {doc.ID}
              </p>
              <p>
                <strong>CreatedAt:</strong> {doc.CreatedAt}
              </p>
              <p>
                <strong>UpdatedAt:</strong> {doc.UpdatedAt}
              </p>
              <p>
                <strong>Title:</strong> {doc.Title}
              </p>
            </section>
          </li>
        ))}
      </ul>
    </div>
  )
}

const rootDom = document.getElementById('root')
render(<DocumentList />, rootDom as HTMLElement)

console.log({ fTree })
