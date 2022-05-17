import { Container, Box, Typography } from "@mui/material";
import { Component, ErrorInfo, ReactNode } from "react";
import HomeButton from "./HomeButton";

interface Props {
  children: ReactNode;
  onGoBack: () => void;
}

interface State {
  hasError: boolean;
  message: string;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("uncaught error: " + { error, errorInfo });
  }

  resetState = () => {
    this.setState({ hasError: false });
    this.props.onGoBack();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "1rem",
          }}
        >
          <Box
            sx={{
              height: "20rem",
              pt: "10rem",
            }}
          >
            <Typography sx={{ textAlign: "center", fontFamily: "Prata" }}>
              This page doesn't seem to exist.
            </Typography>
            <HomeButton message="Back to home" />
          </Box>
        </Container>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
