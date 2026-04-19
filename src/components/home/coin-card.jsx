import { TrendingDown, TrendingUp } from "lucide-react";
import {
  formatPrice,
  formatPercantage,
  formatBigNumber,
} from "../../utils/helpers";
import { Link } from "react-router-dom";

const CoinCard = ({ coin }) => {
  const isPositive = coin.price_change_percentage_24h >= 0;
  const color = isPositive ? "text-green-700" : "text-red-700";
  const icon = isPositive ? (
    <TrendingUp className="size-4" />
  ) : (
    <TrendingDown className="size-4" />
  );

  return (
    <Link
      to={`/coin/${coin.id}`}
      className="bg-zinc-100/10 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg p-6 hover:scale-105 transition"
    >
      {/*ust kisim*/}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={coin.image}
              alt={coin.symbol}
              width={48}
              height={48}
              className="size-12 rounded-full"
            />
            <span className="absolute -top-2 -right-2 bg-blue-700 size-6 text-xs flex items-center justify-center font-bold rounded-full text-white">
              {coin.market_cap_rank}
            </span>
          </div>
          <div>
            <h1 className="font-bold text-lg text-gray-900 dark:text-white">
              {coin.symbol}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-40 truncate">
              {coin.name}
            </p>
          </div>
        </div>
      </div>

      {/*orta kisim*/}
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="card-label">Fiyat</span>
          <span className="card-value text-xl font-bold">
            {formatPrice(coin.current_price)}
          </span>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="card-label">24s Değişim (%)</span>
          <span
            className={`card-value text-xl font-semibold flex items-center gap-1 ${color}`}
          >
            {icon} {formatPercantage(coin.price_change_percentage_24h)}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="card-label">Market Hacmi</span>
          <span className="card-value ">
            {formatBigNumber(coin.market_cap)}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="card-label">24s Hacim</span>
          <span className="card-value">
            {formatBigNumber(coin.total_volume)}
          </span>
        </div>
      </div>

      {/*alt kisim*/}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between text-gray-500 dark:text-gray-400">
        <span>#{coin.merket_cap_rank}</span>
        <span>
          {new Date(coin.last_updated).toLocaleDateString("tr", {
            day: "2-digit",
            month: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </Link>
  );
};

export default CoinCard;
