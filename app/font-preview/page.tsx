import React from "react"

export default function FontPreviewPage() {
  const sampleText = "The quick brown fox jumps over the lazy dog."
  const alphabetUppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const alphabetLowercase = "abcdefghijklmnopqrstuvwxyz"
  const numbers = "0123456789"
  const symbols = "!@#$%^&*()_+-=[]{}|;:',.<>/?"

  return (
    <div className="container mx-auto min-h-screen px-4 py-20">

      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold">Font Preview</h1>
        <p className="text-muted-foreground">
          Compare the custom fonts loaded in your project.
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-2">
        {/* Marlin Font Preview */}
        <div className="space-y-6 rounded-xl border bg-card p-6">
          <div className="border-b pb-4">
            <h2 className="mb-1 text-2xl font-semibold">Marlin Soft</h2>
            <p className="text-sm text-muted-foreground">
              Class:{" "}
              <code className="rounded bg-muted px-1.5 py-0.5">
                font-marlin
              </code>
            </p>
          </div>

          <div className="font-marlin space-y-8">
            <section>
              <h3 className="mb-2 text-sm tracking-wider text-muted-foreground uppercase">
                Sample
              </h3>
              <p className="text-3xl leading-tight">{sampleText}</p>
            </section>

            <section>
              <h3 className="mb-2 text-sm tracking-wider text-muted-foreground uppercase">
                Weights
              </h3>
              <div className="space-y-2">
                <p className="text-xl font-normal">
                  Regular (400): {sampleText}
                </p>
                <p className="text-xl font-medium">
                  Medium (500): {sampleText}
                </p>
                <p className="text-xl font-bold">Bold (700): {sampleText}</p>
                <p className="text-xl font-extrabold">
                  ExtraBold (800): {sampleText}
                </p>
              </div>
            </section>

            <section>
              <h3 className="mb-2 text-sm tracking-wider text-muted-foreground uppercase">
                Characters
              </h3>
              <div className="space-y-4 rounded-lg bg-muted/50 p-4 break-all">
                <p className="text-xl">{alphabetUppercase}</p>
                <p className="text-xl">{alphabetLowercase}</p>
                <p className="text-xl">{numbers}</p>
                <p className="text-xl">{symbols}</p>
              </div>
            </section>
          </div>
        </div>

        {/* ABCFont Preview */}
        <div className="space-y-6 rounded-xl border bg-card p-6">
          <div className="border-b pb-4">
            <h2 className="mb-1 text-2xl font-semibold">ABC Favorit Mono</h2>
            <p className="text-sm text-muted-foreground">
              Class:{" "}
              <code className="rounded bg-muted px-1.5 py-0.5">
                font-abcfont
              </code>
            </p>
          </div>

          <div className="font-abcfont space-y-8">
            <section>
              <h3 className="mb-2 text-sm tracking-wider text-muted-foreground uppercase">
                Sample
              </h3>
              <p className="text-3xl leading-tight">{sampleText}</p>
            </section>

            <section>
              <h3 className="mb-2 text-sm tracking-wider text-muted-foreground uppercase">
                Weights
              </h3>
              <div className="space-y-2">
                <p className="text-xl font-normal">
                  Regular (400): {sampleText}
                </p>
                <p className="text-xl font-bold">Bold (700): {sampleText}</p>
              </div>
            </section>

            <section>
              <h3 className="mb-2 text-sm tracking-wider text-muted-foreground uppercase">
                Characters
              </h3>
              <div className="space-y-4 rounded-lg bg-muted/50 p-4 break-all">
                <p className="text-xl">{alphabetUppercase}</p>
                <p className="text-xl">{alphabetLowercase}</p>
                <p className="text-xl">{numbers}</p>
                <p className="text-xl">{symbols}</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
