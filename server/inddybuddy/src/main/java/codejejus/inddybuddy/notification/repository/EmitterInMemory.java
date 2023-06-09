package codejejus.inddybuddy.notification.repository;

import codejejus.inddybuddy.notification.Alarm;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;

public interface EmitterInMemory {

    SseEmitter save(String emitterId, SseEmitter sseEmitter);

    void saveEventCache(String emitterId, Alarm event);

    Map<String, SseEmitter> findAllEmitterStartWithById(String emitterId);

    Map<String, Alarm> findAllEventCacheStartWithById(String emitterId);

    void deleteById(String emitterId);

    void deleteAllEmitterStartWithId(String emitterId);

    void deleteAllEventCacheStartWithId(String emitterId);
}
