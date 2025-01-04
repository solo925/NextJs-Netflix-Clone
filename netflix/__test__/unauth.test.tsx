import UnauthPage from "@/componets/unauth-page";
import { fireEvent, render, screen } from "@testing-library/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

describe("UnauthPage Component", () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it("renders the UnauthBanner with correct title and button", () => {
    render(<UnauthPage />);

    expect(screen.getByAltText("netflix")).toBeInTheDocument();
    

    const signInButton = screen.getByText("Sign In to Get Started");
    expect(signInButton).toBeInTheDocument();
    fireEvent.click(signInButton);
    expect(signIn).toHaveBeenCalledWith("github");
  });

  it("renders the FAQ section with questions", () => {
    render(<UnauthPage />);
    expect(screen.getByText(/Frequently asked questions/i)).toBeInTheDocument();
    
    
    questions.forEach((question) => {
      expect(screen.getByText(question.ques)).toBeInTheDocument();
    });
  });

  it("toggles answer visibility when question is clicked", () => {
    render(<UnauthPage />);

    const question = screen.getByText(questions[0].ques);
    const initialAnswer = screen.queryByText(questions[0].ans);
    expect(initialAnswer).toBeNull();

   
    fireEvent.click(question);
    expect(screen.getByText(questions[0].ans)).toBeInTheDocument();
    fireEvent.click(question);

  
    expect(screen.queryByText(questions[0].ans)).toBeNull();
  });

  it("navigates to the home page when the logo is clicked", () => {
    render(<UnauthPage />);

    const logo = screen.getByAltText("netflix");
    fireEvent.click(logo);

    
    expect(mockRouter.push).toHaveBeenCalledWith("/");
  });
});
