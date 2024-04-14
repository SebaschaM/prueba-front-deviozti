import { useState } from "react";
import PublicLayout from "../../layouts/PublicLayout";
import { useHome } from "../../hooks";

const Products = () => {
  const initialProducts = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: `https://via.placeholder.com/150?text=Product${index + 1}`,
  }));

  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState(initialProducts);

  const handleSearch = (e: { target: { value: any } }) => {
    const term = e.target.value;
    setSearchTerm(term);
    // Filtra los productos según el término de búsqueda
    const filteredProducts = initialProducts.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setProducts(filteredProducts);
  };

  const data = {
    title: "Productos",
    description: "Conoce nuestros productos",
    image:
      "https://i.pinimg.com/originals/22/31/09/223109c96071bb64b41c5aeb98ee7bea.jpg",
  };

  return (
    <PublicLayout isBannerSlider={false} dataPage={data}>
      {/* <div className="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Nuestros productos
        </h2>
        <div className="mt-6">
          <input
            type="text"
            placeholder="Buscar productos"
            value={searchTerm}
            onChange={handleSearch}
            className="w-1/4 px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="grid grid-cols-1 mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id}>
              <div className="relative">
                <div className="relative w-full overflow-hidden rounded-lg h-72">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover object-center w-full h-full"
                  />
                </div>
                <div className="relative mt-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    <a href="#">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}
      {/* Pagina en desarrollo */}
      <div className="flex items-center justify-center min-h-screen text-white">
        <div className="text-center">
          <img
            src="https://res.cloudinary.com/sebas-2001-yac/image/upload/v1705894839/devioz_page/ticmxqsd8xvitgqkb2ux.jpg"
            alt="React Logo"
            className="w-1/2 mx-auto mb-6 rounded-lg"
          />
          <h1 className="mb-4 text-4xl font-bold text-black">
            Vista de Página en Desarrollo
          </h1>
          <p className="text-black">
            ¡Estamos trabajando duro para mejorar tu experiencia!
          </p>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Products;
