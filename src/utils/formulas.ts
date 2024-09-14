export const calculateResult = (a: number, p: number, q: number): { result: string, delta: number, lambda1: number | string, lambda2: number | string } => {
    let result = {
        result: "",
        delta: 0,
        lambda1: 0,
        lambda2: 0
    }
    if (a > 1) {
        p = p / a
        q = q / a
    }

    const delta = Math.pow(p, 2) - (4 * q)

    if (delta > 0) {
        const { result, lambda1, lambda2 } = (calculateCase1(delta, p))
        return {
            result,
            delta,
            lambda1,
            lambda2,
        }
    }
    if (delta === 0) {
        const { result, lambda1, lambda2 } = calculateCase2(p)
        return {
            result,
            delta,
            lambda1,
            lambda2,
        }
    }
    if (delta < 0) {
        const { result, lambda1, lambda2 } = calculateCase3(delta, p)
        return {
            result,
            delta,
            lambda1,
            lambda2,
        }
    }
    return result
}

const calculateCase1 = (delta: number, p: number): { result: string, lambda1: number, lambda2: number } => {
    const x1 = (-p + Math.sqrt(delta)) / 2
    const x2 = (-p - Math.sqrt(delta)) / 2

    return {
        result: "\\(X_n = C1\\cdot \\textcolor{yellow}{(" + x1 + ")}^n + C2\\cdot \\textcolor{yellow}{(  \\ " + x2 + " )}^n\\)",
        lambda1: x1,
        lambda2: x2
    }
}

const calculateCase2 = (p: number) => {
    const x = -p / 2

    return {
        result: "\\(X_n = C1\\cdot \\textcolor{yellow}{(" + x + ")}^n + C2\\cdot n\\cdot\\textcolor{yellow}{(  \\ " + x + " )}^n\\)",
        lambda1: x,
        lambda2: x
    }
}

const calculateCase3 = (delta: number, p: number) => {
    const value1 = Math.pow((Math.sqrt(-delta) / 2), 2)
    const value2 = Math.pow((-p / 2), 2)
    const P = Math.ceil(Math.sqrt(value1 + value2))

    const arcTgRd = Math.atan2((Math.sqrt(-delta) / 2), (-p / 2))
    const arcTgDeg = Math.ceil(arcTgRd * (180 / Math.PI))

    return {
        result: `\\(X_n = ${P}^n \\left[ k_1 \\cdot \\cos(n \\cdot \\ ${arcTgDeg}^\\circ\\ ) + k_2 \\cdot \\sin(n \\cdot \\ ${arcTgDeg}^\\circ\\ ) \\right], \\text{ onde } k_1, k_2 \\in \\mathbb{C}\\)`,
        lambda1: `\\ (\\frac{${-p}}{2} + \\frac{\\sqrt{${(-delta)}} \\cdot i}{2}\\ )`,
        lambda2: `\\ (\\frac{${-p}}{2} - \\frac{\\sqrt{${(-delta)}} \\cdot i}{2}\\ )`
    }
}