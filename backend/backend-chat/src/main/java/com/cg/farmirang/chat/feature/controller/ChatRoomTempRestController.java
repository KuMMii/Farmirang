package com.cg.farmirang.chat.feature.controller;

import com.cg.farmirang.chat.feature.dto.request.ChatRoomCreateRequestDto;
import com.cg.farmirang.chat.feature.dto.response.ChatRoomGetResponseDto;
import com.cg.farmirang.chat.feature.dto.response.ChatRoomListGetResponseDto;
import com.cg.farmirang.chat.feature.entity.ChatMessage;
import com.cg.farmirang.chat.feature.service.ChatMessageService;
import com.cg.farmirang.chat.feature.service.ChatRoomService;
import com.cg.farmirang.chat.global.common.code.SuccessCode;
import com.cg.farmirang.chat.global.common.entity.Member;
import com.cg.farmirang.chat.global.common.repository.MemberRepository;
import com.cg.farmirang.chat.global.common.response.ErrorResponse;
import com.cg.farmirang.chat.global.common.response.SuccessResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@Tag(name = "4. 판잣집 REST API", description = "서버 생길 때까지 판자집")
@RequiredArgsConstructor
@RequestMapping("/api/v1/chats")
public class ChatRoomTempRestController {
    private final ChatRoomService chatRoomService;
    private final ChatMessageService chatMessageService;
    private final MemberRepository memberRepository;

    /* 회원 임시 생성소 */
    @PostMapping("member")
    @Operation(summary = "회원임시 생성", description = "피난민들 생성해주세용")
    public SuccessResponse<?> createMember(@RequestBody Member member){
        Member savedMember = memberRepository.save(member);
        return SuccessResponse.builder().data(savedMember.getId()).status(SuccessCode.INSERT_SUCCESS).build();
    }

    /* 개인의 채팅방 목록 반환 */
    @GetMapping("/rooms/lists")
    @Operation(summary = "채팅방 목록 조회", description = "채팅방 목록을 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "채팅방 목록 조회에 성공했습니다.", content = {@Content(array = @ArraySchema(schema = @Schema(implementation = ChatRoomListGetResponseDto.class)))}),
            @ApiResponse(responseCode = "400", description = "잘못된 요청입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "서버 내부 문제입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public SuccessResponse<?> room(@RequestParam("memberId") Integer memberId) {
        ChatRoomListGetResponseDto response = chatRoomService.selectChatRoomList(memberId);
        return SuccessResponse.builder().data(response).status(SuccessCode.SELECT_SUCCESS).build();
    }

    /* 채팅방 생성 */
    @PostMapping("/rooms")
    @Operation(summary = "채팅방 생성", description = "새로운 채팅방을 생성합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "새로운 채팅방을 성공하였습니다.", content = {@Content(schema = @Schema(implementation = String.class))}),
            @ApiResponse(responseCode = "400", description = "잘못된 요청입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "없는 회원입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "서버 내부 문제입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public SuccessResponse<?> createRoom(@RequestBody ChatRoomCreateRequestDto request, @RequestParam("memberId") Integer memberId) {
        String chatRoomId = chatRoomService.createChatRoom(memberId, request);
        return SuccessResponse.builder().data(chatRoomId).status(SuccessCode.INSERT_SUCCESS).build();
    }

    /* 채팅방 조회 */
    @GetMapping("/rooms/{chatRoomId}")
    @Operation(summary = "채팅방 상세 조회", description = "채팅방을 상세 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "채팅방 상세 조회에 성공했습니다.", content = {@Content(array = @ArraySchema(schema = @Schema(implementation = ChatRoomGetResponseDto.class)))}),
            @ApiResponse(responseCode = "400", description = "잘못된 요청입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "서버 내부 문제입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public SuccessResponse<?> selectChatRoom(@PathVariable("chatRoomId") String chatRoomId, @RequestParam("memberId") Integer memberId) {
        ChatRoomGetResponseDto response = chatRoomService.selectChatRoom(chatRoomId, memberId);
        List<ChatMessage> messages = chatMessageService.getMessages(chatRoomId);
        response.setChatMessages(messages);
        return SuccessResponse.builder().data(response).status(SuccessCode.SELECT_SUCCESS).build();
    }

}
