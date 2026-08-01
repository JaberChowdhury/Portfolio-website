"use client"

import { Select } from "@/components/pouf/controls"
import { Blob } from "@/components/pouf/media"
import { Row } from "@/components/pouf/layout"
import { Card } from "@/components/pouf/surface"
import { Eyebrow, Text } from "@/components/pouf/text"
import { useRouter } from "@/i18n/routing"

interface BranchSelectorProps {
  repoName: string
  allBranches: { name: string }[]
  activeBranchName: string
}

export default function BranchSelector({
  repoName,
  allBranches,
  activeBranchName,
}: BranchSelectorProps) {
  const router = useRouter()

  const activeIndex = allBranches.findIndex(
    (b) => b.name.toLowerCase() === activeBranchName.toLowerCase()
  )
  const currentBranch =
    allBranches[activeIndex === -1 ? 0 : activeIndex]?.name ?? activeBranchName

  const handleChange = (branchName: string) => {
    if (branchName === currentBranch) return
    router.push(`/projects/${repoName}/${encodeURIComponent(branchName)}`)
  }

  return (
    <Card variant="tight">
      <Row gap={4} justify="between">
        <Row gap={3} wrap={false}>
          <Blob size="sm" tone="purple" icon="tag" />
          <div className="flex flex-col gap-[2px]">
            <Eyebrow>Branches</Eyebrow>
            <Text size="sm" muted num>
              {allBranches.length} total
            </Text>
          </div>
        </Row>

        <div className="w-full max-w-[260px]">
          <Select
            label="Branch"
            value={currentBranch}
            onChange={handleChange}
            options={allBranches.map((b) => ({ value: b.name, label: b.name }))}
          />
        </div>
      </Row>
    </Card>
  )
}
