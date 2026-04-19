import { Activity, ScanBarcode, TrendingDown, TrendingUp } from "lucide-react";
import { formatBigNumber, formatPrice } from "../../utils/helpers";

const CoinStats = ({ coin }) => {
  const stats = [
    {
      title: "Market Hacmi",
      value: formatBigNumber(coin?.market_data?.market_cap?.usd),
      subtitle: `#${coin.market_cap_rank}`,
      icon: <ScanBarcode className="text-blue-500 size-8" />,
    },
    {
      title: "24s Hacim",
      value: formatBigNumber(coin?.market_data?.total_volume?.usd),
      icon: <Activity className="text-green-500 size-8" />,
    },
    {
      title: "24s  Yüksek/Düşük",
      high: formatPrice(coin?.market_data?.high_24h?.usd),
      low: formatPrice(coin?.market_data?.low_24h?.usd),
    },
    {
      title: "Tüm Zamanlar Yüksek",
      value: formatBigNumber(coin?.market_data?.ath?.usd),
      subtitle: new Date(coin?.market_data?.ath_date.usd).toLocaleDateString(
        "tr",
      ),
      icon: <TrendingUp className="text-green-500 size-8" />,
    },
    {
      title: "Tüm Zamanlar Düşük ",
      value: formatBigNumber(coin?.market_data?.atl?.usd),
      subtitle: new Date(coin?.market_data?.atl_date.usd).toLocaleDateString(
        "tr",
      ),
      icon: <TrendingDown className="text-red-500 size-8" />,
    },
    {
      title: "Son Güncelleme ",
      value: new Date(coin.market_data.last_updated).toLocaleString("tr"),
    },
  ];

  console.log(stats);
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, key) => (
        <div key={key} className="box">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-600 dark:text-gray-500 mb-1">
                {stat.title}
              </p>

              {stat.high ? (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Yüksek
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {stat.high}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Düşük
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {stat.low}
                    </span>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>

                  {stat.subtitle && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.subtitle}
                    </p>
                  )}
                </div>
              )}
            </div>

            {stat.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoinStats;
