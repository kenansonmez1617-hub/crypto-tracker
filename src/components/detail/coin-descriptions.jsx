const CoinDescription = ({ description }) => {
  return (
    <div className="box whitespace-pre-wrap text-gray-600 dark:text-gray-300">
      {description ? description : "Açıklama bulunamadı"}
    </div>
  );
};

export default CoinDescription;
