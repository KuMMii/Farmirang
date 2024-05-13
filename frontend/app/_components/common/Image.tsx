/* eslint-disable @next/next/no-img-element */
"use client";

import { PhotoIcon } from "@heroicons/react/20/solid";
import FileUploadButton from "./FileUploadButton";
import { useEffect, useState } from "react";
import { useUserStore } from "@/app/_stores/userStore";
import Image from "next/image";

interface Props {
  // 타이틀 텍스트
  title: String;
  // 타이틀 css
  titlecss: string;
  // 전체 div의 css
  topcss: string;
  // 이미지 가로 길이 조정
  topsecondcss: string;
  // 이미지 미리보기 변수
  displayImage?: any;
  // 이미지 미리보기 설정 변수
  setDisplayImage?: React.Dispatch<any>;
}

export default function ImageComponent({
  title,
  titlecss,
  topcss,
  topsecondcss,
  displayImage,
  setDisplayImage,
}: Props) {
  const { userInfo, resetAuth } = useUserStore();

  // 이미지 선택시 미리보기
  const handleImage = (file: File) => {
    setDisplayImage?.(file);
    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onload = () => {
    //     setDisplayImage?.(reader.result);
    // };
  };

  return (
    <>
      <div className={`flex ${topcss}`}>
        <div className={`justify-center ${topsecondcss} `}>
          <label className={`block ${titlecss}`}>{title}</label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-500 px-6 py-10">
            <div className="text-center flex flex-col items-center">
              {displayImage && displayImage ? (
                <>
                  {/* NextJS 에서 Image 태그에서는 URL을 읽는것을 선호하지 않아서 발생한 밑줄 */}
                  {/* <img
                    src={displayImage}
                    alt=""
                    style={{ width: "250px", aspectRatio: 1 }}
                  /> */}
                </>
              ) : (
                <>
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-400"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-green-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>5MB이내</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1 text-gray-500">PNG, JPG, JPEG 파일</p>
                  </div>
                </>
              )}

              {/* 나중에 useState를 통해서 데이터 입력 */}
              <FileUploadButton handleImage={handleImage} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
