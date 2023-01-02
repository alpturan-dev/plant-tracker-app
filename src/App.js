import FetchData from "./components/FetchData";
import plant from "./assets/plant.png"
function App() {
  return (
    <div className="h-auto flex items-center justify-center lg:flex-row flex-col bg-gradient-to-b from-orangebg to-orange-100 ">
      <div className="h-screen mt-7 lg:w-1/3 w-3/5 flex flex-col items-center justify-center">
        <img src={plant} className="rounded-sm aspect-square" alt="plant" />
        <h1 className="my-4 text-orange-700 text-4xl text-center">
          İHTİYACINIZ OLAN <br></br>
          <span className="text-plantgreen font-bold underline">BİTKİ TAKİP</span> <br />
          UYGULAMASI
        </h1>
        <hr className=" my-20 h-px bg-gray-200 border-0"></hr>
      </div>
      <div className="w-4/5 text-center">
        <FetchData />
      </div>
    </div>
  );
}

export default App;
