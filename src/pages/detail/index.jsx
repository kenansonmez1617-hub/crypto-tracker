import { useParams } from "react-router-dom";
import useCoinDetail from "../../hooks/useCoinDetail";
import Loader from "../../components/loader";
import Error from "../../components/error";
import CoinHeader from "../../components/detail/coin-header";
import CoinPrice from "../../components/detail/coin-price";
import CoinChart from "../../components/detail/coin-chart";
import CoinStats from "../../components/detail/coin-stats";
import CoinDescription from "../../components/detail/coin-descriptions";

const Detail = () => {
  // url deki id parametresine eris
  const { id } = useParams();
  //coin detaylarini api den alan hook u cagir
  const {
    coin,
    isLoading,
    refreshing,
    error,
    selectedPeriod,
    priceHistory,
    historyLoading,
    setSelectedPeriod,
    refetch,
    refreshData,
  } = useCoinDetail(id);

  if (isLoading) return <Loader />;

  if (error) return <Error message={error} refetch={refetch} />;

  return (
    <div className="space-y-6">
      <CoinHeader
        coin={coin}
        refreshData={refreshData}
        refreshing={refreshing}
      />

      <CoinPrice coin={coin} />

      <CoinChart
        symbol={coin.symbol}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
        priceHistory={priceHistory}
        historyLoading={historyLoading}
      />

      <CoinStats coin={coin} />

      <CoinDescription description={coin.description.en} />
    </div>
  );
};

export default Detail;
