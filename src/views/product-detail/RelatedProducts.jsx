import React from "react";

export const RelatedProducts = () => {
  // Data produk terkait (contoh)
  const relatedProducts = [
    { id: 1, name: "Product 1", price: "$10", description: "Description 1" },
    { id: 2, name: "Product 2", price: "$20", description: "Description 2" },
    { id: 3, name: "Product 3", price: "$30", description: "Description 3" },
    { id: 4, name: "Product 1", price: "$10", description: "Description 1" },
    { id: 5, name: "Product 2", price: "$20", description: "Description 2" },
    { id: 6, name: "Product 3", price: "$30", description: "Description 3" },
  ];

  return (
    <div>
      {/* Konten Related Products */}
      <h2>Related Products</h2>
      <div className="row">
        {relatedProducts.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">
                  <strong>Price:</strong> {product.price}
                </p>
                <p className="card-text">{product.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
