package codejejus.inddybuddy.notification;

import codejejus.inddybuddy.global.exception.CustomException;
import codejejus.inddybuddy.global.exception.ExceptionCode;
import codejejus.inddybuddy.notification.repository.AlarmRepository;
import codejejus.inddybuddy.notification.repository.EmitterInMemory;
import codejejus.inddybuddy.notification.repository.EmitterInMemoryCustom;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class AlarmService {

    private static final Long DEFAULT_TIMEOUT = 60L * 1000 * 60;
    private final EmitterInMemory emitterInMemory = new EmitterInMemoryCustom();
    private final AlarmRepository alarmRepository;
    private final AlarmMapper alarmMapper;

    public SseEmitter subscribe(Long memberId, String lastEventId) {
        String emitterId = createEmitterId(memberId);
        SseEmitter emitter = createEmitter(emitterId);
        if (hasLostData(lastEventId)) {
            sendLostData(memberId, lastEventId, emitter);
        }
        return emitter;
    }

    public void send(Alarm alarm) {
        alarmRepository.save(alarm);
        Map<String, SseEmitter> sseEmitters = emitterInMemory.findAllEmitterStartWithById(String.valueOf(alarm.getReceiver().getMemberId()));

        sseEmitters.forEach((key, emitter) -> {
            emitterInMemory.saveEventCache(key, alarm);
            sendToClient(emitter, key, alarmMapper.alarmToAlarmDto(alarm));
        });
    }

    private String createEmitterId(Long memberId) {
        String emitterId = memberId + "_" + System.currentTimeMillis();
        log.info("emitterId : {}", emitterId);
        return emitterId;
    }

    private SseEmitter createEmitter(String emitterId) {
        SseEmitter emitter = emitterInMemory.save(emitterId, new SseEmitter(DEFAULT_TIMEOUT));
        emitter.onCompletion(() -> {
            log.info("onCompletion callback");
            emitterInMemory.deleteById(emitterId);
        });
        emitter.onTimeout(() -> {
            log.info("onTimeout callback");
            emitter.complete();
        });

        sendToClient(emitter, emitterId, "EventStream Created. [memberId=" + emitterId.split("_")[0] + "]");
        log.info("first connection EventStream Created");
        return emitter;
    }

    public List<AlarmDto.BaseResponse> sendUnReadNotification(Long memberId) {
        List<Alarm> alarms = alarmRepository.findAllByReceiverId(memberId);
        return alarmMapper.alarmsToAlarmDto(alarms);
    }

    private boolean hasLostData(String lastEventId) {
        return !lastEventId.isEmpty();
    }

    private void sendLostData(Long memberId, String lastEventId, SseEmitter emitter) {
        Map<String, Alarm> events = emitterInMemory.findAllEventCacheStartWithById(String.valueOf(memberId));
        events.entrySet().stream()
                .filter(entry -> lastEventId.compareTo(entry.getKey()) < 0)
                .forEach(entry -> sendToClient(emitter, entry.getKey(), alarmMapper.alarmToAlarmDto(entry.getValue())));
    }

    private void sendToClient(SseEmitter emitter, String emitterId, Object data) {
        try {
            emitter.send(SseEmitter.event()
                    .id(emitterId)
                    .name("message")
                    .data(data));
        } catch (IOException exception) {
            log.info("IOException" + exception.getMessage());
            emitterInMemory.deleteById(emitterId);
            throw new CustomException(ExceptionCode.CONNECTION_ERROR);
        }
    }

    @Transactional
    public void readAlarm(AlarmDto.Request request) {
        String[] alarms = request.getId();
        for (String alarm : alarms) {
            alarmRepository.readAlarm(Long.parseLong(alarm));
        }
    }
}
