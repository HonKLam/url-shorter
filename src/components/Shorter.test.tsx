import {describe, it, vi} from "vitest";
import Shorter from "./Shorter";

describe("Shorter", () => {
  it("renders without error", () => {
    <Shorter onLinkChange={vi.fn()} />;
  });
});
