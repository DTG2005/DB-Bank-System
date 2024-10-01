import React from "react";
import Image from "next/image";

const NavBar = () => {
  return (
    <>
      <nav className="bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto px-4 sm:px">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {
                  // TODO: Add logo
                }
                <Image
                  className="h-8 w-8"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                  width={100}
                  height={100}
                  alt="Workflow"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <nav className="bg-blue-800 p-6">
        <div className="max-w-7xl mx-auto px-4 sm:px">
          <div className="flex items-center justify-between h-4">
            <div className="flex items-center">
              <div className="flex items-baseline space-x-4">
                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  About
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
