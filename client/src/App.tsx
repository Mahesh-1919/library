import { useEffect, useState } from "react";
import Dailog from "./components/add";

type Book = {
  id: number;
  title: string;
  author: string;
};

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<Book[]>([]); // New state variable for search results

  useEffect(() => {
    fetch("http://localhost:3000/book")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setSearchResults(data); // Initialize search results with all books
      });
  }, []);

  console.log(books);

  const searchHandler = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission
    setSearchResults(
      books.filter((book) =>
        book.title.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  };

  return (
    <>
      <div className="flex w-full justify-center flex-col items-center">
        <h1 className="text-4xl font-bold">Library</h1>
        <p>explore more books here</p>
      </div>
      <div className="max-w-4xl mx-auto">
        <h2 className="m-2 font-medium">Books</h2>

        <div className="w-full flex justify-between">
          <form className="flex items-center max-w-sm mx-auto">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full my-2">
              <input
                type="text"
                id="simple-search"
                className=" border  text-sm block w-full ps-10 p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white rounded-lg "
                placeholder="Search branch name..."
                required
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="p-2.5 ms-2 text-sm font-medium text-white  rounded-lg border border-blue-700 h bg-blue-600 hover:bg-blue-700 "
              onClick={searchHandler}
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </form>
          <Dailog />
        </div>
        <table className="w-full ">
          <thead>
            <tr>
              <th className=" border border-white/50 p-2">Title</th>
              <th className=" border border-white/50 p-2">Author</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((book) => (
              <tr key={book.id} className="text-center ">
                <td className=" border border-white/50 p-2">{book.title}</td>
                <td className=" border border-white/50 p-2">{book.author}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
