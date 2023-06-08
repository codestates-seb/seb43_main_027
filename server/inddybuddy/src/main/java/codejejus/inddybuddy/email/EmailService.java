package codejejus.inddybuddy.email;

import codejejus.inddybuddy.global.exception.CustomException;
import codejejus.inddybuddy.global.exception.ExceptionCode;
import codejejus.inddybuddy.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;
    private final MemberService memberService;
    private final TemplateEngine templateEngine;
    public static ConcurrentHashMap<String, String> codeStorage = new ConcurrentHashMap<>();
    @Value("${email.from.address}")
    private String FROM_ADDRESS;
    @Value("${email.from.name}")
    private String FROM_NAME;
    private String ePw;
    private final ApplicationEventPublisher publisher;

    public void sendEmail(String email) throws MessagingException, UnsupportedEncodingException {
        memberService.verifyExistEmail(email);
        ePw = createKey();
        MimeMessage message = mailSender.createMimeMessage();
        message.setFrom(new InternetAddress(FROM_ADDRESS, FROM_NAME,"UTF-8"));
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setTo(email);
        helper.setSubject("InddyBuddy의 회원가입 인증 코드입니다.");

        Context context = new Context();
        context.setVariable("ePw", ePw);

        String html = templateEngine.process("email", context);
        helper.setText(html, true);

        helper.addInline("image", new ClassPathResource("static/logo.png"));

        try {
            log.info("인증번호 전송");
            log.info(ePw);
            if (!codeStorage.containsKey(email)) {
                mailSender.send(message);
                codeStorage.put(email, ePw);
                System.out.println(codeStorage);
                publisher.publishEvent(new EmailSendApplicationEvent(this, email, ePw));
            } else {
                log.info("3분이 지나지 않았으므로 전송 불가");
                throw new CustomException(ExceptionCode.CODE_ISSUANCE_UNAVAILABLE);
            }
        } catch (MailException es) {
            es.printStackTrace();
            log.info("인증번호 전송 실패");
            codeStorage.remove(email);
            System.out.println(codeStorage);
            throw new CustomException(ExceptionCode.MAIL_SEND_ERROR);
        }
    }

    public static String createKey() {
        StringBuffer key = new StringBuffer();
        Random rnd = new Random();

        for (int i = 0; i < 8; i++) {
            int index = rnd.nextInt(3);

            switch (index) {
                case 0:
                    key.append((char) (rnd.nextInt(26) + 97));
                    break;
                case 1:
                    key.append((char) (rnd.nextInt(26) + 65));
                    break;
                case 2:
                    key.append((rnd.nextInt(10)));
                    break;
            }
        }
        return key.toString();
    }

    public boolean confirmEmail(EmailDto emailDto) {
        String email = emailDto.getEmail();
        String code = emailDto.getCode();
        String findCode = codeStorage.get(email);
        log.info("이메일과 코드가 일치하는지 확인");
        if (code.equals(findCode)) {
            log.info("일치!!!");
            codeStorage.remove(email);
            System.out.println(codeStorage);
            return true;
        }
        log.info("불일치!!!");
        System.out.println(codeStorage);
        return false;
    }
}
