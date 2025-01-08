import axios from "axios";
import { useEffect, useState } from "react";

const FetchApi = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const rowsPerPage = 5;

  // Fetch data from API
  const fetchData = async (search = "", page = 1) => {
    try {
      const response = await axios.get(
        `https://api.razzakfashion.com/?paginate=${rowsPerPage}&search=${search}&page=${page}`
      );
      const apiData = response?.data?.data || [];
      const totalRecords = response?.data?.total || 0;

      setData(apiData);
      setTotalPages(Math.ceil(totalRecords / rowsPerPage));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data on component mount and when search query or page changes
  useEffect(() => {
    fetchData(searchQuery, currentPage);
  }, [searchQuery, currentPage]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query); // Update search query
    setCurrentPage(1); // Reset to page 1 when searching
  };

  return (
    <div className="table-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search area"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>S/N</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
              <td>{row.name}</td>
              <td>{row.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FetchApi;
