package com.cg.farmirang.farm.feature.design.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class DesignDetailResponseDto {
    private char[][] arrangement;
    private String name;
}
