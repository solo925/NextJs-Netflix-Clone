import MediaRow from "@/components/MediaRow";
import { GlobalContext } from "@/context";
import { Media } from "@/types";
import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";

// Mocking the necessary contexts and session hook
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

describe("MediaRow Component", () => {
  const mockMedias: Media[] = [
    {
      id: 1,
      type: "movie",
      backdrop_path: "/image1.jpg",
      poster_path: "/poster1.jpg",
      addedToFavorites: false,
      movieID: 123,
      title: "Test Movie 1",
    },
    {
      id: 2,
      type: "movie",
      backdrop_path: "/image2.jpg",
      poster_path: "/poster2.jpg",
      addedToFavorites: false,
      movieID: 124,
      title: "Test Movie 2",
    },
  ];

  const mockContextValue = {
    setShowDetailsPopup: jest.fn(),
    loggedInAccount: { _id: "123" },
    setFavorites: jest.fn(),
    setCurrentMediaInfoIdAndType: jest.fn(),
    similarMedias: [],
    searchResults: [],
    setSearchResults: jest.fn(),
    setSimilarMedias: jest.fn(),
    setMediaData: jest.fn(),
    mediaData: [],
  };

  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({ data: { user: { uid: "123" } } });
  });

  it("renders MediaRow with title and media items", () => {
    render(
      <GlobalContext.Provider value={mockContextValue}>
        <MediaRow title="Test Row Title" medias={mockMedias} />
      </GlobalContext.Provider>
    );

    // Check that the title is rendered
    expect(screen.getByText("Test Row Title")).toBeInTheDocument();

    // Check that the correct number of media items are rendered
    expect(screen.getAllByAltText("Media")).toHaveLength(2);
  });

  it("renders nothing when no medias are provided", () => {
    render(
      <GlobalContext.Provider value={mockContextValue}>
        <MediaRow title="Empty Row" medias={[]} />
      </GlobalContext.Provider>
    );

    // The media items should not be rendered
    expect(screen.queryByAltText("Media")).toBeNull();
  });

  it("filters media items with missing backdrop or poster path", () => {
    const mediasWithNullPaths: Media[] = [
      {
        id: 1,
        type: "movie",
        backdrop_path: null,
        poster_path: "/poster1.jpg",
        addedToFavorites: false,
        movieID: 123,
        title: "Invalid Media",
      },
      {
        id: 2,
        type: "movie",
        backdrop_path: "/image2.jpg",
        poster_path: "/poster2.jpg",
        addedToFavorites: false,
        movieID: 124,
        title: "Valid Media",
      },
    ];

    render(
      <GlobalContext.Provider value={mockContextValue}>
        <MediaRow title="Filtered Row" medias={mediasWithNullPaths} />
      </GlobalContext.Provider>
    );

    // Only the valid media should be rendered
    expect(screen.getByAltText("Media")).toBeInTheDocument();
    expect(screen.queryByText("Invalid Media")).toBeNull();
  });
});
