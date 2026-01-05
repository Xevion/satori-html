# satori-html

[![npm version](https://img.shields.io/npm/v/@xevion/satori-html.svg)](https://www.npmjs.com/package/@xevion/satori-html)
[![CI](https://github.com/Xevion/satori-html/actions/workflows/ci.yml/badge.svg)](https://github.com/Xevion/satori-html/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg)](https://nodejs.org/)
[![Bun](https://img.shields.io/badge/Bun-compatible-000?logo=bun&logoColor=fff)](https://bun.sh/)

convert HTML strings to [satori](https://github.com/vercel/satori)-compatible VDOM objects for SVG generation.

## installation

```bash
npm install @xevion/satori-html
pnpm add @xevion/satori-html
bun add @xevion/satori-html
yarn add @xevion/satori-html
```

## what is this?

[satori](https://github.com/vercel/satori) generates SVG from HTML and CSS, but [expects React-like VDOM objects](https://github.com/vercel/satori#use-without-jsx) rather than HTML strings. this library bridges that gap by parsing HTML into the VDOM format satori requires.

> [!NOTE]
> forked from [natemoo-re/satori-html](https://github.com/natemoo-re/satori-html) to fix critical bugs and modernize the codebase.

## Example

```js
import satori from "satori";
import { html } from "@xevion/satori-html";

const markup = html`<div style="color: black;">hello, world</div>`;

// See https://github.com/vercel/satori#documentation
const svg = await satori(markup, {
  width: 600,
  height: 400,
  fonts: [],
});
```

The `html` utility can be used as a tagged template literal or as a function.

```js
// Tagged Template Literal
const tagged = html`<div style="color: ${color};">hello, world</div>`;
// Function
const fn = html('<div style="color: black;">hello, world</div>');
```
