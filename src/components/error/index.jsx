const Error = ({ message, refetch }) => {
  return (
    <div className="flex flex-col items-center mt-60 gap-5">
      <h2 className="text-xl">Üzgünüz bir sorun oluştu :(</h2>

      <h3 className="text-red-500">{message}</h3>

      {refetch && (
        <button
          onClick={refetch}
          className="mt-3 py-2 px-4 border hover:bg-zinc-200/20 rounded"
        >
          Tekrar Dene
        </button>
      )}
    </div>
  );
};

export default Error;
