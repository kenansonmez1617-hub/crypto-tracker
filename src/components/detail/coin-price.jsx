import { TrendingDown, TrendingUp } from "lucide-react";
import { formatPrice, formatPercantage } from "../../utils/helpers";
const CoinPrice = ({ coin }) => {
  const isPositive = coin.market_data.price_change_percentage_24h >= 0;
  return (
    <div className="box">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-gray-600 dark:Text-gray-400 mb-1">
            Güncel Fiyat
          </p>
          <p className="text-4xl font-bold text-gray-900 dark:text-white">
            {formatPrice(coin.market_data.current_price.usd)}
          </p>
        </div>
        <div
          className={`flex items-center gap-2 ${isPositive ? "text-green-500" : "text-red-500"}`}
        >
          {isPositive ? <TrendingUp /> : <TrendingDown />}

          <div className="text-right">
            <p className="text-lg font-semibold">
              {formatPercantage(coin.market_data.price_change_percentage_24h)}
            </p>
            <p className="text-sm">
              {formatPrice(coin.market_data.price_change_24h)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinPrice;
