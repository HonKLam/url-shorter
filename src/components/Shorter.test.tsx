import {describe, it, vi, expect} from "vitest";
import userEvent from "@testing-library/user-event";
import {screen, render, waitFor, fireEvent} from "@testing-library/react";
import Shorter from "./Shorter";

const mockGenerateShortenedLink = vi.fn();

vi.mock("../utils", () => ({
  createShortLinkURL: () => "shortened-link",
  generateShortenedLink: () => mockGenerateShortenedLink(),
}));

describe("Shorter", () => {
  it("renders without error", () => {
    render(<Shorter onLinkChange={vi.fn()} />);
  });

  it("rendering an error if Shorten-Button is clicked without link", async () => {
    // ARRANGE
    const mockOnLinkChange = vi.fn();
    const user = userEvent.setup();
    render(<Shorter onLinkChange={mockOnLinkChange} />);

    // ACT
    await user.click(screen.getByText("Shorten It!"));

    // ASSERT
    await waitFor(() => {
      expect(screen.getByText("Please add a valid link")).toBeInTheDocument();
    });
  });

  it("calls onLinkChange with original and shortened link values", async () => {
    const mockOnLinkChange = vi.fn();
    const user = userEvent.setup();
    const wantedShortenedLink = "https://meet.google.com/blah-dmnd-pek&shortened";
    mockGenerateShortenedLink.mockResolvedValue(wantedShortenedLink);
    render(<Shorter onLinkChange={mockOnLinkChange} />);

    fireEvent.change(screen.getByRole("textbox"), {target: {value: "https://meet.google.com/blah-dmnd-pek"}});
    await user.click(screen.getByText("Shorten It!"));

    expect(mockOnLinkChange).toHaveBeenCalledTimes(1);
    expect(mockOnLinkChange).toHaveBeenCalledWith({
      originalLink: "https://meet.google.com/blah-dmnd-pek",
      shortenedLink: wantedShortenedLink,
    });
  });

  // This does NOT work for some reason... (Expedted vs Received value not aligning, although previous test works...)
  it("should show errorc with invalid link + clicking on button", async () => {
    const mockOnLinkChange = vi.fn();
    const user = userEvent.setup();

    render(<Shorter onLinkChange={mockOnLinkChange} />);

    fireEvent.change(screen.getByRole("textbox"), {target: {value: "invalid-link"}});
    await user.click(screen.getByText("Shorten It!"));

    waitFor(() => {
      expect(screen.getByText("Please add a valid link")).toBeInTheDocument();
    });
    expect(mockOnLinkChange).not.toHaveBeenCalled();
  });
});
