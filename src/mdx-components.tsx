import { Box, Divider, Link, Typography } from "@mui/material";
import type { MDXComponents } from "mdx/types";
import NextLink from "next/link";
import { useMDXComponents as getThemeComponents } from "nextra-theme-blog";
import type { ReactNode } from "react";

import hljs from "highlight.js";
import "highlight.js/styles/nord.css";

// Register specific languages for better highlighting support
import cpp from "highlight.js/lib/languages/cpp";
import c from "highlight.js/lib/languages/c";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import bash from "highlight.js/lib/languages/bash";
import lua from "highlight.js/lib/languages/lua";

// Register all required languages
hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("c", c);
hljs.registerLanguage("js", javascript);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("ts", typescript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("shell", bash);
hljs.registerLanguage("sh", bash);
hljs.registerLanguage("lua", lua);

// Helper function to extract text from React children
const extractTextFromChildren = (children: React.ReactNode): string => {
  if (typeof children === "string") {
    return children;
  }
  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join("");
  }
  // Handle React elements by extracting their text content
  if (children && typeof children === "object" && "props" in children) {
    const childProps = (children as React.ReactElement).props; // Cast to React.ReactElement to access props
    if (
      childProps &&
      typeof childProps === "object" &&
      "children" in childProps
    ) {
      return extractTextFromChildren(childProps.children as React.ReactNode);
    }
  }
  return "";
};

// Custom code block component with line numbers
const CodeBlock = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const language = className?.replace(/^language-/, "") || "plaintext";
  const codeString = extractTextFromChildren(children).trim();

  // Highlight code using highlight.js
  const highlighted = hljs.highlight(codeString, {
    language,
    ignoreIllegals: true,
  }).value;

  // Add line numbers
  const lines = highlighted.split("\n");
  const withLineNumbers = lines
    .map((line, idx) => `<span class="line-number">${idx + 1}</span>${line}`)
    .join("\n");

  return (
    <pre className="custom-code-block">
      <code
        className={`hljs ${className}`}
        dangerouslySetInnerHTML={{ __html: withLineNumbers }}
      />
    </pre>
  );
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  const themeComponents = getThemeComponents();
  return {
    ...themeComponents,
    pre: (props: any) => {
      const { className, children } = props;
      return <CodeBlock className={className}>{children}</CodeBlock>;
    },
    wrapper: ({ children }: { children: ReactNode }) => <>{children}</>,
    h1: ({ children }: { children: ReactNode }) => (
      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontWeight: 800,
          mt: 5,
          mb: 2,
          textTransform: "uppercase",
          fontFamily: "inherit",
          letterSpacing: "-0.02em",
        }}
      >
        {children}
      </Typography>
    ),
    h2: ({ children }: { children: ReactNode }) => (
      <Typography
        variant="h4"
        component="h2"
        sx={{
          fontWeight: 700,
          mt: 4,
          mb: 2,
          textTransform: "uppercase",
          fontFamily: "inherit",
          letterSpacing: "-0.01em",
        }}
      >
        {children}
      </Typography>
    ),
    h3: ({ children }: { children: ReactNode }) => (
      <Typography
        variant="h5"
        component="h3"
        sx={{
          fontWeight: 700,
          mt: 3,
          mb: 1.5,
          textTransform: "uppercase",
          fontFamily: "inherit",
          letterSpacing: "-0.01em",
        }}
      >
        {children}
      </Typography>
    ),
    p: ({ children }: { children: ReactNode }) => (
      <Typography
        variant="body1"
        sx={{
          lineHeight: 1.8,
          mb: 2.5,
          color: "text.primary",
          fontSize: "1.05rem",
        }}
      >
        {children}
      </Typography>
    ),
    a: ({ href, children }: { href?: string; children: ReactNode }) => (
      <Link
        href={href || "#"}
        component={NextLink}
        sx={{
          color: "text.primary",
          fontWeight: 700,
          textDecoration: "underline",
          "&:hover": { opacity: 0.7 },
        }}
      >
        {children}
      </Link>
    ),
    ul: ({ children }: { children: ReactNode }) => (
      <Box component="ul" sx={{ pl: 3, mb: 3, lineHeight: 1.8 }}>
        {children}
      </Box>
    ),
    ol: ({ children }: { children: ReactNode }) => (
      <Box component="ol" sx={{ pl: 3, mb: 3, lineHeight: 1.8 }}>
        {children}
      </Box>
    ),
    li: ({ children }: { children: ReactNode }) => (
      <Box
        component="li"
        sx={{ mb: 1, fontSize: "1.05rem", color: "text.primary" }}
      >
        {children}
      </Box>
    ),
    hr: () => (
      <Divider sx={{ my: 5, borderColor: "divider", borderBottomWidth: 1 }} />
    ),
    blockquote: ({ children }: { children: ReactNode }) => (
      <Box
        component="blockquote"
        sx={{
          borderLeft: "4px solid",
          borderColor: "text.primary",
          pl: 3,
          my: 4,
          fontStyle: "italic",
          color: "text.secondary",
          "& p": { m: 0 },
        }}
      >
        {children}
      </Box>
    ),
    ...components,
  };
}
