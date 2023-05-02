package codejejus.inddybuddy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class InddybuddyApplication {

    public static void main(String[] args) {
        SpringApplication.run(InddybuddyApplication.class, args);
    }

}
