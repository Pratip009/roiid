import React from 'react';
import QRCode from 'qrcode.react';

const UserQRCode = ({ value }) => {
  return (
    <div>
      <QRCode value={value} size={70} level={"H"} includeMargin={true} />
    </div>
  );
};

export default UserQRCode;
