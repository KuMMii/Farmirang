package com.cg.farmirang.donation.global.common.response;

import com.cg.farmirang.donation.feature.user.entity.MemberRole;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
public record JwtValidationResponseDto(
	@NotBlank
	@Schema(description = "사용자 ID", example = "1")
	@JsonProperty("member_id")
	Integer memberId,
	@NotBlank
	@Schema(description = "사용자 권한", example = "MEMBER")
	@Enumerated(EnumType.STRING)
	MemberRole role,
	@NotBlank
	@Schema(description = "기기 구분 번호", example = "1234")
	@JsonProperty("device_id")
	String deviceId
) {
}
