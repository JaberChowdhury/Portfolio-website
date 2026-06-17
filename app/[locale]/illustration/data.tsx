export type IllustrationItem = {
  id: string
  label: string
}

export const UPPERCASE_LETTERS: IllustrationItem[] = Array.from(
  { length: 26 },
  (_, i) => {
    const letter = String.fromCharCode(65 + i)
    return {
      id: `upper-${letter}`,
      label: letter,
    }
  }
)

export const LOWERCASE_LETTERS: IllustrationItem[] = Array.from(
  { length: 26 },
  (_, i) => {
    const letter = String.fromCharCode(97 + i)
    return {
      id: `lower-${letter}`,
      label: letter,
    }
  }
)

export const NUMBERS: IllustrationItem[] = Array.from(
  { length: 10 },
  (_, i) => {
    const num = String(i)
    return {
      id: `num-${num}`,
      label: num,
    }
  }
)

const SYMBOL_LIST = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "-",
  "_",
  "=",
  "+",
  "[",
  "]",
  "{",
  "}",
  ";",
  ":",
  "'",
  '"',
  ",",
  "<",
  ".",
  ">",
  "/",
  "?",
  "\\",
  "|",
  "`",
  "~",
]

export const SYMBOLS: IllustrationItem[] = SYMBOL_LIST.map((sym) => ({
  id: `sym-${sym}`,
  label: sym,
}))
