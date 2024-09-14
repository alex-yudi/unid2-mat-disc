import { Suspense, useState } from "react"
import { MathJax } from 'better-react-mathjax'
import { calculateResult } from "../utils/formulas"

type Values = {
  a: number,
  p: number,
  q: number
}

const defaultValues = {
  a: 1,
  p: 0,
  q: 0
}

const verifyCase = (delta: number) => {
  if (delta > 0) {
    return "1º caso: Δ > 0"
  }
  if (delta === 0) {
    return "2º caso: Δ = 0"
  }
  if (delta < 0) {
    return "3º caso: Δ < 0"
  }
}

export function Home() {
  const [values, setValues] = useState<Values>(defaultValues)
  const [resultCalculated, setResultCalculated] = useState<boolean>(false)
  const [showResult, setShowResult] = useState<boolean>(false)
  const [result, setResult] = useState<string>("")
  const [delta, setDelta] = useState<number>(0)
  const [lambdas, setLambdas] = useState({
    lambda1: 0,
    lambda2: 0
  })

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setValues(prevValues => ({
      ...prevValues,
      [id]: Number(value)
    }));
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()

    const { a, p, q } = values
    const { delta, result, lambda1, lambda2 } = calculateResult(a, p, q)
    setLambdas({
      lambda1,
      lambda2
    })
    setDelta(delta)
    setResult(result)

    setShowResult(true)
    setTimeout(() => {
      setResultCalculated(true)
    }, 500)
  }

  const handleReset = () => {
    setShowResult(false)

    setTimeout(() => {
      setResultCalculated(false)
    }, 500)
  }
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <header className="flex justify-between items-center text-center bg-gray-700 px-8 py-6">
        <div>
          <h1 className="text-lg font-bold">
            Matemática Discreta - 2ª Unidade
          </h1>
          <h2 className="text-sm">
            Equações de Recorrência de 2ª Ordem
          </h2>
        </div>
        <h1 className="text-lg font-bold">
          Aluno: Alex Yudi
        </h1>
      </header>
      <Suspense fallback={<p>Carregando...</p>}>
        <main className="px-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl text-center font-bold">
              Encontre a solução das equações de recorrência de segunda ordem!
            </h2>
            <h3 className="text-xl text-center font-bold">
              Informe os coeficientes da equação geral e calcularemos sua solução.
            </h3>

            {
              !showResult &&
              <div className={`flex flex-col justify-center py-7 text-2xl border border-white rounded h-[300px] transition-opacity duration-500 ${resultCalculated ? "opacity-0" : "opacity-100"}`}>
                <div className="flex gap-2 m-auto">

                  <span>
                    Fórmula geral:
                  </span>
                  <MathJax>
                    {"\\(\\textcolor{yellow}{a} \\cdot X_{n+2} + \\textcolor{yellow}{p} \\cdot X_{n+1} + \\textcolor{yellow}{q} \\cdot X_n = 0\\)"}
                  </MathJax>
                </div>

                <div className="flex flex-col items-center gap-5 m-auto">
                  <span>
                    Escreva seus coeficientes:
                  </span>

                  <form id="form" className="flex gap-2" onSubmit={handleSubmit}>

                    <div className="flex items-center gap-1">
                      <label htmlFor="a">
                        a:
                      </label>
                      <input defaultValue={1} value={values.a} onChange={handleOnChange} type="number" id="a" className="border px-2 py-2 rounded w-20 h-10 text-black" />
                    </div>

                    <div className="flex items-center  gap-1">
                      <label htmlFor="p">
                        p:
                      </label>
                      <input value={values.p} onChange={handleOnChange} type="number" id="p" className="border px-2 py-2 rounded w-20 h-10 text-black" required />
                    </div>

                    <div className="flex items-center gap-1">
                      <label htmlFor="q">
                        q:
                      </label>
                      <input value={values.q} onChange={handleOnChange} type="number" id="q" className="border px-2 py-2 rounded w-20 h-10 text-black" required />
                    </div>

                  </form>
                  <button
                    type="submit"
                    form="form"
                    className="bg-gray-400 text-gray-800 px-4 py-2 rounded hover:bg-gray-700 hover:text-white active:bg-gray-900 mt-2"
                  >
                    Calcular
                  </button>
                </div>
              </div>
            }

            {
              showResult &&
              <div className={`flex flex-col justify-center py-7 text-2xl border border-white rounded h-[300px] transition-opacity duration-500 ${resultCalculated ? "opacity-100" : "opacity-0"}`}>
                <div className="flex flex-col items-center gap-3 m-auto">
                  <span className="text-xl">
                    {verifyCase(delta)}
                  </span>
                  <span className="flex gap-16">
                    <MathJax>{`\\(\\textcolor{yellow}{\\lambda_1}= ${lambdas.lambda1}\\)`}</MathJax>
                    <MathJax>{`\\(\\textcolor{yellow}{\\lambda_2} = ${lambdas.lambda2}\\)`}</MathJax>
                  </span>
                  <span>
                    A fórmula da solução geral é:
                  </span>
                  <MathJax>
                    {result}
                  </MathJax>
                </div>

                <div className="flex flex-col items-center gap-5 m-auto">
                  <button
                    className="bg-gray-400 text-gray-800 px-4 py-2 rounded hover:bg-gray-700 hover:text-white active:bg-gray-900 mt-2"
                    onClick={handleReset}
                  >
                    Fazer novo cálculo
                  </button>
                </div>
              </div>
            }

            <h3 className="text-l">
              <span className='text-red-600'>
                *
              </span>
              Você pode fornecer os valores de
              <span className="text-yellow-300">
                {` a `}
              </span>
              ,
              <span className="text-yellow-300">
                {` p `}
              </span> e <span className="text-yellow-300">
                {` q `}
              </span>
              para calcular a solução da equação de recorrência de segunda ordem.
            </h3>
            <h3 className="text-l">
              Caso o valor de <span className="text-yellow-300"> a </span> não seja fornecido, ele será considerado como 1.
            </h3>
          </div>
        </main>
      </Suspense>
      <footer>
        <p className="text-center bg-gray-700 px-8 py-6">
          &copy; 2024 - Alex Yudi
        </p>
      </footer>
    </div>
  )
}