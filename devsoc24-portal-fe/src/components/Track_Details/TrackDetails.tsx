import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

function TrackDetails() {
  return (
    <>
      <DialogContent className="sm:max-w-[1208px] min-h-[0] h-fit">
        <DialogHeader>
          <DialogTitle>Track Details</DialogTitle>
        </DialogHeader>
        <div className="font-semibold space-y-10 text-gray-500 overflow-y-auto">
          <div>
            <p className="font-bold color-grey">1. Hardware Platform</p>
            <ul className="list-disc pl-6">
              <li>
                <span className="inline-block pr-6"></span>NFT Minting Website is designed to be platform-independent,
                capable of running on a wide range of hardware configurations,
                including desktop computers, laptops, tablets, and mobile
                devices.
              </li> 
              <li>
                <span className="inline-block pr-6"></span>It should be compatible with standard hardware components such
                as processors, memory, storage devices, and network interfaces.
              </li>
            </ul>
          </div>
          <div>
            <p className="font-bold">2. Operating System (OS) and Versions:</p>
            <ul className="list-disc pl-6">
              <li>
                <span className="inline-block pr-6"></span>Desktop/Laptop: Compatible with major operating systems
                including Windows (versions 7, 8, and 10), macOS (versions
                10.12 and above), and Linux distributions (Ubuntu, Fedora,
                etc).
              </li>
              <li>
                <span className="inline-block pr-6"></span>Mobile Devices: Compatible with iOS (versions 11 and above)
                for Apple devices and Android (versions 7.0 and above) for
                Android devices.
              </li>
              <li>
                <span className="inline-block pr-6"></span>Web Browsers: Compatible with modern web browsers such as
                Google Chrome, Mozilla Firefox, Safari, and Microsoft Edge,
                with support for the latest stable versions.
              </li>
            </ul>
          </div>
          <div>
            <p className="font-bold">3. Software Components:</p>
            <ul className="list-disc pl-6">
              <li>
                <span className="inline-block pr-6"></span>Web Server: The NFT Minting Website requires a web server
                environment for hosting the application. Common options include
                Apache HTTP Server, Nginx, or Microsoft Internet Information
                Services (IIS).
              </li>
              <li>
                <span className="inline-block pr-6"></span>Database: Compatibility with database management systems such
                as MySQL, PostgreSQL, MongoDB, or SQLite for data storage and
                retrieval.
              </li>
              <li>
                <span className="inline-block pr-6"></span>Blockchain Network: Integration with compatible blockchain
                networks such as Ethereum, Binance Smart Chain, or others for
                NFT creation, management, and transactions.
              </li>
              <li>
                <span className="inline-block pr-6"></span>External APIs: Integration with third-party services and APIs
                for functionalities such as wallet management, payment
                processing, and social media sharing.
              </li>
            </ul>
          </div>
          <div>
            <p className="font-bold">4. Dependencies and Compatibility:</p>
            <p>
              <span className="inline-block pr-6"></span>The software must peacefully coexist with other applications and
              components installed on the user's system, ensuring compatibility
              and avoiding conflicts.
            </p>
          </div>
        </div>
      </DialogContent>
    </>
  );
}

export default TrackDetails;
