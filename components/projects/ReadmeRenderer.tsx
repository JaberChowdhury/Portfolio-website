"use client"

interface ReadmeRendererProps {
  html: string
}

export default function ReadmeRenderer({ html }: ReadmeRendererProps) {
  return (
    <div className="min-h-[300px] w-full">
      <div
        className="prose prose-sm w-full max-w-none text-ink md:prose-base prose-headings:mb-(--s3) prose-headings:mt-(--s5) prose-headings:border-b prose-headings:border-ink/10 prose-headings:pb-(--s2) prose-headings:font-black prose-headings:text-ink prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:mb-(--s4) prose-p:leading-relaxed prose-p:text-ink prose-a:font-bold prose-a:text-[#8a3d99] prose-a:underline prose-strong:font-bold prose-strong:text-ink prose-code:rounded-[6px] prose-code:bg-bg prose-code:px-(--s1) prose-code:py-[2px] prose-code:font-mono prose-code:text-[13px] prose-code:font-bold prose-code:text-[#8a3d99] prose-code:before:content-none prose-code:after:content-none prose-pre:my-(--s5) prose-pre:overflow-x-auto prose-pre:rounded-card prose-pre:bg-bg prose-pre:p-(--s5) prose-pre:text-[13px] prose-pre:font-mono prose-ol:mb-(--s4) prose-ol:pl-(--s5) prose-ul:mb-(--s4) prose-ul:pl-(--s5) prose-li:mb-(--s2) prose-li:text-ink prose-table:my-(--s5) prose-table:w-full prose-table:border-collapse prose-th:border prose-th:border-ink/10 prose-th:bg-bg prose-th:p-(--s3) prose-th:text-left prose-th:font-bold prose-td:border prose-td:border-ink/10 prose-td:p-(--s3) prose-td:text-left prose-img:rounded-card prose-hr:border-ink/10 [&_.hljs]:block [&_.hljs]:overflow-x-auto [&_.hljs]:p-(--s2) [&_.hljs]:text-ink [&_.hljs-addition]:text-[#2e7d5b] [&_.hljs-attribute]:text-[#c0538a] [&_.hljs-attr]:text-[#c0538a] [&_.hljs-built_in]:text-[#2f6fae] [&_.hljs-bullet]:text-[#2f6fae] [&_.hljs-comment]:text-muted [&_.hljs-comment]:italic [&_.hljs-emphasis]:italic [&_.hljs-keyword]:font-bold [&_.hljs-keyword]:text-[#8a3d99] [&_.hljs-meta]:text-[#2f6fae] [&_.hljs-meta-string]:text-[#2e7d5b] [&_.hljs-name]:font-bold [&_.hljs-name]:text-[#c0538a] [&_.hljs-number]:text-[#b58a00] [&_.hljs-quote]:text-muted [&_.hljs-quote]:italic [&_.hljs-regexp]:text-[#2f6fae] [&_.hljs-section]:font-bold [&_.hljs-section]:text-[#8a3d99] [&_.hljs-selector-class]:text-[#2f6fae] [&_.hljs-selector-id]:text-[#2f6fae] [&_.hljs-selector-pseudo]:text-[#2f6fae] [&_.hljs-selector-tag]:text-[#8a3d99] [&_.hljs-string]:text-[#2e7d5b] [&_.hljs-subst]:text-ink [&_.hljs-symbol]:text-[#b58a00] [&_.hljs-tag]:text-[#8a3d99] [&_.hljs-template-tag]:text-[#8a3d99] [&_.hljs-template-variable]:text-[#c0538a] [&_.hljs-title]:font-bold [&_.hljs-title]:text-[#2f6fae] [&_.hljs-title.class_]:text-[#c0538a] [&_.hljs-title.function_]:text-[#2f6fae] [&_.hljs-type]:text-[#2f6fae] [&_.hljs-variable]:text-[#2f6fae] [&_.hljs-variable.language_]:text-[#8a3d99]"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
