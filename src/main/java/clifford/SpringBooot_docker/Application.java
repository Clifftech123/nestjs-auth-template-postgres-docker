package clifford.SpringBooot_docker;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
	@Configuration
	@OpenAPIDefinition(info = @Info(title = "Spring Boot Docker CRUD Application", version = "v1", description = "Documentation of API endpoints"))
	public class SwaggerConfig {
	}

}
