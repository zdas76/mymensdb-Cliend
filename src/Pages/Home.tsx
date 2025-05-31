/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { CommitteeMember } from "../types/fech";
import { Link } from "react-router";

export default function Home() {
  const [data, setData] = useState<CommitteeMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/leaderboard.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData: CommitteeMember[] = await response.json();

        const sortedData = [...jsonData].sort((a, b) => {
          return b.id - a.id;
        });

        setData(sortedData);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
        <p className="ml-4 text-lg text-gray-700">তথ্য লোড হচ্ছে...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-md max-w-lg mx-auto mt-8">
        <h2 className="font-bold text-xl mb-2">ত্রুটি!</h2>
        <p>ডেটা লোড করতে সমস্যা হয়েছে: {error.message}</p>
        <p className="mt-2 text-sm">অনুগ্রহ করে আবার চেষ্টা করুন।</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-center my-12 text-2xl font-bold uppercase">
        Welcome to District Bar Assiociation Mymensingh
      </h1>

      <section>
        <div className="container mx-auto p-4 md:p-8 my-15">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-indigo-800 mb-6 md:mb-8 tracking-tight">
            লিডার বোর্ড
          </h1>

          <div className="overflow-x-auto bg-white rounded-xl shadow-2xl p-2 md:p-4">
            {/* Reduced padding for mobile */}
            <table className=" divide-gray-200 w-full ">
              <thead className="bg-indigo-600 text-white sticky top-0 ">
                <tr>
                  <th
                    scope="col"
                    className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider rounded-tl-xl md:px-6 md:py-3"
                  >
                    ক্রমিক নং
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider md:px-6 md:py-3"
                  >
                    সভাপতির নাম
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider md:px-6 md:py-3"
                  >
                    সাধারন সম্পাদকের নাম
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider rounded-tr-xl md:px-6 md:py-3"
                  >
                    সন
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100 ">
                {data.slice(0, 5).map((item: CommitteeMember, idx: number) => (
                  <tr
                    key={item.id}
                    className="transition- duration-300 ease-in-out hover:bg-indigo-50 hover:shadow-md cursor-pointer group shadow-xl"
                  >
                    <td className="px-3 py-3 text-sm font-medium text-gray-900 group-hover:text-indigo-700 text-center md:px-6 md:py-4 w-1/11">
                      <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold group-hover:bg-indigo-200 transition-colors md:h-8 md:w-8 md:text-sm">
                        {idx + 1}
                      </span>
                    </td>
                    <td className="px-3 py-3  text-sm text-gray-800 group-hover:text-indigo-800 md:px-6 md:py-4 md:text-base ">
                      {item?.president}
                    </td>
                    <td className="px-3 py-3  text-sm text-gray-800 group-hover:text-indigo-800 md:px-6 md:py-4 md:text-base w-4/11">
                      {item?.generalSecretary}
                    </td>
                    <td className="px-3 py-3  text-sm text-gray-800 group-hover:text-indigo-800 md:px-6 md:py-4 md:text-base w-2/11">
                      {item.term}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="px-5 py-2 bg-blue-500 rounded-4xl mx-auto shadow-2xl mt-5 ">
            <Link to={"/leaderboard"}>View Details</Link>
          </button>
        </div>
      </section>
    </div>
  );
}
