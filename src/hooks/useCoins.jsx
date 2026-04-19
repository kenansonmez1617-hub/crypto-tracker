import { useEffect, useMemo, useState } from "react";
import api from "../utils/api";

/*
!Custom Hook
*React ta tekrar eden state i veya kodu component lerden alip yeniden kullanilabilir hale getirdigimiz gonksiyonlara denir
*Hook lar her zaman use ile baslar
* Her zaman data / fonksiyon return eder
*/

const useCoins = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coins, setCoins] = useState([]);
  const [lastUpdated, setLastUpDated] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  //api den verileri alan fonksiyon
  const fetchCoins = (isRefreshing) => {
    isRefreshing ? setRefreshing(true) : setIsLoading(true);

    api
      .get("/coins/markets?vs_currency=usd")
      .then((res) => {
        setError(null);
        setCoins(res.data);
        setLastUpDated(new Date());
      })
      .catch((err) => setError(err.message))
      .finally(() => {
        setIsLoading(false);
        setRefreshing(false);
      });
  };

  //bilesen erana basildiginda calisir
  useEffect(() => {
    fetchCoins();
  }, []);

  //otomatik yenileme
  useEffect(() => {
    //her 30 saniyede bir api dan guncel verileri aliyoruz
    const id = setInterval(() => fetchCoins(true), 30000);
    //performans kaybini onlemek icin kullanici sayfadan ayrilinca intervali durdur
    return () => clearInterval(id);
  }, []);

  //aratilan terim veya coinler degisirse filtreleme yap
  const filtredCoins = useMemo(
    () =>
      coins.filter((coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [coins, searchTerm],
  );

  // hook un dondurecegi verileri belirle
  return {
    isLoading,
    error,
    coins,
    filtredCoins,
    lastUpdated,
    refreshing,
    fetchCoins,
    searchTerm,
    setSearchTerm,
  };
};

export default useCoins;
