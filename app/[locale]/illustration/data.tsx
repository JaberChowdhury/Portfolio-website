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

const SYMBOL_LIST: { label: string; slug: string }[] = [
  { label: "!", slug: "bang" },
  { label: "@", slug: "at" },
  { label: "#", slug: "hash" },
  { label: "$", slug: "dollar" },
  { label: "%", slug: "percent" },
  { label: "^", slug: "caret" },
  { label: "&", slug: "amp" },
  { label: "*", slug: "star" },
  { label: "(", slug: "lparen" },
  { label: ")", slug: "rparen" },
  { label: "-", slug: "hyphen" },
  { label: "_", slug: "underscore" },
  { label: "=", slug: "equals" },
  { label: "+", slug: "plus" },
  { label: "[", slug: "lbracket" },
  { label: "]", slug: "rbracket" },
  { label: "{", slug: "lbrace" },
  { label: "}", slug: "rbrace" },
  { label: ";", slug: "semicolon" },
  { label: ":", slug: "colon" },
  { label: "'", slug: "apostrophe" },
  { label: '"', slug: "quote" },
  { label: ",", slug: "comma" },
  { label: "<", slug: "langle" },
  { label: ".", slug: "period" },
  { label: ">", slug: "rangle" },
  { label: "/", slug: "slash" },
  { label: "?", slug: "question" },
  { label: "\\", slug: "backslash" },
  { label: "|", slug: "pipe" },
  { label: "`", slug: "backtick" },
  { label: "~", slug: "tilde" },
]

export const SYMBOLS: IllustrationItem[] = SYMBOL_LIST.map((sym) => ({
  id: `sym-${sym.slug}`,
  label: sym.label,
}))
