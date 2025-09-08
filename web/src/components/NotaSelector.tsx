type Props = {
  value: number
  onChange?: (notaSelecionada: number) => void
  max?: number
  readOnly?: boolean
  className?: string
}

export default function NotaSelector({
  value,
  onChange,
  max = 5,
  readOnly = false,
  className = ''
}: Props) {
  return (
    <div className={`flex gap-2 ${className}`} aria-label="Selecionar nota">
      {Array.from({ length: max }, (_, i) => {
        const nota = i + 1
        const ativo = nota === value

        const base =
          'w-10 h-10 rounded-md border text-sm font-medium transition'
        const estilosAtivo = 'bg-white/20 border-white/40 text-white'
        const estilosInativo = 'bg-neutral-900 border-white/10 text-white/60'

        if (readOnly) {
          return (
            <div
              key={nota}
              className={`${base} ${ativo ? estilosAtivo : estilosInativo}`}
              aria-hidden
            >
              {nota}
            </div>
          )
        }

        return (
          <button
            key={nota}
            type="button"
            aria-label={`Nota ${nota}`}
            onClick={() => onChange?.(nota)}
            className={`${base} ${
              ativo
                ? estilosAtivo
                : `${estilosInativo} hover:bg-white/10 hover:text-white`
            }`}
          >
            {nota}
          </button>
        )
      })}
    </div>
  )
}
