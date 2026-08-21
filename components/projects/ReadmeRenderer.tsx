"use client"

interface ReadmeRendererProps {
  html: string
}

export default function ReadmeRenderer({ html }: ReadmeRendererProps) {
  return (
    <div className="min-h-[300px] w-full max-w-full overflow-x-auto">
      <div
        className="/* highlight.js styling integrated with Tailwind theme colors */ prose prose-sm w-full max-w-none [overflow-wrap:anywhere] break-words sm:prose-base dark:prose-invert prose-headings:mt-6 prose-headings:mb-3 prose-headings:border-b prose-headings:border-border prose-headings:pb-2 prose-headings:font-bold prose-headings:text-foreground sm:prose-headings:mt-8 sm:prose-headings:mb-4 prose-h1:text-2xl sm:prose-h1:text-3xl prose-h2:text-xl sm:prose-h2:text-2xl prose-h3:text-lg sm:prose-h3:text-xl prose-p:mb-4 prose-p:leading-relaxed prose-p:text-foreground sm:prose-p:mb-5 prose-a:font-bold prose-a:text-primary prose-a:underline hover:prose-a:text-primary/80 prose-strong:font-bold prose-strong:text-foreground prose-code:rounded-sm prose-code:bg-muted/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-xs prose-code:before:content-none prose-code:after:content-none sm:prose-code:text-sm prose-pre:my-4 prose-pre:max-w-full prose-pre:overflow-x-auto prose-pre:rounded-md prose-pre:border prose-pre:border-border prose-pre:bg-muted/30 prose-pre:p-3 sm:prose-pre:my-6 sm:prose-pre:p-5 prose-ol:mb-4 prose-ol:pl-5 sm:prose-ol:mb-5 sm:prose-ol:pl-6 prose-ul:mb-4 prose-ul:pl-5 sm:prose-ul:mb-5 sm:prose-ul:pl-6 prose-li:mb-1.5 prose-li:text-foreground sm:prose-li:mb-2 prose-table:my-4 prose-table:w-full prose-table:border-collapse sm:prose-table:my-6 prose-th:border prose-th:border-border prose-th:bg-muted/50 prose-th:p-2 prose-th:text-left prose-th:font-bold sm:prose-th:p-3 prose-td:border prose-td:border-border prose-td:p-2 prose-td:text-left sm:prose-td:p-3 prose-img:rounded-md prose-img:border prose-img:border-border prose-hr:border-border [&_.hljs]:block [&_.hljs]:overflow-x-auto [&_.hljs]:p-2 [&_.hljs]:text-foreground [&_.hljs-addition]:text-blue-500 [&_.hljs-attribute]:text-blue-500 [&_.hljs-built_in]:text-blue-500 [&_.hljs-bullet]:text-blue-500 [&_.hljs-comment]:text-muted-foreground [&_.hljs-comment]:italic [&_.hljs-emphasis]:italic [&_.hljs-keyword]:font-bold [&_.hljs-keyword]:text-destructive [&_.hljs-meta]:text-blue-500 [&_.hljs-meta-string]:text-blue-500 [&_.hljs-name]:font-bold [&_.hljs-name]:text-secondary-foreground [&_.hljs-number]:text-yellow-500 [&_.hljs-quote]:text-muted-foreground [&_.hljs-quote]:italic [&_.hljs-regexp]:text-blue-500 [&_.hljs-section]:font-bold [&_.hljs-section]:text-secondary-foreground [&_.hljs-selector-tag]:font-bold [&_.hljs-selector-tag]:text-destructive [&_.hljs-string]:text-blue-500 [&_.hljs-strong]:font-bold [&_.hljs-symbol]:text-blue-500 [&_.hljs-template-variable]:text-yellow-500 [&_.hljs-title]:font-bold [&_.hljs-title]:text-secondary-foreground [&_.hljs-type]:text-yellow-500 [&_.hljs-variable]:text-yellow-500"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
