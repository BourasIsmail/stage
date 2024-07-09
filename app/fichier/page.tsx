"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "react-query";
import { getStagiaire } from "../api/stagiaire";
import { Stagiaire } from "../type/Stagiaire";
import { useState } from "react";
import { api } from "../api";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export default function Home() {
  const [selectedValue, setselectedValue] = useState<Stagiaire>();

  const params = useSearchParams();
  const id = params.get("code");

  const { data: stagiaire } = useQuery({
    queryKey: ["stagiaire", id],
    queryFn: () => getStagiaire(Number(id) || 0),
    enabled: !!id,
  });

  const router = useRouter();

  const handleSubmit = (e: any) => {
    try {
      e.preventDefault();
      console.log(selectedValue);
      const fd = new FormData();

      if (selectedValue?.demande) {
        fd.append("file", selectedValue.demande);
      }

      const response = api
        .put(`/stagiaire/uploadDemande/${id}`, fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(response);
        });
      toast({
        description: "تم تحديث البيانات بنجاح",
        className: "bg-green-500 text-white",
        duration: 3000,
        title: "نجاح",
      });
      router.push(`/confirmation`);
    } catch (error) {
      toast({
        description: "اسم مستخدم أو كلمة مرور غير صحيحة",
        variant: "destructive",
        duration: 3000,
        title: "خطأ",
      });
    }
  };

  return (
    <div className="min-h-screen px-14 bg-[url('/back.jpg')] bg-no-repeat	bg-cover flex items-center justify-center">
      <div className="container min-w-screen-lg mx-auto">
        <div className="bg-white rounded shadow-2xl p-4 px-10 md:p-8 mb-6">
          <div className=" px-4 py-2 mx-auto lg:py-2">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                قم بتحميل طلب تدريب بمؤسسة التعاون الوطني (طلب موقع موجه إلى
                السيد مدير التعاون الوطني).
              </h1>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">
                        {" "}
                        {selectedValue?.fileNameDemande}اضغط للتحميل
                      </span>{" "}
                      أو السحب والإفلات
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      pdf, docx, doc
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    onChange={(e) =>
                      setselectedValue({
                        ...selectedValue,
                        demande: e.target.files?.[0] || null,
                        fileNameDemande: e.target.files?.[0].name || "",
                      })
                    }
                    name="demande"
                    className="hidden"
                  />
                </label>
              </div>
              <div className="flex items-center justify-center w-full mt-6">
                <button className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600">
                  تحميل
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
