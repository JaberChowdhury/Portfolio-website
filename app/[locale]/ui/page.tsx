import { getTranslations } from "next-intl/server"
import AvatarShowcase from "@/components/showcases/AvatarShowcase"
import BadgeShowcase from "@/components/showcases/BadgeShowcase"
import ButtonShowcase from "@/components/showcases/ButtonShowcase"
import CardShowcase from "@/components/showcases/CardShowcase"
import EffectsShowcase from "@/components/showcases/EffectsShowcase"
import InputShowcase from "@/components/showcases/InputShowcase"
import SelectShowcase from "@/components/showcases/SelectShowcase"
import TabsShowcase from "@/components/showcases/TabsShowcase"
import { Eyebrow, Heading, Text } from "@/components/pouf/text"
import FontPreviewPage from "../font-preview/page"

const SECTIONS = [
  { id: "button", component: <ButtonShowcase /> },
  { id: "badge", component: <BadgeShowcase /> },
  { id: "card", component: <CardShowcase /> },
  { id: "avatar", component: <AvatarShowcase /> },
  { id: "input", component: <InputShowcase /> },
  { id: "tabs", component: <TabsShowcase /> },
  { id: "select", component: <SelectShowcase /> },
  { id: "effects", component: <EffectsShowcase /> },
] as const

export default async function UIPage() {
  const t = await getTranslations("UI")

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-(--s5) pt-28 pb-20 md:px-(--s8)">
      <header className="mb-(--s7)">
        <Eyebrow>Components</Eyebrow>
        <Heading level={1}>{t("title")}</Heading>
        <Text muted>{t("description")}</Text>
      </header>

      <div className="flex flex-col gap-(--s8)">
        {SECTIONS.map((section) => (
          <section key={section.id} className="flex flex-col gap-(--s4)">
            <Heading level={2}>{t(`tabs.${section.id}` as never)}</Heading>
            {section.component}
          </section>
        ))}
        <section className="flex flex-col gap-(--s4)">
          <Heading level={2}>{t("tabs.font")}</Heading>
          <FontPreviewPage />
        </section>
      </div>
    </div>
  )
}
