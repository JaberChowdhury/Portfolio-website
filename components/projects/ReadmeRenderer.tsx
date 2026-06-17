"use client";

interface ReadmeRendererProps {
  html: string;
}

export default function ReadmeRenderer({ html }: ReadmeRendererProps) {
  return (
    <div className="w-full min-h-[300px]">
      <div
        className="prose prose-sm md:prose-base dark:prose-invert max-w-none w-full
          prose-headings:font-bold prose-headings:text-foreground prose-headings:border-b prose-headings:border-border prose-headings:pb-2 prose-headings:mt-8 prose-headings:mb-4
          prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
          prose-p:text-foreground prose-p:leading-relaxed prose-p:mb-5
          prose-a:text-primary prose-a:underline prose-a:font-bold hover:prose-a:text-primary/80
          prose-strong:font-bold prose-strong:text-foreground
          prose-ul:pl-6 prose-ul:mb-5 prose-ol:pl-6 prose-ol:mb-5
          prose-li:mb-2 prose-li:text-foreground
          prose-table:w-full prose-table:border-collapse prose-table:my-6
          prose-th:border prose-th:border-border prose-th:bg-muted/50 prose-th:p-3 prose-th:text-left prose-th:font-bold
          prose-td:border prose-td:border-border prose-td:p-3 prose-td:text-left
          prose-img:rounded-md prose-img:border prose-img:border-border
          prose-hr:border-border
          prose-pre:bg-muted/30 prose-pre:border prose-pre:border-border prose-pre:p-5 prose-pre:rounded-md prose-pre:overflow-x-auto prose-pre:my-6
          prose-code:bg-muted/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-sm prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
          
          /* highlight.js styling integrated with Tailwind theme colors */
          [&_.hljs]:block [&_.hljs]:overflow-x-auto [&_.hljs]:p-2 [&_.hljs]:text-foreground
          [&_.hljs-comment]:text-muted-foreground [&_.hljs-comment]:italic
          [&_.hljs-quote]:text-muted-foreground [&_.hljs-quote]:italic
          [&_.hljs-keyword]:text-destructive [&_.hljs-keyword]:font-bold
          [&_.hljs-selector-tag]:text-destructive [&_.hljs-selector-tag]:font-bold
          [&_.hljs-string]:text-blue-500 [&_.hljs-regexp]:text-blue-500 [&_.hljs-addition]:text-blue-500 [&_.hljs-attribute]:text-blue-500 [&_.hljs-meta-string]:text-blue-500
          [&_.hljs-title]:text-secondary-foreground [&_.hljs-title]:font-bold
          [&_.hljs-section]:text-secondary-foreground [&_.hljs-section]:font-bold
          [&_.hljs-name]:text-secondary-foreground [&_.hljs-name]:font-bold
          [&_.hljs-variable]:text-yellow-500 [&_.hljs-template-variable]:text-yellow-500 [&_.hljs-type]:text-yellow-500 [&_.hljs-number]:text-yellow-500
          [&_.hljs-symbol]:text-blue-500 [&_.hljs-bullet]:text-blue-500 [&_.hljs-meta]:text-blue-500 [&_.hljs-built_in]:text-blue-500
          [&_.hljs-emphasis]:italic
          [&_.hljs-strong]:font-bold
        "
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
