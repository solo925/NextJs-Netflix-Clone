import DetailsPopup from "@/componets/details-popup";
import { GlobalContext } from "@/context";
import { getAllfavorites, getSimilarTVorMovies, getTVorMovieDetailsByID } from "@/utils";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Mock necessary functions and hooks
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("@/utils", () => ({
  getTVorMovieDetailsByID: jest.fn(),
  getSimilarTVorMovies: jest.fn(),
  getAllfavorites: jest.fn(),
}));

describe("DetailsPopup Component", () => {
  const mockPush = jest.fn();
  const setShow = jest.fn();
  const setMediaDetails = jest.fn();
  const setSimilarMedias = jest.fn();
  const setCurrentMediaInfoIdAndType = jest.fn();

  const contextValue = {
    mediaDetails: {},
    setMediaDetails,
    similarMedias: [],
    setSimilarMedias,
    currentMediaInfoIdAndType: { id: 1, type: "movie" },
    setCurrentMediaInfoIdAndType,
    loggedInAccount: { _id: "123" },
  };

  const mediaDetailsMock = {
    id: "1",
    title: "Movie Title",
    release_date: "2023-01-01",
    videos: { results: [{ type: "Trailer", key: "XuDwndGaCFo" }] },
  };

  const similarMoviesMock = [
    { id: "2", title: "Similar Movie 1", backdrop_path: "/backdrop1.jpg", poster_path: "/poster1.jpg" },
    { id: "3", title: "Similar Movie 2", backdrop_path: "/backdrop2.jpg", poster_path: "/poster2.jpg" },
  ];

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useSession as jest.Mock).mockReturnValue({ data: { user: { uid: "123" } } });
    (getTVorMovieDetailsByID as jest.Mock).mockResolvedValue(mediaDetailsMock);
    (getSimilarTVorMovies as jest.Mock).mockResolvedValue(similarMoviesMock);
    (getAllfavorites as jest.Mock).mockResolvedValue([]);
  });

  it("renders the DetailsPopup modal when show is true", async () => {
    render(
      <GlobalContext.Provider value={contextValue}>
        <DetailsPopup show={true} setShow={setShow} />
      </GlobalContext.Provider>
    );

    // Check if the modal is rendered
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("closes the modal when the close button is clicked", async () => {
    render(
      <GlobalContext.Provider value={contextValue}>
        <DetailsPopup show={true} setShow={setShow} />
      </GlobalContext.Provider>
    );

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);
    expect(setShow).toHaveBeenCalledWith(false);
  });

  it("navigates to the correct watch page when Play button is clicked", async () => {
    render(
      <GlobalContext.Provider value={contextValue}>
        <DetailsPopup show={true} setShow={setShow} />
      </GlobalContext.Provider>
    );

    const playButton = screen.getByRole("button", { name: /play/i });
    fireEvent.click(playButton);

    expect(mockPush).toHaveBeenCalledWith("/watch/movie/1");
  });

  it("loads media details and similar media items", async () => {
    render(
      <GlobalContext.Provider value={contextValue}>
        <DetailsPopup show={true} setShow={setShow} />
      </GlobalContext.Provider>
    );

    await waitFor(() => {
      expect(getTVorMovieDetailsByID).toHaveBeenCalledWith("movie", 1);
      expect(getSimilarTVorMovies).toHaveBeenCalledWith("movie", 1);
      expect(getAllfavorites).toHaveBeenCalledWith("123", "123");
    });

    
    expect(screen.getByText("Movie Title")).toBeInTheDocument();
    expect(screen.getByText("Similar Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Similar Movie 2")).toBeInTheDocument();
  });

  it("shows the trailer video in the modal", async () => {
    render(
      <GlobalContext.Provider value={contextValue}>
        <DetailsPopup show={true} setShow={setShow} />
      </GlobalContext.Provider>
    );

    const videoElement = screen.getByRole("video");
    expect(videoElement).toBeInTheDocument();
  });

  it("does not display media details if currentMediaInfoIdAndType is null", async () => {
    const emptyContextValue = { ...contextValue, currentMediaInfoIdAndType: null };

    render(
      <GlobalContext.Provider value={emptyContextValue}>
        <DetailsPopup show={true} setShow={setShow} />
      </GlobalContext.Provider>
    );

   
    await waitFor(() => {
      expect(screen.queryByText("Movie Title")).not.toBeInTheDocument();
    });
  });
});
