import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Filter from "./components/Filter";
import Cards from "./components/Cards";
import Spinner from "./components/Spinner";

import "./App.css";

import { filterData, apiUrl } from "./store/Data";
import { toast } from "react-toastify";
function App() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState(filterData[0].title);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setCourses(data.data);
    } catch (error) {
      toast.error("Error in fetching data");
    }

    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-bgWhite ">
    <div>
      <NavBar />
    </div>

    <div>
      <div>
        <Filter
          filterData={filterData}
          category={category}
          setCategory={setCategory}
        />
      </div>

      <div
        className="w-11/12 max-w-[1200px] 
      mx-auto flex flex-wrap mt-4 justify-center items-center min-h-[50vh]"
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <Cards courses={courses} category={category} />
        )}
      </div>
    </div>
  </div>
);
};
export default App;
