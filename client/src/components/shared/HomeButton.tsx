import { Button } from "@mui/material";
import { Link } from "react-router-dom";

interface Props {
  message: string;
}

const HomeButton = (props: Props) => {
  return (
    <Button
      component={Link}
      size="small"
      variant="contained"
      to="/"
      style={{
        display: "flex",
        width: "fit-content",
        backgroundColor: "#CAC2B9",
        margin: "1rem auto",
      }}
    >
      {props.message}
    </Button>
  );
};

export default HomeButton;
