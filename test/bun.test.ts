import { describe, test, expect } from "vitest";
import { htmlSuite } from "./suites/html.suite";
import { tailwindSuite } from "./suites/tailwind.suite";

const vitestRunner = { describe, test, expect };

htmlSuite(vitestRunner);
tailwindSuite(vitestRunner);
