import type { TestRunner } from "./types.js";
import { html } from "../../src/index.js";

export function tailwindSuite(runner: TestRunner) {
  const { describe, test, expect } = runner;

  describe("tailwind", () => {
    test("picks up margin util", async () => {
      const result = html`<div class="m-4">Hello world</div>`;
      expect("tw" in result.props.children?.[0].props).toEqual(true);
    });
    test("picks up padding util", async () => {
      const result = html`<div class="p-4">Hello world</div>`;
      expect("tw" in result.props.children?.[0].props).toEqual(true);
    });
    test("picks up color", async () => {
      const result = html`<div class="color-red">Hello world</div>`;
      expect("tw" in result.props.children?.[0].props).toEqual(true);
    });
    test("picks up flex", async () => {
      const result = html`<div class="flex">Hello world</div>`;
      expect("tw" in result.props.children?.[0].props).toEqual(true);
    });
    test("picks up width", async () => {
      const result = html`<div class="w-4">Hello world</div>`;
      expect("tw" in result.props.children?.[0].props).toEqual(true);
    });
    test("picks up height", async () => {
      const result = html`<div class="h-4">Hello world</div>`;
      expect("tw" in result.props.children?.[0].props).toEqual(true);
    });
    test(`picks up min-w-`, () => {
      const result = html`<div class="min-w-0">Hello world</div>`;
      expect("tw" in result.props.children?.[0].props).toEqual(true);
    });
    test(`picks up min-h-`, () => {
      const result = html`<div class="min-h-0">Hello world</div>`;
      expect("tw" in result.props.children?.[0].props).toEqual(true);
    });
    test(`picks up max-w-`, () => {
      const result = html`<div class="max-w-0">Hello world</div>`;
      expect("tw" in result.props.children?.[0].props).toEqual(true);
    });
    test(`picks up max-h-`, () => {
      const result = html`<div class="max-h-0">Hello world</div>`;
      expect("tw" in result.props.children?.[0].props).toEqual(true);
    });
    test(`picks up leading-`, () => {
      const result = html`<div class="leading-loose">Hello world</div>`;
      expect("tw" in result.props.children?.[0].props).toEqual(true);
    });
    test(`picks up text-`, () => {
      const result = html`<div class="text-sm">Hello world</div>`;
      expect("tw" in result.props.children?.[0].props).toEqual(true);
    });
    test(`picks up opacity-`, () => {
      const result = html`<div class="opacity-100">Hello world</div>`;
      expect("tw" in result.props.children?.[0].props).toEqual(true);
    });
    test(`picks up font-`, () => {
      const result = html`<div class="font-sm">Hello world</div>`;
      expect("tw" in result.props.children?.[0].props).toEqual(true);
    });
    test(`picks up aspect-`, () => {
      const result = html`<div class="aspect-1">Hello world</div>`;
      expect("tw" in result.props.children?.[0].props).toEqual(true);
    });
    test(`picks up tint-`, () => {
      const result = html`<div class="tint-red">Hello world</div>`;
      expect("tw" in result.props.children?.[0].props).toEqual(true);
    });
    test(`picks up bg-`, () => {
      const result = html`<div class="bg-red">Hello world</div>`;
      expect("tw" in result.props.children?.[0].props).toEqual(true);
    });
    test(`picks up opacity-`, () => {
      const result = html`<div class="opacity-80">Hello world</div>`;
      expect("tw" in result.props.children?.[0].props).toEqual(true);
    });
    test(`picks up shadow-`, () => {
      const result = html`<div class="shadow-sm">Hello world</div>`;
      expect("tw" in result.props.children?.[0].props).toEqual(true);
    });
    test(`picks up rounded`, () => {
      const result = html`<div class="rounded-sm">Hello world</div>`;
      expect("tw" in result.props.children?.[0].props).toEqual(true);
    });
    test(`picks up top-`, () => {
      const result = html`<div class="top-0">Hello world</div>`;
      expect("tw" in result.props.children?.[0].props).toEqual(true);
    });
    test(`picks up right-`, () => {
      const result = html`<div class="right-0">Hello world</div>`;
      expect("tw" in result.props.children?.[0].props).toEqual(true);
    });
    test(`picks up bottom-`, () => {
      const result = html`<div class="bottom-0">Hello world</div>`;
      expect("tw" in result.props.children?.[0].props).toEqual(true);
    });
    test(`picks up left-`, () => {
      const result = html`<div class="left-0">Hello world</div>`;
      expect("tw" in result.props.children?.[0].props).toEqual(true);
    });
    test(`picks up inset-`, () => {
      const result = html`<div class="inset-0">Hello world</div>`;
      expect("tw" in result.props.children?.[0].props).toEqual(true);
    });
    test(`picks up border`, () => {
      const result = html`<div class="border-sm">Hello world</div>`;
      expect("tw" in result.props.children?.[0].props).toEqual(true);
    });
    test(`picks up elevation-`, () => {
      const result = html`<div class="elevation-0">Hello world</div>`;
      expect("tw" in result.props.children?.[0].props).toEqual(true);
    });
    test(`picks up tracking-`, () => {
      const result = html`<div class="tracking-0">Hello world</div>`;
      expect("tw" in result.props.children?.[0].props).toEqual(true);
    });
    test(`picks up z-`, () => {
      const result = html`<div class="z-0">Hello world</div>`;
      expect("tw" in result.props.children?.[0].props).toEqual(true);
    });
  });
}
