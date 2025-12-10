import useDebounce from "@/hooks/useDebounce";
import { useSearchParams } from "react-router-dom";

interface SearchInputProps {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, placeholder }) => {
  const [searchParam, setSearchParam] = useSearchParams();

  const handleInput = (newValue: string) => {
    onChange(newValue);

    if (newValue) {
      searchParam.set("search", newValue);
    } else {
      searchParam.delete("search");
    }

    setSearchParam(searchParam);
  };

  return (
    <div style={{ position: "relative", width: "250px" }}>
      <p className="text-gray-700 font-bold">Search Bar</p>
      <input
        type="text"
        value={value}
        placeholder={placeholder || "Search products"}
        onChange={(e) => handleInput(e.target.value)}
        style={{
          width: "80%",
          padding: "8px 32px 8px 8px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />
      <button
        onClick={() => onChange("")}
        style={{
          position: "absolute",
          right: "60px",
          top: "70%",
          transform: "translateY(-50%)",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          fontSize: "16px",
          color: "#555",
        }}
      >
        ✕
      </button>
    </div>
  );
};

export default SearchInput;
