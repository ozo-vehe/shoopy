import { FC } from "react";

const LandingPage: FC = () => {
  return (
    <>
      <main className="min-h-screen flex flex-wrap bg-[#f1f6f7] items-center justify-center gap-x-8 gap-y-4">
        <div className="w-600 text-center heroText px-4">
          <h4 className="text-[28px] pb-4 text-gray-500">Shop is fun</h4>
          <h1 className="text-[44px] uppercase font-bold pb-4">
            browse our premium product
          </h1>
          <p className="text-gray-700 max-w-[700px] mx-auto">
            Us which over of signs divide dominion deep fill bring the meat beho
            upon own earth without morning over third. Their male dry. They are
            great appear whose land fly grass
          </p>
          <button className="bg-blue-500 text-white rounded-[0px] transition-all duration-500 px-12 py-4 mt-12">
            {" "}
            Browse Now
          </button>
        </div>
      </main>
    </>
  );
};

export default LandingPage;
