import { ReactNode, ComponentType } from "react"

export type CardPosition =
  "active" | "pushed-1" | "pushed-2" | "pushed-more" | "next-1" | "next-more"

export interface SectionInjectedProps {
  index: number
  current: number
  isActive: boolean
  position: CardPosition
  total: number
  goTo: (index: number) => void
  next: () => void
  previous: () => void
  mouseOffset: { x: number; y: number }
}

export interface SectionConfig {
  id?: string | number
  navLabel?: string
  backgroundColor?: string
  className?: string
  showDecorativeOrb?: boolean
  showGrid?: boolean
  showGlow?: boolean
  content?: ReactNode | ((props: SectionInjectedProps) => ReactNode)
  Component?: ComponentType<SectionInjectedProps>
}

export interface CardStackOptions {
  transitionDuration?: number
  wheelLockDuration?: number
  showNav?: boolean
  showProgress?: boolean
  showCounter?: boolean
  className?: string
  brandTitle?: string
  statusText?: string
  renderNav?: () => ReactNode
  renderProgress?: (props: {
    sections: SectionConfig[]
    current: number
    onSelect: (index: number) => void
  }) => ReactNode
  renderCounter?: (props: { current: number; total: number }) => ReactNode
}

export interface CardStackProps extends CardStackOptions {
  sections: SectionConfig[]
}
