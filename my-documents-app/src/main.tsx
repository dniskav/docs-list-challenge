import { h } from './core/fiber'
import { createEl } from './core/fiber'
import { useForceRender, useSelfRef, useState } from './core/fiber/hooks'

// 🔥 Habilitar el store
const myStore: Record<string, any> = {} // 📌 Definir nuestro store

h.config({
  useStore: true, // ✅ Ahora sí usará store
  store: myStore
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
  // ✅ Obtener el `selfRef` de la función
  const ref = useSelfRef(__fid)
  const render = useForceRender(ref)
  ref.state.list = [...list]

  const deleteItem = (ndx) => {
    ref.state.list = ref.state.list.filter((curr: number) => curr !== ndx)
    render()
  }

  return (
    <ul>
      {ref.state.list.map((num) => (
        <li key={num}>
          Número: {num}
          <DeleteButton onClick={() => deleteItem(num)} />
          <ButtonComponent saludo={num} />
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
const r = createEl(Test0, myStore)
document.body.appendChild(r)

console.log({ myStore })
