"use client";

import { useRouter } from "next/navigation";
import Input from "../_components/common/Input";
import DatePicker from "../_components/common/SelectDate";
import SelectMenu from "../_components/common/SelectMenus";
import DaumPost from "../_components/common/address";
import { useEffect, useState } from "react";
import Button from "../_components/common/Button";
import { fetchDesignDataType, postFieldType } from "@/type/farm-field";
import Editor from "../_components/common/Editor";
import { fetchDesignData, postField } from "@/api/farm-field";

interface Props {
  areaAddress: string;
  townAddress: string;
}

export default function FarmEnroll() {
  // localStorage에서 accessToken 받는 방법
  let accessToken = "";

  if (typeof window !== "undefined") {
    const ls = window.localStorage.getItem("userInfo");
    if (ls) {
      const lsInfo = JSON.parse(ls);
      accessToken = lsInfo.state.userInfo.accessToken;
    }
  }

  //
  const router = useRouter();
  const [fetchDesignList, setFetchDesignList] =
    useState<fetchDesignDataType[]>();
  const [parentData, setParentData] = useState<string>("");

  const setEditorData = (model: string) => {
    setTotalValue((prevValue: any) => ({
      ...prevValue,
      ["content"]: model,
    }));
  };
  const [totalValue, setTotalValue] = useState<postFieldType>({
    title: "",
    content: "",
    address: "",
    startAt: "",
    user: 13,
    design: 0,
    iot: "string",
  });

  const stringHandleEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setTotalValue((prev: postFieldType) => ({
      ...prev,
      [name]: value,
    }));
  };

  const OnSubmit = async (data: postFieldType) => {
    const response = await postField(data);
    if (response.success) {
      alert("밭 등록 성공");
      router.push("/farm-diary");
    } else {
      alert("밭 등록 실패. 다시 시도해주세요");
      window.location.reload();
    }
  };

  useEffect(() => {
    setTotalValue((prevValue: any) => ({
      ...prevValue,
      ["startAt"]: parentData,
    }));
  }, [parentData]);

  useEffect(() => {
    fetchDesignData(accessToken).then((res) =>
      setFetchDesignList(res.data.designList)
    );
  }, [accessToken]);

  const [addressObj, setAddressObj] = useState<Props>({
    areaAddress: "",
    townAddress: "",
  });

  // 주소 데이터 입력 함수
  useEffect(() => {
    setTotalValue((prev: postFieldType) => ({
      ...prev,
      ["address"]: JSON.stringify(addressObj),
    }));
  }, [addressObj]);

  // 디자인 번호 입력 함수
  const handleDirectionChange = (parentValue: number) => {
    setTotalValue((prev: postFieldType) => ({
      ...prev,
      ["design"]: parentValue,
    }));
  };

  return (
    <>
      <div className="flex justify-center mt-20">
        <div className="space-y-12 w-1/3">
          <div className="">
            <h2 className="text-h1 font-semibold text-black-100">밭 등록</h2>

            <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full mt-10">
                <Input
                  name={"title"}
                  labeltext={"밭 이름"}
                  topcss="mt-8"
                  labelcss={"block text-h5 font-bold leading-12 text-black-100"}
                  inputcss={
                    "h-[3rem] flex rounded-lg border border-green-300 w-full focus:outline-none focus:ring-green-400 focus:ring-1 h-10 p-4"
                  }
                  placeholder={"밭 이름을 정해주세요"}
                  type={"text"}
                  value={totalValue.title}
                  onChange={stringHandleEvent}
                />
              </div>
              <div className="col-span-full mt-8">
                {fetchDesignList ? (
                  <SelectMenu
                    onChange={handleDirectionChange}
                    labelcss={"text-h5 font-bold text-black-100"}
                    topScript={"꾸민 텃밭 목록"}
                    items={fetchDesignList}
                    bordercss="border-gray-400 h-[3rem]"
                  />
                ) : null}
              </div>

              <div className="col-span-full mt-8">
                <div className="block text-h5 font-bold leading-12 text-black-100">
                  IoT 기기 등록
                </div>
                <div className="flex mt-2 h-[3rem]">
                  <div className="relative mt-2 w-full">
                    <div className="flex rounded-md border border-green-300 ">
                      <input
                        type={"text"}
                        name={"iot"}
                        className="flex rounded-lg border border-green-300 w-full focus:outline-none focus:ring-green-400 focus:ring-1 h-10 p-4 placeholder:text-base"
                        placeholder={"센서 UUID를 입력해주세요"}
                        onChange={stringHandleEvent}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-full mt-8">
                <div className="block text-h5 font-bold leading-12 text-black-100">
                  경작 시작 시기
                </div>
                <div className="mt">
                  <DatePicker
                    parentData={parentData}
                    setParentData={setParentData}
                  />
                </div>
              </div>

              <div className="col-span-full mt-8">
                <div className="flex w-full justify-between">
                  <div className="block text-h5 font-bold leading-12 text-black-100 flex flex-col justify-center">
                    내 밭 주소
                  </div>
                  <div className="block flex justify-end">
                    <DaumPost setAddressObj={setAddressObj} />
                  </div>
                </div>

                <div className="mt-4">
                  <input
                    value={addressObj.areaAddress}
                    onChange={() => {}}
                    className="flex rounded-lg border border-green-300 w-full focus:outline-none focus:ring-green-400 focus:ring-1 h-10 p-2"
                    placeholder="주소 찾기를 눌러주세요"
                  />
                </div>
                <div className="mt-4">
                  <input
                    value={addressObj.townAddress}
                    onChange={() => {}}
                    className="flex rounded-lg border border-green-300 w-full focus:outline-none focus:ring-green-400 focus:ring-1 h-10 p-2"
                    placeholder="주소 찾기를 눌러주세요"
                  />
                </div>
                <div className="mt-4">
                  <input
                    type="text"
                    onChange={() => {}}
                    className="flex rounded-lg border border-green-300 w-full focus:outline-none focus:ring-green-400 focus:ring-1 h-10 p-2"
                    placeholder="상세 주소를 입력해주세요"
                  />
                </div>
              </div>

              <div className="col-span-full mt-8">
                <div className="block text-h5 font-bold leading-12 text-black-100">
                  텃밭 소개
                </div>
                <div className="mt-2">
                  <Editor setEditorData={setEditorData} />
                </div>

                <p className="mt-1 text-[0.8rem] leading-6 text-gray-400">
                  텃밭을 설명할 글을 적어주세요 (선택 사항)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-[7rem] pb-[7rem]">
        <Button
          text="확인"
          bgStyles="bg-green-400 w-32"
          textStyles="text-white-100"
          handleClick={() => OnSubmit(totalValue)}
        />
      </div>
      <div></div>
    </>
  );
}
