import SearchBar from "./SearchBar";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Search = ({ children }: Props) => {
  return (
    <div className="space-y-4">
      <SearchBar />
      {children}
    </div>
  );
};

export default Search;
