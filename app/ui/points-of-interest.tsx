import { useEffect, useState } from 'react';
import { GeocodeData } from '../interfaces/geocode';
import { deletePointOfInterest, readAllPointsOfInterest } from '../actions';

export function PointsOfInterest() {
  const [pointsOfInterest, setPointsOfInterest] = useState<GeocodeData[]>([]);
  const initData = async () => {
    const serverResponse = await readAllPointsOfInterest();
    setPointsOfInterest(serverResponse);
  };
  useEffect(() => {
    initData();
  }, []);
  return (
    <div
      className="flex flex-col items-center"
    >
      <div className="m-8 w-80">
        <div className="w-full">
          <ul role='list' className='divide-y divide-gray-100'>
            {
              pointsOfInterest &&
              pointsOfInterest.map(({
                placeId,
                formattedAddress,
                type,
              }, i) =>
                <li key={i} className="flex justify-between gap-x-6 py-5">
                  <div
                    role="button"
                    className="text-slate-800  flex w-full items-center rounded-md p-2 pl-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                  >
                    { formattedAddress }
                    <div className="ml-auto grid place-items-center justify-self-end">
                      <button
                        className="rounded-md border border-transparent p-2.5 text-center text-sm transition-all text-slate-600 hover:bg-slate-200 focus:bg-slate-200 active:bg-slate-200 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        onClick={() => deletePointOfInterest(placeId).then(() => initData())}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                          <path
                            fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
              )
            }
          </ul>
        </div>
      </div>
    </div>
  );
}