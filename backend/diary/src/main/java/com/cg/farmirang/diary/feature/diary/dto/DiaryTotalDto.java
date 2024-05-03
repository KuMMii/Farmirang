package com.cg.farmirang.diary.feature.diary.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DiaryTotalDto {
	private Long id;
	private String weather;
	private String weatherIcon;
	private String temperature;
	private String humidity;
	private String fieldHumidity;
}
