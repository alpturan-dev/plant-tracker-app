import FetchData from "./components/FetchData";
import plant from "./assets/plant.png"
function App() {
  return (
    <div className="h-auto flex items-center justify-center flex-col bg-gradient-to-b from-orangebg to-orange-100 ">
      <div className="mt-7 w-3/5 flex flex-col lg:flex-row">
        <img src={plant} className="mt-8 rounded-sm aspect-square" alt="plant" />
        <h1 className="my-4 text-orange-700 text-4xl">
          THE <br></br>
          <span className="text-plantgreen font-bold underline">PLANT TRACKER</span> <br />
          YOU ALWAYS NEEDED
        </h1>
        <hr className="my-8 h-px bg-gray-200 border-0"></hr>
        <h1 className=" text-orange-900 text-2xl font-bold underline">
          Plant Status
        </h1>
        <FetchData />
      </div>
    </div>
  );
}

export default App;
