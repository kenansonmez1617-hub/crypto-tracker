import { RefreshCw } from "lucide-react";

const RefreshButton = ({ refreshing, fetchCoins }) => {
  return (
    <button
      aria-label="Güncel verileri çek"
      disabled={refreshing}
      onClick={() => fetchCoins(true)}
      className="p-3 bg-blue-600 rounded-lg text-white"
    >
      <RefreshCw />
    </button>
  );
};

export default RefreshButton;
