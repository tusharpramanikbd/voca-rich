import { QRCodeCanvas } from "qrcode.react";

const QRCode = () => {
  const appUrl = `${window.location.origin}/app`;

  return (
    <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
      <div className="mb-6">
        <h3 className="text-3xl mb-8 font-bold bg-linear-to-r from-white to-teal-100 bg-clip-text text-transparent">
          Scan QR code
        </h3>
        <div className="bg-white/30 backdrop-blur-xl p-8 pb-6 rounded-3xl shadow-2xl border border-white/50">
          <div className="bg-white p-6 rounded-2xl shadow-xl flex items-center justify-center">
            <QRCodeCanvas
              value={appUrl}
              size={200}
              bgColor="#FFFFFF"
              fgColor="#000000"
              imageSettings={{
                src: "image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyUzYuNDggMjIgMTIgMjJTMjIgMTcuNTIgMjIgMTJDMTcuNTIgMTIgMTIgNi40OCAxMiAyWiIgZmlsbD0iIzFCQUY1OCIvPgo8L3N2Zz4K",
                excavate: true,
                height: 24,
                width: 24,
              }}
            />
          </div>
          <p className="text-sm text-center text-teal-100 mt-4 font-medium">
            Opens VocaRich on mobile
          </p>
        </div>
      </div>
    </div>
  );
};

export default QRCode;
