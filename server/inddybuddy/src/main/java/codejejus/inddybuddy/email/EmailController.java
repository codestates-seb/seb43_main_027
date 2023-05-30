package codejejus.inddybuddy.email;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/email")
public class EmailController {

    private final EmailService emailService;

    @PostMapping
    public ResponseEntity<EmailDto> sendEmail(@RequestParam String email) throws Exception {
        emailService.sendEmail(email);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/confirm")
    public ResponseEntity<Boolean> confirmEmail(@RequestBody EmailDto emailDto) {
        return ResponseEntity.ok(emailService.confirmEmail(emailDto));
    }
}
