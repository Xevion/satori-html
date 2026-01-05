import {
  parse,
  html as __html,
  walkSync,
  ELEMENT_NODE,
  DOCUMENT_NODE,
  TEXT_NODE,
  DoctypeNode,
} from "ultrahtml";
import inlineCSS from "ultrahtml/transformers/inline";

// Comprehensive Tailwind utility patterns
// Includes all common utilities to maximize tw prop detection
const TW_NAMES = new Set([
  // Layout
  /^(static|fixed|absolute|relative|sticky)$/,
  /^(block|inline-block|inline|flex|inline-flex|grid|inline-grid|hidden)$/,

  // Spacing (margin, padding)
  /^-?[mp](t|r|b|l|x|y)?-/,

  // Sizing
  /^(w|h|min-w|min-h|max-w|max-h|size)-/,

  // Flexbox & Grid
  /^(flex|grid)-/,
  /^(flex-row|flex-col|flex-wrap|flex-nowrap)$/,
  /^(gap|space-x|space-y)-/,
  /^(grid-cols|grid-rows|col-span|row-span|col-start|col-end|row-start|row-end)-/,
  /^(items|justify|content|self|place)(-|$)/,

  // Typography
  /^(text|font|leading|tracking)-/,
  /^(uppercase|lowercase|capitalize|normal-case|truncate)$/,
  /^(underline|line-through|no-underline|decoration)-/,

  // Colors & Backgrounds
  /^(bg|text|border|ring|divide|outline)-/,
  /^color-/,
  /^(from|via|to)-/,

  // Borders
  /^(border|rounded|divide)-/,
  /^(ring|outline)-/,

  // Effects
  /^(shadow|opacity)-/,
  /^(blur|brightness|contrast|grayscale|hue-rotate|invert|saturate|sepia|drop-shadow|backdrop)-/,

  // Transforms
  /^-?(rotate|scale|translate|skew)-/,
  /^(origin|transform)-/,

  // Transitions & Animations
  /^(animate|transition|duration|delay|ease)-/,

  // Interactivity
  /^(cursor|pointer-events|resize|select|appearance)-/,
  /^(overflow|overscroll|scroll)-/,

  // Positioning
  /^-?(top|right|bottom|left|inset|z)-/,

  // Display & Visibility
  /^(visible|invisible|collapse)$/,

  // Misc
  /^(aspect|object|list|float|clear|sr-only|not-sr-only)(-|$)/,
  /^(container|prose|antialiased|subpixel-antialiased)$/,
  /^(break|whitespace|content|will-change)(-|$)/,

  // Additional utilities
  "tint-",
  "elevation-",
  "line-clamp-",
]);

const inliner = inlineCSS();

const tw = (doc: DoctypeNode) => {
  walkSync(doc, (node) => {
    if (node.type !== ELEMENT_NODE) return;
    if (node.attributes.class && !node.attributes.tw) {
      const classNames = node.attributes.class.split(/\s+/);
      let match = false;

      for (const name of TW_NAMES) {
        if (match) break;

        for (const item of classNames) {
          if (match) break;

          // Check for responsive/state variants (anything with colon)
          if (item.indexOf(":") > -1) {
            match = true;
          } else if (typeof name === "string") {
            match = item.startsWith(name);
          } else {
            match = name.test(item);
          }
        }
      }

      if (match) {
        node.attributes.tw = node.attributes.class;
      }
    }
  });
};

const camelize = (ident: string) =>
  ident.replace(/-([a-z])/g, (_, char) => char.toUpperCase());

/**
 * CSS properties that can be applied to elements
 */
export interface CSSProperties {
  [key: string]: string | number | undefined;
}

/**
 * Props that can be applied to a VNode
 */
export interface VNodeProps {
  style?: CSSProperties;
  children?: VNodeChild | VNodeChild[];
  tw?: string;
  class?: string;
  [key: string]: unknown;
}

/**
 * A VNode child can be a string or another VNode
 */
export type VNodeChild = string | VNode;

/**
 * A Virtual DOM Node compatible with satori's ReactNode expectations
 */
export interface VNode {
  type: string;
  props: VNodeProps;
}

export function html(
  templates: string | TemplateStringsArray,
  ...expressions: unknown[]
): VNode {
  const result = __html.call(
    null,
    templates as TemplateStringsArray,
    ...expressions,
  );
  let doc = parse(result.value.trim());
  inliner(doc);
  tw(doc);

  const nodeMap = new WeakMap();
  let root: VNode = {
    type: "div",
    props: {
      style: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      },
      children: [],
    },
  };

  walkSync(doc, (node, parent, index) => {
    let newNode: VNode | string | undefined;

    if (node.type === DOCUMENT_NODE) {
      nodeMap.set(node, root);
    } else if (node.type === ELEMENT_NODE) {
      const vnode: VNode = {
        type: node.name,
        props: { children: [] },
      };

      const {
        style,
        "": _,
        ...props
      } = node.attributes as Record<string, unknown>;

      if (style) {
        const styleObj: CSSProperties = {};

        if (typeof style === "string") {
          // Parse CSS string to object (Bun compatibility)
          const declarations = style.split(";").filter((d: string) => d.trim());
          for (const decl of declarations) {
            const colonIndex = decl.indexOf(":");
            if (colonIndex === -1) continue;
            const property = decl.substring(0, colonIndex).trim();
            const value = decl.substring(colonIndex + 1).trim();
            styleObj[camelize(property)] = value;
          }
        } else if (typeof style === "object" && style !== null) {
          // Handle object syntax (backward compatibility)
          for (const [decl, value] of Object.entries(style)) {
            styleObj[camelize(decl)] = value as string;
          }
        }

        vnode.props.style = styleObj;
      }

      // Copy all other attributes
      Object.assign(vnode.props, props);

      newNode = vnode;
      nodeMap.set(node, newNode);

      if (parent && typeof index === "number") {
        const newParent = nodeMap.get(parent) as VNode;
        const children = newParent.props.children;
        if (Array.isArray(children)) {
          children[index] = newNode;
        }
      }
    } else if (node.type === TEXT_NODE) {
      const textContent = node.value.trim();

      if (textContent) {
        if (parent && typeof index === "number") {
          const newParent = nodeMap.get(parent) as VNode;

          if (parent.children.length === 1) {
            newParent.props.children = textContent;
          } else {
            const children = newParent.props.children;
            if (Array.isArray(children)) {
              children[index] = textContent;
            }
          }
        }
      }
    }
  });

  return root;
}
