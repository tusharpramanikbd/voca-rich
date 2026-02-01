import { QRCodeCanvas } from "qrcode.react";

const QRCode = () => {
  const appUrl = `${window.location.origin}/app`;

  return (
    <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
      <div className="mb-6">
        <h3 className="text-3xl mb-8 font-bold bg-linear-to-r from-white to-teal-100 bg-clip-text text-transparent">
          Scan QR code
        </h3>
        <div className="bg-white/20 backdrop-blur-xl p-6 pb-4 rounded-3xl shadow-2xl border border-white/30">
          <div className="bg-white p-4 rounded-2xl shadow-lg">
            <QRCodeCanvas
              value={appUrl}
              size={180}
              bgColor="transparent"
              imageSettings={{
                src: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyUzYuNDggMjIgMTIgMjJTMjIgMTcuNTIgMjIgMTJDMTcuNTIgMTIgMTIgNi40OCAxMiAyWiIgZmlsbD0iIzFCQUY1OCIvPgo8L3N2Zz4K",
                excavate: true,
                height: 40,
                width: 40,
              }}
            />
          </div>
          <p className="text-sm text-center text-teal-100 mt-3 font-medium">
            Opens VocaRich on mobile
          </p>
        </div>
      </div>
    </div>
  );
};

export default QRCode;
