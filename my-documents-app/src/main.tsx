import { h } from './core/fiber'
import { createEl } from './core/fiber'
import { useForceRender, useSelfRef, useState } from './core/fiber/hooks'

// 🔥 Habilitar el fTree
const myfTree: Record<string, any> = {} // 📌 Definir nuestro fTree

h.config({
  useFTree: true, // ✅ Ahora sí usará fTree
  fTree: myfTree
})

// ✅ Estado simulado para manejar la lista dinámicamente
let listData = Array.from({ length: 5 }, (_, i) => i + 1)

interface ButtonProps {
  saludo: number
  __fid?: string // Para TypeScript, lo marcamos opcional
}

// ✅ Componente de botón con evento `onClick`
const ButtonComponent = ({ saludo, __fid }: ButtonProps) => {
  const ref = useSelfRef(__fid)

  // 🚀 Nuevo `useState` para manejar el estado correctamente
  const [datoPrueba, setDatoPrueba] = useState(ref, 'datoPrueba', 'daniel')

  const showRef = () => {
    console.log('🔄 Mostrando el componente ', ref, __fid)
    setDatoPrueba('tefa')
  }

  return (
    <button onClick={showRef}>
      Click {saludo} - {datoPrueba}
    </button>
  )
}

const DeleteButton = ({ onClick }: { onClick: () => void }) => {
  return <button onClick={onClick}>Bórrame</button>
}

// ✅ Componente de la lista ahora recibe `list` como parámetro
const NumberList = ({ list, __fid }: { list: number[] }) => {
  const ref = useSelfRef(__fid)
  const [lista, setLista] = useState(ref, 'list', list)
  const [mostrar, setMostrar] = useState(ref, 'mostrar', false)

  ref.state.list = [...list]

  const deleteItem = (ndx) => {
    const newList = ref.state.list.filter((curr: number) => curr !== ndx)
    setLista(newList)
  }

  const toggleList = (ev) => {
    ev.preventDefault()
    ev.stopPropagation()

    if (lista.length > 0) {
      setMostrar(!mostrar)
      console.log({ myfTree })
    }
  }

  return (
    <ul>
      {lista.map((num) => (
        <li>
          <span key={num} onClick={toggleList}>
            Número: {num}
          </span>
          {mostrar && (
            <ul>
              <li>
                <DeleteButton onClick={() => deleteItem(num)} />
              </li>
              <li>
                <ButtonComponent saludo={num} />
              </li>
            </ul>
          )}
        </li>
      ))}
    </ul>
  )
}

const TextBoxTest = ({ __fid }: { __fid?: string }) => {
  const ref = useSelfRef(__fid)

  const [text, setText] = useState(ref, 'textValue', '')

  return (
    <div>
      <input
        type="text"
        value={text}
        onInput={(e) => {
          setText((e.target as HTMLInputElement).value)
        }}
        placeholder="Escribe algo..."
      />
      <p>Texto ingresado: {text}</p>
    </div>
  )
}

// ✅ JSX Principal
const Test0 = (
  <div>
    <h1>Lista de Números</h1>
    <NumberList list={listData} />

    <TextBoxTest />

    <TextBoxTest />
  </div>
)

// ✅ Renderizar en el DOM
const r = createEl(Test0, myfTree)
document.body.appendChild(r)

console.log({ myfTree })
