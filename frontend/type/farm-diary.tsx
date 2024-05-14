export interface fetchCalendarDataType {
  fieldId: number;
  year: number;
  month: number;
}

// 일지 세부 인터페이스

export interface diaryAutosDataType {
  id: number;
  cropName: string;
  content: string;
}

export interface diaryTotalDataType {
  diaryTotalId: number;
  temperature: string;
  humidity: string;
  fieldHumidity: string;
}

export interface diaryManualDataType {
  diaryManualId: string;
  content: string;
  photo: string;
}

export interface fetchAutoDiaryDataType {
  diaryAutos: diaryAutosDataType[];
  diaryManual: diaryManualDataType;
  diaryTotal: diaryTotalDataType;
}

// 밭 목록 인터페이스
export interface fetchFarmListType {
  address: string;
  content: string;
  design: number;
  iot: number;
  title: string;
  startAt: string;
}
