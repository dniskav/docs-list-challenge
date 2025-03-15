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
  const render = useForceRender(ref)

  // 🚀 Nuevo `useState` para manejar el estado correctamente
  const [datoPrueba, setDatoPrueba] = useState(ref, 'datoPrueba', 'daniel')

  const showRef = () => {
    console.log('🔄 Mostrando el componente ', ref, __fid)
    setDatoPrueba('tefa') // ✅ Cambia el estado
    render() // 🔄 Disparar re-render
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

const TimerTest = ({ step, __fid }: { step: number }) => {
  const ref = useSelfRef(__fid)
  const render = useForceRender(ref)

  ref.state.step = step

  const timer = () => {
    ref.state.step++
    render()
  }

  //setTimeout(timer, 1000)

  return (
    <div>
      <h4>Timer {ref.state.step}</h4>
    </div>
  )
}

// ✅ JSX Principal
const Test0 = (
  <div>
    <h1>Lista de Números</h1>
    <NumberList list={listData} />
    <TimerTest step={0} />
  </div>
)

// ✅ Renderizar en el DOM
const r = createEl(Test0, myStore)
document.body.appendChild(r)

console.log({ myStore })
