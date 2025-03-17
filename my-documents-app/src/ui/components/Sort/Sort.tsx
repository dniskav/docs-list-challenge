import { useState } from '../../../core/fTree/hooks'
import { h } from '../../../core/fTree/jsxRuntime'

export function Sort() {
  return (
    <div>
      <TextBox />
    </div>
  )
}
const TextBox = () => {
  const [text, setText] = useState('')

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
