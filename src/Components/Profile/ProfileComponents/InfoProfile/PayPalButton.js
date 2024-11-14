import React from 'react';

const PayPalButton = () => {
  const loadPayPalSdk = () => {
    const paypalWindow = window.open('', '_blank', 'width=600,height=600');

    if (paypalWindow) {
      const htmlContent = `
        <html>
          <head>
            <script src="https://www.paypal.com/sdk/js?client-id=Ae3Es36eFLC_jSRxuhVwe-5-JLvoQTaIvCRZeRAL8B0F5PnpFF3uFT-GIIGdHecGdTHmPwjL6fBppgMQ"></script>
          </head>
          <body>
            <div id="paypal-button-container"></div>
            <script>
              paypal.Buttons({
                createOrder: (data, actions) => {
                  return actions.order.create({
                    purchase_units: [{
                      amount: {
                        value: '0.01', // Replace with the actual amount
                      },
                    }],
                  });
                },
                onApprove: (data, actions) => {
                  return actions.order.capture().then((details) => {
                    alert('Transaction completed by ' + details.payer.name.given_name);
                    window.close(); // Close the window after the transaction is complete
                  });
                },
                onCancel: () => {
                  window.close(); // Close the window if the user cancels the transaction
                },
                onError: (err) => {
                  alert('An error occurred during the transaction');
                  window.close(); // Close the window if an error occurs
                }
              }).render('#paypal-button-container');
            </script>
          </body>
        </html>
      `;

      paypalWindow.document.write(htmlContent);
      paypalWindow.document.close();
    } else {
      alert('Unable to open PayPal window. Please disable any popup blockers and try again.');
    }
  };

  return (
    <div>
      {/* <button onClick={loadPayPalSdk}>Pay with PayPal</button> */}
    </div>
  );
};

export default PayPalButton;
