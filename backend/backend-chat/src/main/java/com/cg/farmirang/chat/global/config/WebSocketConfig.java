package com.cg.farmirang.chat.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    private static final String WEB_SOCKET_HOST = "*";
//    private final StompPreHandler stompPreHandler; // TCP Handshake 때 제어를 위한 interceptor
//    private final StompExceptionHandler stompExceptionHandler; // websocket 연결 시 exception 핸들링



    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry
//                .setErrorHandler(stompExceptionHandeler)
                .addEndpoint("/v1/chat")
                .setAllowedOrigins(WEB_SOCKET_HOST)
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/queue","/topic");
        config.setApplicationDestinationPrefixes("/app");
    }

//    @Override
//    public void configureClientInboundChannel(ChannelRegistration registration) {
//        registration.interceptors(stompPreHandler);
//    }


}
