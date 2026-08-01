import { Icon } from "@/components/pouf/Icon"
import { Text } from "@/components/pouf/text"

export default function Loader() {
  return (
    <div className="flex w-full items-center justify-center p-(--s6)">
      <div className="flex flex-col items-center gap-(--s4)">
        <Icon name="lab" size="md" />
        <Text size="sm" muted>
          Loading Typography...
        </Text>
      </div>
    </div>
  )
}
