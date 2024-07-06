package clifford.SpringBooot_docker.Services;

import clifford.SpringBooot_docker.Entities.Product;
import clifford.SpringBooot_docker.Exception.ResourceNotFoundException;
import clifford.SpringBooot_docker.Repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ProductServiceImpl implements ProductService  {
    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public Product saveProduct(Product product) {
        return  productRepository.save(product);
    }

  //  get all products
    @Override
    public List<Product> getAllProducts() {
        List<Product> products = productRepository.findAll();
        if (products.isEmpty()) {
            throw new ResourceNotFoundException("No products found");
        }
        return products;
    }

    // get product by id
    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElseThrow(() ->

                new ResourceNotFoundException("Product not found with id: " + id));
    }

    // update product
    @Override
    public Product updateProduct(Product product, Long id) {
        Product existingProduct = getProductById(id);
        existingProduct.setName(product.getName());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setPrice(product.getPrice());
        return productRepository.save(existingProduct);
    }


    // delete product
    @Override
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Product not found with id: " + id));
        productRepository.deleteById(id);
    }
}
