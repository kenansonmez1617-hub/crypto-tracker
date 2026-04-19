import { useEffect, useState } from "react";
import api from "../utils/api";

const useCoinDetail = (coinId) => {
  // coin detay state leri
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [coin, setCoin] = useState(null);
  const [error, setError] = useState(null);

  // fiyat gecmisi state leri
  const [selectedPeriod, setSelectedPeriod] = useState(7);
  const [priceHistory, setPriceHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  // coin detaylarini ceken fonksiyon
  const getCoinDetails = (isRefreshing) => {
    isRefreshing ? setRefreshing(true) : setIsLoading(true);

    api
      .get(`/coins/${coinId}`)
      .then((res) => {
        setCoin(res.data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => {
        setIsLoading(false);
        setRefreshing(false);
      });
  };

  // fiyat gecmisini ceken fonksiyon
  const getPriceHistory = async () => {
    setHistoryLoading(true);

    const params = { vs_currency: "usd", days: String(selectedPeriod) };

    api
      .get(`/coins/${coinId}/market_chart`, { params })
      .then((res) => {
        setPriceHistory(res.data.prices);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setHistoryLoading(false));
  };

  // ekrandaki verileri yenileme fonksiyonu
  const refreshData = () => {
    getCoinDetails(true);
    getPriceHistory();
  };

  //sayfa yuklenme aninda verileri al
  useEffect(() => {
    getCoinDetails();
    getPriceHistory();
  }, []);

  // gun degeri degisince yeni fiyat gecmisini al
  useEffect(() => {
    if (coin) {
      refreshData();
    }
  }, [selectedPeriod]);

  // hook un return ettigi verileri belirle
  return {
    coin,
    isLoading,
    refreshing,
    error,
    selectedPeriod,
    priceHistory,
    historyLoading,
    setSelectedPeriod,
    refetch: () => getCoinDetails(false),
    refreshData,
  };
};

export default useCoinDetail;
