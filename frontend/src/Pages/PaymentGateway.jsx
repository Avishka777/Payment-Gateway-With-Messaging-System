import axios from "axios";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import StripeCheckout from "react-stripe-checkout";
import { Box, Button, Container, Typography } from "@mui/material";

const PaymentGateway = () => {
  const [stripeToken, setStripeToken] = useState();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/stripe/payment",
          {
            tokenId: stripeToken.id,
            amount: 100,
            email: stripeToken.email,
          }
        );
        console.log(response);
        swal({
          title: "Payment Successful!",
          text: "Your payment has been processed successfully.",
          icon: "success",
          button: "OK",
        });
      } catch (err) {
        console.log(err);
        swal({
          title: "Payment Unsuccessful!",
          text: "There was an error processing your payment. Please try again later.",
          icon: "error",
          button: "OK",
        });
      }
    };
    if (stripeToken) {
      makeRequest();
    }
  }, [stripeToken]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Payment Gateway
        </Typography>
        <StripeCheckout
          name="Knowlage.net"
          billingAddress
          description="Payment for Course"
          amount={100} // Amount in cents
          token={onToken}
          stripeKey="pk_test_51PAu2GAHeHiratLE7Ms4HuD72on5IDaxCrWf6wyagVxQLftAf1vptM16FE49I9WzjZ3HlsWgJZVRX5aCpnr4SxjR00jctG9rNQ"
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
              padding: "10px 20px",
              fontWeight: "bold",
            }}
          >
            Pay Now
          </Button>
        </StripeCheckout>
      </Box>
    </Container>
  );
};

export default PaymentGateway;