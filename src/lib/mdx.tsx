import { compile, run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { Fragment } from "react";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import Callout from "@/components/Callout";
import ArxivLink from "@/components/ArxivLink";
import ImageWithSource from "@/components/ImageWithSource";

const components = {
  Callout,
  ArxivLink,
  ImageWithSource,
};

export async function renderMDX(source: string) {
  const code = String(
    await compile(source, {
      outputFormat: "function-body",
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [rehypeKatex],
    })
  );

  const { default: MDXContent } = await run(code, {
    ...runtime,
    Fragment,
    baseUrl: import.meta.url,
  });

  return function RenderedContent() {
    return <MDXContent components={components} />;
  };
}
