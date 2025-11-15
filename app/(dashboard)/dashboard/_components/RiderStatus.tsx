export default function RiderStatus() {
  return (
    <div className="border border-gray-200 rounded-xl bg-white">
      <div className="flex justify-between border-b border-gray-300 p-4">
        <h3 className="text-xl font-bold">Rider Status</h3>

        <div className="flex items-center gap-5">
          <div className="flex gap-2 border px-2.5 py-1 border-gray-200 rounded-xl  items-center justify-center">
            <span>All</span>
          </div>
          <div className="flex gap-2 border px-2.5 py-1 border-gray-200 rounded-xl  items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span>On Duty</span>
          </div>
          <div className="flex gap-2 border px-2.5 py-1 border-gray-200 rounded-xl  items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
            <span>Break</span>
          </div>
        </div>
      </div>

      <div className="p-4 flex  flex-col gap-4 h-[300px] overflow-y-auto custom-scroll ">
        <div className="flex gap-4 items-center">
          <div className="bg-gray-700 w-9 h-9 rounded-full border"></div>
          <div>
            <h4>Forhad Uddin</h4>
            <p className="flex items-center gap-2.5">
              <span className="w-2 h-2 bg-green-500 block rounded-full"></span>{" "}
              <span>On Duty</span>
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="bg-gray-700 w-9 h-9 rounded-full border"></div>
          <div>
            <h4>Forhad Uddin</h4>
            <p className="flex items-center gap-2.5">
              <span className="w-2 h-2 bg-green-500 block rounded-full"></span>{" "}
              <span>On Duty</span>
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="bg-gray-700 w-9 h-9 rounded-full border"></div>
          <div>
            <h4>Forhad Uddin</h4>
            <p className="flex items-center gap-2.5">
              <span className="w-2 h-2 bg-green-500 block rounded-full"></span>{" "}
              <span>On Duty</span>
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="bg-gray-700 w-9 h-9 rounded-full border"></div>
          <div>
            <h4>Forhad Uddin</h4>
            <p className="flex items-center gap-2.5">
              <span className="w-2 h-2 bg-green-500 block rounded-full"></span>{" "}
              <span>On Duty</span>
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="bg-gray-700 w-9 h-9 rounded-full border"></div>
          <div>
            <h4>Forhad Uddin</h4>
            <p className="flex items-center gap-2.5">
              <span className="w-2 h-2 bg-green-500 block rounded-full"></span>{" "}
              <span>On Duty</span>
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="bg-gray-700 w-9 h-9 rounded-full border"></div>
          <div>
            <h4>Forhad Uddin</h4>
            <p className="flex items-center gap-2.5">
              <span className="w-2 h-2 bg-green-500 block rounded-full"></span>{" "}
              <span>On Duty</span>
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="bg-gray-700 w-9 h-9 rounded-full border"></div>
          <div>
            <h4>Forhad Uddin</h4>
            <p className="flex items-center gap-2.5">
              <span className="w-2 h-2 bg-green-500 block rounded-full"></span>{" "}
              <span>On Duty</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
