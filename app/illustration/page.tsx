import fs from "fs"
import path from "path"
import IllustrationClient from "./IllustrationClient"

export default function IllustrationPage() {
  const illustrationsDir = path.join(process.cwd(), "public", "illustrations")

  let availableSvgs: string[] = []
  if (fs.existsSync(illustrationsDir)) {
    availableSvgs = fs
      .readdirSync(illustrationsDir)
      .filter((file) => file.endsWith(".svg"))
  }

  return <IllustrationClient availableSvgs={availableSvgs} />
}
