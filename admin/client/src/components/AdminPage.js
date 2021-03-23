import React from "react";
import GetDataDaily from "./GetDataDaily";
import GetDataAll from "./GetDataAll";
import Calender from "./calendar/Calendar";
import GetDataYesterday from "./GetDataYesterday";
import GetDataWeek from "./GetDataWeek";

const AdminPage = ({ user }) => {
  return (
    <>
      <div class="container w-full mx-auto pt-20">
        <h2 className="text-white text-2xl text-left">Hi {user}</h2>
        <div class="w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
          <div class="flex flex-wrap">
            <div class="w-full md:w-1/2 xl:w-1/3 p-3">
              <div class="bg-gray-700 border border-gray-400 rounded shadow p-2">
                <div class="flex flex-row items-center">
                  <div class="flex-shrink pr-4">
                    <div class="rounded p-3 bg-green-600">
                      <i class="fa fa-wallet fa-2x fa-fw fa-inverse"></i>
                    </div>
                  </div>
                  <div class="flex-1  md:text-center">
                    <h5 class="font-bold uppercase text-gray-200">
                      Registrations Today
                    </h5>
                    <h3 class="font-bold text-3xl text-gray-300">
                      <GetDataDaily />
                      <span class="text-green-500">
                        <i class="fas fa-caret-up"></i>
                      </span>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full md:w-1/2 xl:w-1/3 p-3">
              <div class="bg-gray-700 border border-gray-400 rounded shadow p-2">
                <div class="flex flex-row items-center">
                  <div class="flex-shrink pr-4">
                    <div class="rounded p-3 bg-pink-600">
                      <i class="fas fa-users fa-2x fa-fw fa-inverse"></i>
                    </div>
                  </div>
                  <div class="flex-1  md:text-center">
                    <h5 class="font-bold uppercase text-gray-200">
                      Total Number of Park Users
                    </h5>
                    <h3 class="font-bold text-3xl text-gray-300">
                      <GetDataAll />
                      <span class="text-pink-500">
                        <i class="fas fa-exchange-alt"></i>
                      </span>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full md:w-1/2 xl:w-1/3 p-3">
              <div class="bg-gray-700 border border-gray-400 rounded shadow p-2">
                <div class="flex flex-row items-center">
                  <div class="flex-shrink pr-4">
                    <div class="rounded p-3 bg-yellow-600">
                      <i class="fas fa-user-plus fa-2x fa-fw fa-inverse"></i>
                    </div>
                  </div>
                  <div class="flex-1  md:text-center">
                    <h5 class="font-bold uppercase text-gray-200">
                      Registrations Yesterday
                    </h5>
                    <h3 class="font-bold text-3xl text-gray-300 py-6">
                      <GetDataYesterday />
                      <span class="text-yellow-600">
                        <i class="fas fa-caret-up"></i>
                      </span>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full container mx-auto px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
        <div class="flex flex-wrap">
          <div class="w-full md:w-1/2 xl:w-1/3 p-3">
            <div class="bg-gray-700 border border-gray-400 rounded shadow p-2">
              <div class="flex flex-row items-center">
                <div class="flex-shrink pr-4">
                  <div class="rounded p-3 bg-blue-600">
                    <i class="fa fa-wallet fa-2x fa-fw fa-inverse"></i>
                  </div>
                </div>
                <div class="flex-1  md:text-center">
                  <h5 class="font-bold uppercase text-gray-200">
                    Registrations This Week
                  </h5>
                  <h3 class="font-bold text-3xl text-gray-300">
                    <GetDataWeek />
                    <span class="text-red-500">
                      <i class="fas fa-caret-up"></i>
                    </span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/2 xl:w-1/3 p-3">
            <div class="bg-gray-700 border border-gray-400 rounded shadow p-2">
              <div class="flex flex-row items-center">
                <div class="flex-shrink pr-4">
                  <div class="rounded p-3 bg-red-600">
                    <i class="fas fa-users fa-2x fa-fw fa-inverse"></i>
                  </div>
                </div>
                <div class="flex-1  md:text-center">
                  <h5 class="font-bold uppercase text-gray-200">
                    Registrations This Month
                  </h5>
                  <h3 class="font-bold text-3xl text-gray-300">
                    <GetDataAll />
                    <span class="text-blue-500">
                      <i class="fas fa-exchange-alt"></i>
                    </span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          {/* <div class="w-full md:w-1/2 xl:w-1/3 p-3">
            <div class="bg-gray-700 border border-gray-400 rounded shadow p-2">
              <div class="flex flex-row items-center">
                <div class="flex-shrink pr-4">
                  <div class="rounded p-3 bg-indigo-600">
                    <i class="fas fa-user-plus fa-2x fa-fw fa-inverse"></i>
                  </div>
                </div>
                <div class="flex-1  md:text-center">
                  <h5 class="font-bold uppercase text-gray-200">
                    Registrations Past 6 Months
                  </h5>
                  <h3 class="font-bold text-3xl text-gray-300 py-6">
                    2{" "}
                    <span class="text-indigo-600">
                      <i class="fas fa-caret-up"></i>
                    </span>
                  </h3>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      <div class="w-full p-3">
        <div class="bg-gray-700 border border-gray-400 rounded shadow">
          <div class="border-b border-gray-800 py-6">
            <div className="container mx-auto">
              <Calender />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
