import {
  Box,
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { FormEvent, useState } from "react";
import { useCart } from "../../context/CartContextProvider";
import { shippingProvider } from "../../ShippingProviderData";

const DeliveryOptions = () => {
  const { selectShippment } = useCart();
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const handleRadioChange = (event: FormEvent<HTMLInputElement>) => {
    setDeliveryMethod(event.currentTarget.value);
  };

  return (
    <Container
      sx={{
        padding: "1rem",
      }}
    >
      <Typography
        sx={{
          textTransform: "uppercase",
          fontFamily: "Prata",
          mt: "1rem",
          mb: "1rem",
        }}
        variant="h5"
      >
        2. Delivery Method
      </Typography>

      <Box
        sx={{
          backgroundColor: "#F3F2F0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: { xs: "1rem", sm: "2rem", md: "2rem", lg: "2rem" },
        }}
      >
        <RadioGroup
          aria-label="delivery method"
          name="delivery"
          onChange={handleRadioChange}
          value={deliveryMethod}
        >
          {shippingProvider.map((provider) => {
            return provider.cost !== 0 ? (
              <FormControlLabel
                control={<Radio required={true} />}
                value={provider.providerName}
                key={provider.providerName}
                onClick={() => selectShippment(provider)}
                label={
                  <Box
                    sx={{
                      display: "flex",
                      placeItems: "center",
                      justifyContent: "space-between",
                      m: "1rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <img
                      src={provider.logoImage}
                      alt={provider.providerName}
                      height="18px"
                    />
                    <Typography variant="body2" sx={{ marginX: "1rem" }}>
                      {provider.cost} SEK
                    </Typography>
                    <Typography variant="overline" color="#6C665F">
                      ({provider.deliveryTime})
                    </Typography>
                  </Box>
                }
              />
            ) : (
              <FormControlLabel
                control={<Radio required={true} />}
                value={provider.providerName}
                key={provider.providerName}
                onClick={() => selectShippment(provider)}
                label={
                  <Box
                    sx={{
                      display: "flex",
                      placeItems: "center",
                      justifyContent: "space-between",
                      m: "1rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography variant="body2" style={{ fontWeight: "bold" }}>
                      {provider.providerName}
                    </Typography>
                    <Typography variant="body2" sx={{ marginX: "1rem" }}>
                      FREE
                    </Typography>
                    <Typography variant="overline" color="#6C665F">
                      ({provider.deliveryTime})
                    </Typography>
                  </Box>
                }
              />
            );
          })}
        </RadioGroup>
      </Box>
    </Container>
  );
};
export default DeliveryOptions;
