package clifford.SpringBooot_docker.Controllers;

import clifford.SpringBooot_docker.DTO.CreateProductDTO;
import clifford.SpringBooot_docker.DTO.ProductDTO;
import clifford.SpringBooot_docker.Entities.Product;
import clifford.SpringBooot_docker.Services.ProductService;
import jakarta.servlet.http.PushBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    // Adding product controller methods

    @PostMapping
    public ResponseEntity<ProductDTO> addProduct(@RequestBody CreateProductDTO createProductDTO) {
        Product product = new Product();
        product.setName(createProductDTO.getName());
        product.setDescription(createProductDTO.getDescription());
        product.setPrice(createProductDTO.getPrice());
        Product savedProduct = productService.saveProduct(product);
        ProductDTO productDTO = convertToDTO(savedProduct);
        return new ResponseEntity<>(productDTO, HttpStatus.CREATED);
    }


    // get all products
    @GetMapping
    public List<ProductDTO> getAllProducts() {
        return productService.getAllProducts().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private ProductDTO convertToDTO(Product product) {
        return new ProductDTO(product.getId(), product.getName(), product.getDescription(), product.getPrice());
    }
     // get product by id
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }


    // update product
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@RequestBody Product product, @PathVariable Long id) {
        return ResponseEntity.ok(productService.updateProduct(product, id));
    }


    // delete product
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok("Product deleted successfully");

    }
}
