package clifford.SpringBooot_docker.Repository;

import clifford.SpringBooot_docker.Entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
