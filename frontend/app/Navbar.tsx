"use client";

import { useState } from "react";
import { Disclosure, Menu } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUserStore } from "./_stores/userStore";

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { userInfo, resetAuth } = useUserStore();
  // const userInfo = useUserStore((state) => state.userInfo);
  // console.log(userInfo);
  const router = useRouter();
  // router
  const [navigation, setNavigation] = useState([
    { name: "텃밭꾸미기", href: "/farm-design", current: false },
    { name: "텃밭일기", href: "/farm-diary", current: false },
    { name: "이웃이야기", href: "/board/neighbor", current: false },
    { name: "기부하기", href: "/donation", current: false },
  ]);

  const handleEvent = (href: string, index: number) => {
    const newNavigation = navigation.map((item, idx) => ({
      ...item,
      current: idx === index,
    }));
    setNavigation(newNavigation);

    router.push(href);
  };

  const extraPageEvent = (href: string) => {
    const newNavigation = navigation.map((item) => ({
      ...item,
      current: false,
    }));
    setNavigation(newNavigation);
    router.push(`${href}`);
  };

  const handleLogout = async () => {
    const response = await fetch(
      "http://localhost:8081/api/v1/security/logout",
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userInfo.accessToken}`,
          "device-id": `${userInfo.deviceId}`,
          // "device-id": "83cb30c3-5e31-4bef-986c-7435576e0e9b",
        },
      }
    );
    if (response) {
      resetAuth();
      router.push("/");
    }
  };

  return (
    <>
      <div className="border-b bg-white-100 fixed z-10 w-full">
        <Disclosure>
          {() => (
            <>
              <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="flex h-full items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className="flex-shrink-0 text-green-500 font-extrabold text-h4 font-tmoney cursor-pointer"
                      onClick={() => {
                        extraPageEvent("/");
                      }}
                    >
                      팜이랑
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-32 flex items-baseline space-x-8">
                        {navigation.map((item, idx) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "text-green-400 border-b-2 border-green-400"
                                : "text-black-100 hover:text-green-500",
                              "px-3 py-6 text-h6 font-extrabold font-tmoney"
                            )}
                            aria-current={item.current ? "page" : undefined}
                            onClick={(e) => {
                              e.preventDefault();
                              handleEvent(item.href, idx);
                            }}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* 로그인 상태일 경우 알람 아이콘과 마이페이지 버튼이 보이도록 한다 */}
                  {userInfo.accessToken.length > 0 ? (
                    <>
                      <div className="hidden md:block">
                        <div className="ml-6 flex items-center md:ml-6 space-x-2">
                          <button
                            type="button"
                            className="relative rounded-full p-1"
                          >
                            <span className="absolute -inset-1.5" />
                            <BellIcon className="h-8 w-8" aria-hidden="true" />
                          </button>

                          <Menu as="div" className="relative ml-6">
                            <Menu.Button
                              className="relative flex max-w-xs items-center rounded-full"
                              onClick={() => extraPageEvent("/mypage/profile")}
                            >
                              <span className="absolute -inset-1.5" />
                              <Image
                                className="h-8 w-8 rounded-full"
                                src={userInfo.profileImg}
                                alt=""
                                width={100}
                                height={100}
                              />
                            </Menu.Button>
                          </Menu>
                          <a
                            onClick={handleLogout}
                            className="text-green-500 cursor-pointer hover:text-green-400 px-3 py-6 text-h6 font-extrabold font-tmoney"
                          >
                            로그아웃
                          </a>
                        </div>
                      </div>
                    </>
                  ) : (
                    // 로그아웃 상태일 경우 로그인 버튼이 보이도록 한다
                    <>
                      <a
                        href="/login"
                        className="text-green-500 hover:text-green-400 px-3 py-6 text-h6 font-extrabold font-tmoney ml-3"
                      >
                        로그인
                      </a>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </Disclosure>
        <header className="bg-white shadow" />
      </div>
    </>
  );
}
