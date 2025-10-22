import FennecLiveInfo from "./fennec-live-info";
import TransferInfo from "./transfer-info";
import TransferItemsInfo from "./transfer-items-info";

export default function TransferDetails() {
  return (
    <div className="space-y-6 px-6 py-8">
      <TransferInfo />
      <TransferItemsInfo />
      <FennecLiveInfo />
      <div className="space-y-4">
        <h3>Activity Log</h3>
        <p>N/A</p>
      </div>
    </div>
  );
}
