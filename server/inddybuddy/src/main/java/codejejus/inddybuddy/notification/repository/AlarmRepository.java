package codejejus.inddybuddy.notification.repository;

import codejejus.inddybuddy.notification.Alarm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AlarmRepository extends JpaRepository<Alarm, Long> {

    @Query(value = "select a from Alarm a where a.isRead = false and a.receiver.memberId = :memberId")
    List<Alarm> findAllByReceiverId(Long memberId);

    @Modifying
    @Query("update Alarm a set a.isRead = true where a.alarmId = :alarmId")
    void readAlarm(@Param("alarmId") Long alarmId);
}