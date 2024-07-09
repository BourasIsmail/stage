import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen px-14 bg-[url('/back.jpg')] bg-no-repeat	bg-cover flex items-center justify-center">
      <div className="container min-w-screen-lg mx-auto">
        <div className="bg-white rounded shadow-2xl p-4 px-10 md:p-8 mb-6">
          <div className=" px-4 py-2 mx-auto lg:py-2 flex  justify-center ">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
              تم إرسال طلبك بنجاح
            </h1>
            <Image src="/validation.png" width={200} height={200} alt={""} />
          </div>
        </div>
      </div>
    </div>
  );
}
