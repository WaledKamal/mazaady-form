import React from "react";

function DisplayTable(props) {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Main Category
            </th>
            <th scope="col" className="px-6 py-3">
              Sub Category
            </th>
            <th scope="col" className="px-6 py-3">
              Process Type
            </th>
            <th scope="col" className="px-6 py-3">
              Brand
            </th>
            <th scope="col" className="px-6 py-3">
              Transmission Type
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-4">{props.data.category}</td>
            <td className="px-6 py-4">{props.data.subCategory}</td>
            <td className="px-6 py-4">{props.data.processType}</td>
            <td className="px-6 py-4">{props.data.brand}</td>
            <td className="px-6 py-4">{props.data.transmissionType}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DisplayTable;
