import InfoList from "../../components/home/info-list";
import CoinCard from "../../components/home/coin-card";
import useCoins from "../../hooks/useCoins";
import Loader from "../../components/loader";
import Error from "../../components/error";
import Searchbar from "../../components/home/searchbar";
import RefreshButton from "../../components/home/refresh-button";
import RefreshInfo from "../../components/home/refresh-info";

const Home = () => {
  // kendi yazidigiiz custom hook ile api istegi atma ve state i yonetme islerini bu bilesenin disarisina tasidik
  const {
    isLoading,
    error,
    coins,
    filtredCoins,
    lastUpdated,
    refreshing,
    setSearchTerm,
    fetchCoins,
  } = useCoins();

  if (isLoading) return <Loader />;

  if (error) return <Error message={error} refetch={fetchCoins} />;
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/*baslik */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Kripto Para Piyasası
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            En popüler kripto para birimleri
          </p>
        </div>

        {/*filtreleme */}
        <div className="flex items-center gap-5">
          <Searchbar setSearchTerm={setSearchTerm} />

          <RefreshButton refreshing={refreshing} fetchCoins={fetchCoins} />
        </div>
      </div>

      <InfoList total={coins.length} lastUpdated={lastUpdated} />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-6">
        {filtredCoins.map((coin, key) => (
          <CoinCard key={key} coin={coin} />
        ))}
      </div>

      {/*veri yenileniyor uyarisi */}
      <RefreshInfo refreshing={refreshing} />
    </div>
  );
};

export default Home;
