package clifford.SpringBooot_docker.Services;

import clifford.SpringBooot_docker.Entities.Product;

import java.util.List;

public interface ProductService {
    Product saveProduct(Product product);
    List<Product> getAllProducts();
    Product getProductById(Long id);
    Product updateProduct(Product product, Long id);
    void deleteProduct(Long id);

}
