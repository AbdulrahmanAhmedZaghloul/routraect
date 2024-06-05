import React from "react";

export default function Footer() {
  return (
    <React.Fragment>
      <footer className="bg-gray-100 py-11">
        <div className="container text-start px-5">
          <div className="container text-start px-5">
            <h2 className="text-2xl text-start py-3">
              Get the Fresh Market app
            </h2>
            <p className="py3">we will send you a link , open it on your  phone to download the app .</p>

          </div>
          <div className="flex container py-6 px-4  flex-wrap justify-between mx-auto">
            <input className="w-3/4  ms-4 my-3  rounded-md px-2 py-3" type="email" placeholder="Email . . ." />
            <button className="my-3  me-4 bg-green-500 hover:bg-green-700 text-white font-bold py-3">
              Share App Link
            </button>
          </div>
        </div>
      </footer>

    </React.Fragment>
  );
}
