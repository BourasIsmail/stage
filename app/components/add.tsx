"use client";

import Image from "next/image";
import { useState } from "react";
import { Stagiaire } from "../type/Stagiaire";
import { useQuery } from "react-query";
import { getAllProvinces } from "../api/province";
import { api } from "../api";
import { toast } from "@/components/ui/use-toast";
import { error } from "console";
import { useRouter } from "next/navigation";

export function Add() {
  const [selectedValue, setselectedValue] = useState<Stagiaire>();
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const formArray = [1, 2, 3, 4, 5, 6];

  const { data: provinces } = useQuery({
    queryKey: ["provinces"],
    queryFn: () => getAllProvinces(),
  });

  const [formNo, setFormNo] = useState(formArray[0]);

  const formAnimation2 = formNo === 2 ? "animate-enter" : "animate-leave";

  const formAnimation4 = formNo === 4 ? "animate-enter" : "animate-leave";

  const next = () => {
    if (formNo === 1) {
      setFormNo(formNo + 1);
    } else if (formNo === 2) {
      setFormNo(formNo + 1);
    } else if (formNo === 3) {
      setFormNo(formNo + 1);
    } else if (formNo === 4) {
      setFormNo(formNo + 1);
    } else if (formNo === 5) {
      setFormNo(formNo + 1);
    }
  };

  const pre = () => {
    setFormNo(formNo - 1);
  };

  const handleSubmit = (e: any) => {
    try {
      e.preventDefault();
      console.log(selectedValue);
      const response = api
        .post(`/stagiaire/addStagiaire`, selectedValue)
        .then((res) => {
          if (res.status === 200) {
            toast({
              description: "تم إضافة البيانات بنجاح. المرجو إكمال التسجيل",
              className: "bg-green-500 text-white",
              duration: 3000,
              title: "نجاح",
            });
          } else {
            throw new Error("حدث خطأ");
          }
          router.push(`/fichier?code=${res.data.id}`);
        });
    } catch (error) {
      toast({
        description: "حدث خطأ",
        variant: "destructive",
        duration: 3000,
        title: "خطأ",
      });
    }
  };

  const next1 = () => {
    const ischecked = document.getElementById(
      "link-checkbox"
    ) as HTMLInputElement;
    if (ischecked.checked) {
      setFormNo(2);
    } else {
      alert("يجب الموافقة على الشروط والأحكام");
    }
  };

  return (
    <div>
      {showModal && (
        <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
      )}
      <div className="min-h-screen px-14 bg-[url('/back.jpg')] bg-no-repeat	bg-cover flex items-center justify-center">
        <div className="container min-w-screen-lg mx-auto">
          <div>
            <div className="bg-white rounded shadow-2xl p-4 px-10 md:p-8 mb-6">
              {formNo === 1 && (
                <div className={formAnimation2}>
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                    <div className="text-gray-600 lg:col-span-2 flex flex-col gap-2">
                      <h1 className="font-bold text-2xl mx-auto text-black">
                        منصة تسجيل المتدربين
                      </h1>
                      <h2 className="font-bold text-lg">التعريف بالمنصة:</h2>
                      <li>
                        من خلال هذه المنصة الالكترونية، تضع مؤسسة التعاون الوطني
                        رهن إشارة طلبة تخصصات العمل الاجتماعي بوابة لتسجيل
                        طلباتهم للتدريب الميداني داخل المراكز الاجتماعية التابعة
                        للمؤسسة، قصد تيسير ولوجهم لها في أحسن الظروف، كما ستمكن
                        هذه المنصة من تتبع مسار هذه التداريب.
                      </li>
                      <h2 className="font-bold text-lg">الإطار: </h2>
                      <li>
                        اتفاقية الشراكة الإطار بين وزارة التعليم العالي والبحث
                        العلمي والابتكار ووزارة التضامن والادماج الاجتماعي
                        والأسرة حول تنفيذ البرنامج التدريبي الخاص ب 10000 مساعد
                        ومساعدة اجتماعية للنساء والفتيات والفئات الهشة في أفق
                        سنة 2030.
                      </li>
                      <h2 className="font-bold text-lg">الشروط :</h2>
                      <li>يرجى ملء جميع الحقول بالمعلومات الصحيحة</li>
                      <li>
                        في حالة تقديم طلب غير صحيح، يرجى الاتصال بالمندوبية أو
                        المنسقية الأقرب إليك
                      </li>
                      <li>
                        الطلب الذي يحتوي على معلومات ناقصة أو مفقودة لن يتم
                        معالجته
                      </li>
                      <p className="font-bold text-xl">تنبيه</p>
                      <div className="flex items-center">
                        <input
                          id="link-checkbox"
                          type="checkbox"
                          value=""
                          name="terms"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                          أوافق على{" "}
                          <a
                            href="#"
                            className="text-green-600 dark:text-green-500 hover:underline"
                            onClick={() => setShowModal(true)}
                          >
                            الشروط والأحكام
                          </a>
                          .
                        </label>
                      </div>
                    </div>
                    <div className="lg:col-span-1">
                      <Image src="/6.png" width={400} height={300} alt={""} />
                      <button
                        onClick={next1}
                        className="mt-3 left-0 float-left text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        تسجيل
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {showModal ? (
                <>
                  <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative p-4 w-full max-w-2xl max-h-full">
                      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                          <h3 className="text-3xl font=semibold">
                            الشروط والأحكام
                          </h3>
                          <button
                            className="bg-transparent border-0 text-black float-right"
                            onClick={() => setShowModal(false)}
                          >
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 14 14"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                              />
                            </svg>
                          </button>
                        </div>
                        <div className="p-4 md:p-5 space-y-4">
                          <li className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            تقوم مؤسسة التعاون الوطني بجمع ومعالجة البيانات
                            الشخصية للمتدربين من أجل ضمان تسيير ملفاتهم في إطار
                            إدارة الموارد البشرية والمسار المهني للمستخدم
                            ولتمكين التعاون الوطني من احترام التزاماته القانونية
                            يمكن إرسال هذه البيانات الى وزارة التضامن والادماج
                            الاجتماعي والاسرة.
                          </li>
                          <li className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            هذه المعالجة كانت موضوع طلب إذن مسبق طبقا لقرار لدى
                            اللجنة الوطنية لمراقبة حماية المعطيات ذات الطابع
                            الشخصي تحت رقم A-RH-888/2022 بتاريخ 24/11/2023
                          </li>
                          <li className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            يمكن للمتدرب الاتصال بقسم الموارد البشرية والشؤون
                            القانونية عبر البريد div.drh@entraide.ma لممارسة
                            حقوقه في الولوج والتصحيح والتعرض وفقًا لمقتضيات
                            القانون 08-09.
                          </li>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
              <form onSubmit={handleSubmit}>
                {formNo === 2 && (
                  <div className={formAnimation2}>
                    <div className=" px-4 py-2 mx-auto lg:py-2">
                      <div className="grid grid-cols-2 gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                        <div className="w-full">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            الإسم العائلي باللغة العربية
                          </label>
                          <input
                            type="text"
                            name="nomAr"
                            id=""
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            value={selectedValue?.nomAr || ""}
                            placeholder=" الإسم العائلي باللغة العربية"
                            onChange={(e) =>
                              setselectedValue({
                                ...selectedValue,
                                nomAr: e.target.value || "",
                              })
                            }
                            required
                          />
                        </div>
                        <div className="w-full">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            الإسم الشخصي باللغة العربية
                          </label>
                          <input
                            type="text"
                            name="prenomAr"
                            id=""
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            value={selectedValue?.prenomAr || ""}
                            placeholder=" الإسم الشخصي باللغة العربية"
                            onChange={(e) =>
                              setselectedValue({
                                ...selectedValue,
                                prenomAr: e.target.value || "",
                              })
                            }
                            required
                          />
                        </div>
                        <div className="w-full">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            الإسم العائلي باللغة الفرنسية
                          </label>
                          <input
                            type="text"
                            name="nomFr"
                            id=""
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            value={selectedValue?.nomFr || ""}
                            placeholder=" الإسم العائلي  باللغة الفرنسية"
                            onChange={(e) =>
                              setselectedValue({
                                ...selectedValue,
                                nomFr: e.target.value || "",
                              })
                            }
                            required
                          />
                        </div>
                        <div className="w-full">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            الإسم الشخصي باللغة الفرنسية
                          </label>
                          <input
                            type="text"
                            name="prenomFr"
                            id=""
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            value={selectedValue?.prenomFr || ""}
                            placeholder=" الإسم العائلي  باللغة الفرنسية"
                            onChange={(e) =>
                              setselectedValue({
                                ...selectedValue,
                                prenomFr: e.target.value || "",
                              })
                            }
                            required
                          />
                        </div>
                        <div className="w-full">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            الجنس
                          </label>
                          <div className="flex items-center me-4">
                            <input
                              id="red-radio"
                              type="radio"
                              value="homme"
                              name="sexe"
                              onChange={(e) =>
                                setselectedValue({
                                  ...selectedValue,
                                  sexe: e.target.value || "",
                                })
                              }
                              className="w-4 h-4  bg-gray-100 border-gray-300 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                              ذكر
                            </label>
                          </div>
                          <div className="flex items-center me-4">
                            <input
                              id="green-radio"
                              type="radio"
                              value="femme"
                              onChange={(e) =>
                                setselectedValue({
                                  ...selectedValue,
                                  sexe: e.target.value || "",
                                })
                              }
                              name="sexe"
                              className="w-4 h-4 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                              أنثى
                            </label>
                          </div>
                        </div>
                        <div className="w-full">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            العنوان الشخصي
                          </label>
                          <input
                            type="text"
                            name="adresse"
                            id=""
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            value={selectedValue?.adresse || ""}
                            placeholder="العنوان الشخصي"
                            onChange={(e) =>
                              setselectedValue({
                                ...selectedValue,
                                adresse: e.target.value || "",
                              })
                            }
                            required
                          />
                        </div>
                        <div className="flex justify-start items-end gap-3">
                          <button
                            type="button"
                            onClick={pre}
                            className="text-white bg-red-700 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                          >
                            الخطوة السابقة
                          </button>
                          <button
                            type="button"
                            onClick={next}
                            className="text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 "
                          >
                            الخطوة التالية
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {formNo === 3 && (
                  <div className={formAnimation4}>
                    <div className=" px-4 py-2 mx-auto lg:py-2">
                      <div className="grid grid-cols-2 gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                        <div className="w-full">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            تاريخ الازدياد
                          </label>
                          <input
                            type="date"
                            name="dateNaissance"
                            id=""
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            value={selectedValue?.dateNaissance || ""}
                            placeholder="تاريخ الازدياد"
                            onChange={(e) =>
                              setselectedValue({
                                ...selectedValue,
                                dateNaissance: e.target.value || "",
                              })
                            }
                            required
                          />
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            الحالة العائلية
                          </label>
                          <input
                            type="text"
                            name="situationFamilial"
                            id=""
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            value={selectedValue?.situationFamilial || ""}
                            placeholder="الحالة العائلية"
                            onChange={(e) =>
                              setselectedValue({
                                ...selectedValue,
                                situationFamilial: e.target.value || "",
                              })
                            }
                            required
                          />
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            رقم بطاقة الهوية الوطنية
                          </label>
                          <input
                            type="text"
                            name="cin"
                            id=""
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            value={selectedValue?.cin || ""}
                            placeholder="رقم بطاقة الهوية الوطنية"
                            onChange={(e) =>
                              setselectedValue({
                                ...selectedValue,
                                cin: e.target.value || "",
                              })
                            }
                            required
                          />
                        </div>
                        <div className="w-full">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            البريد الإلكتروني
                          </label>
                          <input
                            type="email"
                            name="email"
                            id=""
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            value={selectedValue?.email || ""}
                            placeholder="البريد الإلكتروني"
                            onChange={(e) =>
                              setselectedValue({
                                ...selectedValue,
                                email: e.target.value || "",
                              })
                            }
                            required
                          />
                        </div>
                        <div className="w-full">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            رقم الهاتف
                          </label>
                          <input
                            type="tel"
                            name="telephone"
                            id=""
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            value={selectedValue?.telephone || ""}
                            placeholder="رقم الهاتف"
                            onChange={(e) =>
                              setselectedValue({
                                ...selectedValue,
                                telephone: e.target.value || "",
                              })
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="flex justify-start items-end gap-3">
                        <button
                          type="button"
                          onClick={pre}
                          className="text-white bg-red-700 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        >
                          الخطوة السابقة
                        </button>
                        <button
                          type="button"
                          onClick={next}
                          className="text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 "
                        >
                          الخطوة التالية
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {formNo === 4 && (
                  <div className={formAnimation4}>
                    <div className=" px-4 py-2 mx-auto lg:py-2">
                      <form>
                        <div className="grid grid-cols-2 gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                          <div className="w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              اسم الجامعة
                            </label>
                            <input
                              type="text"
                              name="nomUniversite"
                              id=""
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              value={selectedValue?.nomUniversite ?? ""}
                              onChange={(e) =>
                                setselectedValue({
                                  ...selectedValue,
                                  nomUniversite: e.target.value || "",
                                })
                              }
                              placeholder="اسم الجامعة"
                              required
                            />
                          </div>
                          <div className="w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              المستوى الجامعي
                            </label>

                            <select
                              name="niveauEtude"
                              id=""
                              value={selectedValue?.niveauEtude ?? ""}
                              onChange={(e) =>
                                setselectedValue({
                                  ...selectedValue,
                                  niveauEtude: e.target.value || "",
                                })
                              }
                              required
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                              <option selected>إختر المستوى</option>
                              <option value="إجازة">إجازة</option>
                              <option value="ماستر">ماستر</option>
                            </select>
                          </div>

                          <div className="w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              اسم الشعبة
                            </label>
                            <input
                              type="text"
                              name="specialite"
                              id=""
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              value={selectedValue?.specialite ?? ""}
                              onChange={(e) =>
                                setselectedValue({
                                  ...selectedValue,
                                  specialite: e.target.value || "",
                                })
                              }
                              placeholder="اسم الشعبة"
                              required
                            />
                          </div>
                        </div>
                        <div className="flex justify-start items-end gap-3">
                          <button
                            type="button"
                            onClick={pre}
                            className="text-white bg-red-700 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                          >
                            الخطوة السابقة
                          </button>
                          <button
                            type="button"
                            onClick={next}
                            className="text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 "
                          >
                            الخطوة التالية
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
                {formNo === 5 && (
                  <div className={formAnimation2}>
                    <div className=" px-4 py-2 mx-auto lg:py-2">
                      <div className="grid grid-cols-2 gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                        <div className="w-full">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            الخيار 1: من
                          </label>
                          <input
                            type="date"
                            name="dateDebut1"
                            id=""
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            value={selectedValue?.dateDebut1 || ""}
                            placeholder=""
                            onChange={(e) =>
                              setselectedValue({
                                ...selectedValue,
                                dateDebut1: e.target.value || "",
                              })
                            }
                            required
                          />
                        </div>
                        <div className="w-full">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            إلى
                          </label>
                          <input
                            type="date"
                            name="dateFin1"
                            id=""
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            value={selectedValue?.dateFin1 || ""}
                            placeholder=""
                            onChange={(e) =>
                              setselectedValue({
                                ...selectedValue,
                                dateFin1: e.target.value || "",
                              })
                            }
                            required
                          />
                        </div>
                        <div className="w-full">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            الخيار 2: من
                          </label>
                          <input
                            type="date"
                            name="dateDebut2"
                            id=""
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            value={selectedValue?.dateDebut2 || ""}
                            placeholder=""
                            onChange={(e) =>
                              setselectedValue({
                                ...selectedValue,
                                dateDebut2: e.target.value || "",
                              })
                            }
                            required
                          />
                        </div>
                        <div className="w-full">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            إلى
                          </label>
                          <input
                            type="date"
                            name="dateFin2"
                            id=""
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            value={selectedValue?.dateFin2 || ""}
                            placeholder=" "
                            onChange={(e) =>
                              setselectedValue({
                                ...selectedValue,
                                dateFin2: e.target.value || "",
                              })
                            }
                            required
                          />
                        </div>
                        <div className="w-full">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            الخيار 3: من
                          </label>
                          <input
                            type="date"
                            name="dateDebut3"
                            id=""
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            value={selectedValue?.dateDebut3 || ""}
                            placeholder=" "
                            onChange={(e) =>
                              setselectedValue({
                                ...selectedValue,
                                dateDebut3: e.target.value || "",
                              })
                            }
                            required
                          />
                        </div>
                        <div className="w-full">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            إلى
                          </label>
                          <input
                            type="date"
                            name="dateFin3"
                            id=""
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            value={selectedValue?.dateFin3 || ""}
                            placeholder=" "
                            onChange={(e) =>
                              setselectedValue({
                                ...selectedValue,
                                dateFin3: e.target.value || "",
                              })
                            }
                            required
                          />
                        </div>
                        <div className="w-full">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            مدة التدريب بالأيام
                          </label>
                          <input
                            type="number"
                            name="dureeStage"
                            id=""
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            value={selectedValue?.dureeStage || ""}
                            placeholder=" "
                            onChange={(e) =>
                              setselectedValue({
                                ...selectedValue,
                                dureeStage: Number(e.target.value || 0),
                              })
                            }
                            required
                          />
                        </div>
                      </div>

                      <div className="flex justify-start items-end gap-3">
                        <button
                          type="button"
                          onClick={pre}
                          className="text-white bg-red-700 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        >
                          الخطوة السابقة
                        </button>
                        <button
                          type="button"
                          onClick={next}
                          className="text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 "
                        >
                          الخطوة التالية
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {formNo === 6 && (
                  <div className={formAnimation2}>
                    <div className=" px-4 py-2 mx-auto lg:py-2">
                      <div className="grid grid-cols-2 gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                        <div className="w-full">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            إقليم الخيار الأول
                          </label>
                          <select
                            name="province1"
                            onChange={(e) =>
                              setselectedValue({
                                ...selectedValue,
                                province1:
                                  provinces?.find(
                                    (item) => item.id === Number(e.target.value)
                                  ) || undefined,
                              })
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          >
                            {provinces?.map((pr) => (
                              <option value={pr.id}>{pr.name}</option>
                            ))}
                          </select>
                        </div>
                        <div className="w-full">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            إقليم الخيار الثاني
                          </label>
                          <select
                            name="province2"
                            onChange={(e) =>
                              setselectedValue({
                                ...selectedValue,
                                province2:
                                  provinces?.find(
                                    (item) => item.id === Number(e.target.value)
                                  ) || undefined,
                              })
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          >
                            {provinces?.map((pr) => (
                              <option value={pr.id}>{pr.name}</option>
                            ))}
                          </select>
                        </div>
                        <div className="w-full">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            إقليم الخيار الثالث
                          </label>
                          <select
                            name="province3"
                            onChange={(e) =>
                              setselectedValue({
                                ...selectedValue,
                                province3:
                                  provinces?.find(
                                    (item) => item.id === Number(e.target.value)
                                  ) || undefined,
                              })
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          >
                            {provinces?.map((pr) => (
                              <option value={pr.id}>{pr.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="flex justify-start items-end gap-3">
                        <button
                          type="button"
                          onClick={pre}
                          className="text-white bg-red-700 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        >
                          الخطوة السابقة
                        </button>
                        <button
                          type="submit"
                          className="text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 "
                        >
                          إرسال
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
