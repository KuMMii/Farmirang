package com.cg.farmirang.farm.feature.design.service;

import com.cg.farmirang.farm.feature.design.dto.request.*;
import com.cg.farmirang.farm.feature.design.dto.response.*;

import java.util.List;

public interface DesignService {
    public EmptyFarmCreateResponseDto insertEmptyFarm(EmptyFarmCreateRequestDto request);

    public Boolean insertRecommendedDesign(Long emptyField, List<RecommendedDesignCreateRequestDto> request);

    Boolean insertDesign(DesignUpdateRequestDto request);


    List<DesignDetailResponseDto> selectDesignList(Integer memberId);

    DesignDetailResponseDto selectDesign(Long designId);

    Boolean updateDesign(Long designId, DesignUpdateRequestDto request);

    Boolean deleteDesign(Long designId);

    Boolean insertPesticideAndFertilizerSelection(PesticideAndFertilizerCreateDto request);

    List<CropGetResponseDto> selectCropList(Long designId);

    EmptyFarmGetResponseDto selectEmptyFarm(Long designId);

    Boolean insertCustomDesign(Long designId, CustomDesignCreateRequestDto request);

    Boolean updateDesignName(Long designId, DesignNameUpdateRequestDto request);

    ChemicalGetResponseDto selectChemical(Long designId);
}
