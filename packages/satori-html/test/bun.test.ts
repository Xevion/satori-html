import { describe, test, expect } from "bun:test";
import { htmlSuite } from "./suites/html.suite";
import { tailwindSuite } from "./suites/tailwind.suite";
import { html } from "../src/index";

const bunRunner = { describe, test, expect };

describe("Bun Runtime - Issue #24", () => {
  test("documents known CSS inlining failure", () => {
    expect(() => {
      html`<div class="cool">Hello world</div>
        <style>
          .cool {
            color: red;
          }
        </style>`;
    }).toThrow();
  });

  test("simple HTML without CSS inlining works", () => {
    const result = html`<div>Hello world</div>`;
    expect(result.props.children[0].type).toBe("div");
    expect(result.props.children[0].props.children).toBe("Hello world");
  });

  test("inline styles (not CSS inlining) work", () => {
    const result = html`<div style="color: red;">Hello</div>`;
    expect(result.props.children[0].props.style.color).toBe("red");
  });
});

htmlSuite(bunRunner);
tailwindSuite(bunRunner);
