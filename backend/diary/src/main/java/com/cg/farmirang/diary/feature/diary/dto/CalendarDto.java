package com.cg.farmirang.diary.feature.diary.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CalendarDto {
	private Long diaryId;
	private String weather;
	private String weatherIcon;
	private Integer day;
}
