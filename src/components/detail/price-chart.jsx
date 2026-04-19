import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { formatDate, formatPrice } from "../../utils/helpers";
import { useTheme } from "../../context/theme-context";

const PriceChart = ({ symbol, priceHistory, days }) => {
  // tema verisine erisiyorum contex yapisindan
  const { isDarkTheme } = useTheme();

  // fiyat degisikligini hesapla
  const firstPrice = priceHistory[0][1];
  const lastPrice = priceHistory.at(-1)[1];
  const isPositive = lastPrice >= firstPrice;

  // grafik renkleri
  const borderColor = isPositive ? "#16a34a" : "#dc2626";
  const backgroundColor = isPositive
    ? "rgba(34,197,94,0.1)"
    : "rgba(239,68,68,0.1)";
  const textColor = isDarkTheme ? "#e5e7eb" : "#374151";
  const gridColor = isDarkTheme ? "#374151" : "#e5e7eb";

  // grafik ayarlari
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `${symbol} Fiyat Geçmişi (${days} gün)`,
        color: textColor,
        font: {
          size: 16,
          weight: "bold",
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: isDarkTheme ? "#1f2937" : "#ffffff",
        titleColor: textColor,
        bodyColor: textColor,
        borderColor: isDarkTheme ? "#374151" : "#e5e7eb",
        borderWidth: 1,
        callbacks: {
          label: function (context) {
            const value = context.parsed.y;
            return `Fiyat: $${value.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 6,
            })}`;
          },
        },
      },
    },

    scales: {
      x: {
        display: true,
        grid: {
          color: gridColor,
          borderColor: gridColor,
        },
        ticks: {
          color: textColor,
          maxTicksLimit: 20,
        },
      },
      y: {
        display: true,
        grid: {
          color: gridColor,
          borderColor: gridColor,
        },
        ticks: {
          color: textColor,
          callback: function (value) {
            return formatPrice(value);
          },
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    elements: {
      point: {
        hoverRadius: 8,
      },
    },
  };

  // grafik verisi
  const data = {
    labels: priceHistory.map((item) => formatDate(item[0], days)),
    datasets: [
      {
        fill: true,
        label: `${symbol} Fiyat`,
        data: priceHistory.map((item) => item[1]),
        borderColor,
        backgroundColor,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBorderColor: "#ffffff",
        pointHoverBackgroundColor: borderColor,
        tension: 0.4,
      },
    ],
  };
  return (
    <div className="h-80 w-full">
      <Line data={data} options={options} />
    </div>
  );
};

export default PriceChart;
