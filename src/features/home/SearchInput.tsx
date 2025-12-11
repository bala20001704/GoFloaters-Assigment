import { useSearchParams } from "react-router-dom";

interface SearchInputProps {
  value: string;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, placeholder }) => {
  const [searchParam, setSearchParam] = useSearchParams();

  const handleInput = (newValue: string) => {
    const params = new URLSearchParams(searchParam);

    if (newValue) {
      params.set("search", newValue);
    } else {
      params.delete("search");
    }

    params.delete("category");

    setSearchParam(params);
  };

  return (
    <div style={{ position: "relative", width: "250px" }}>
      <p className="text-gray-700 font-bold">Search Bar</p>

      <input
        type="text"
        value={value}
        onChange={(e) => handleInput(e.target.value)}
        placeholder={placeholder || "Search products"}
        className="w-[80%] px-3 py-2 rounded-md border border-gray-300"
      />

      {value && (
        <button
          onClick={() => handleInput("")}
          className="absolute right-[60px] top-1/2 -translate-y-1/2 text-gray-500 text-lg"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchInput;
