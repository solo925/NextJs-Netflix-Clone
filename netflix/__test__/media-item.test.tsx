import MediaItem from "@/components/MediaItem";
import { GlobalContext } from "@/context";
import { Media } from "@/types";
import { fireEvent, render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";

// Mocking the necessary contexts and session hook
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

describe("MediaItem Component", () => {
  const mockMedia: Media = {
    id: 1,
    type: "movie",
    backdrop_path: "/image.jpg",
    poster_path: "/poster.jpg",
    addedToFavorites: false,
    movieID: 123,
    title: "Test Movie",
  };

  const setFavorites = jest.fn();
  const setShowDetailsPopup = jest.fn();
  const setCurrentMediaInfoIdAndType = jest.fn();
  const setSimilarMedias = jest.fn();
  const setSearchResults = jest.fn();
  const setMediaData = jest.fn();

  const mockContextValue = {
    setShowDetailsPopup,
    loggedInAccount: { _id: "123" },
    setFavorites,
    setCurrentMediaInfoIdAndType,
    similarMedias: [],
    searchResults: [],
    setSearchResults,
    setSimilarMedias,
    setMediaData,
    mediaData: [],
  };

  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({ data: { user: { uid: "123" } } });
  });

  it("renders the media item with image and title", () => {
    render(
      <GlobalContext.Provider value={mockContextValue}>
        <MediaItem media={mockMedia} />
      </GlobalContext.Provider>
    );

    expect(screen.getByAltText("Media")).toBeInTheDocument();
    expect(screen.getByText("Test Movie")).toBeInTheDocument();
  });

  it("handles adding to favorites", async () => {
    const addFavoriteMock = jest.fn();
    global.fetch = jest.fn().mockResolvedValue({ json: () => ({ success: true }) });

    render(
      <GlobalContext.Provider value={mockContextValue}>
        <MediaItem media={mockMedia} />
      </GlobalContext.Provider>
    );

    const addButton = screen.getByRole("button", { name: /add to favorites/i });
    fireEvent.click(addButton);

    expect(global.fetch).toHaveBeenCalledWith("/api/favorites/add-favorite", expect.any(Object));
    expect(setFavorites).toHaveBeenCalled();
  });

  it("handles removing from favorites", async () => {
    const removeFavoriteMock = jest.fn();
    global.fetch = jest.fn().mockResolvedValue({ json: () => ({ success: true }) });

    mockMedia.addedToFavorites = true;

    render(
      <GlobalContext.Provider value={mockContextValue}>
        <MediaItem media={mockMedia} />
      </GlobalContext.Provider>
    );

    const removeButton = screen.getByRole("button", { name: /remove from favorites/i });
    fireEvent.click(removeButton);

    expect(global.fetch).toHaveBeenCalledWith("/api/favorites/remove-favorite", expect.any(Object));
    expect(setFavorites).toHaveBeenCalled();
  });

  it("opens the details popup when clicking the details button", () => {
    render(
      <GlobalContext.Provider value={mockContextValue}>
        <MediaItem media={mockMedia} />
      </GlobalContext.Provider>
    );

    const detailsButton = screen.getByRole("button", { name: /details/i });
    fireEvent.click(detailsButton);

    expect(setShowDetailsPopup).toHaveBeenCalledWith(true);
    expect(setCurrentMediaInfoIdAndType).toHaveBeenCalledWith({
      type: "movie",
      id: mockMedia.movieID,
    });
  });

  it("navigates to the watch page when clicking the media item", () => {
    const mockPush = jest.fn();
    jest.spyOn(require("next/navigation"), "useRouter").mockReturnValue({ push: mockPush });

    render(
      <GlobalContext.Provider value={mockContextValue}>
        <MediaItem media={mockMedia} />
      </GlobalContext.Provider>
    );

    const mediaImage = screen.getByAltText("Media");
    fireEvent.click(mediaImage);

    expect(mockPush).toHaveBeenCalledWith(`/watch/movie/${mockMedia.id}`);
  });
});
