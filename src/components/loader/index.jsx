import { LoaderCircle } from "lucide-react";

const Loader = ({ designs }) => {
  return (
    <div className={`flex justify-center my-80 ${designs}`}>
      <LoaderCircle className="size-8 text-blue-400 animate-spin" />
    </div>
  );
};

export default Loader;
