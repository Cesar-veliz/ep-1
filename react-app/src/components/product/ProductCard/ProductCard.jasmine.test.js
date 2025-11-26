import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from './ProductCard';
import { CartProvider } from '../../../context/CartContext';

describe('ProductCard Component', () => {
  const mockProduct = {
    id: 1,
    nombre: 'Nike Air Max',
    precio: 89990,
    imagen: '/test-image.jpg',
    marca: 'Nike',
    stock: 10,
    destacado: true
  };

  const renderProductCard = (product = mockProduct) => {
    return render(
      <BrowserRouter>
        <CartProvider>
          <ProductCard producto={product} />
        </CartProvider>
      </BrowserRouter>
    );
  };

  it('should render product information correctly', () => {
    renderProductCard();
    
    expect(screen.getByText('Nike Air Max')).toBeTruthy();
    expect(screen.getByText(/89\.990/)).toBeTruthy();
    expect(screen.getByText('Nike')).toBeTruthy();
  });

  it('should display product image', () => {
    renderProductCard();
    
    const image = screen.getByAltText('Nike Air Max');
    expect(image).toBeTruthy();
    expect(image.src).toContain('test-image.jpg');
  });

  it('should show "Destacado" badge when product is featured', () => {
    renderProductCard();
    
    expect(screen.getByText(/destacado/i)).toBeTruthy();
  });

  it('should not show "Destacado" badge when product is not featured', () => {
    const nonFeaturedProduct = { ...mockProduct, destacado: false };
    renderProductCard(nonFeaturedProduct);
    
    expect(screen.queryByText(/destacado/i)).toBeFalsy();
  });

  it('should have "Agregar al Carrito" button', () => {
    renderProductCard();
    
    const addButton = screen.getByRole('button', { name: /agregar al carrito/i });
    expect(addButton).toBeTruthy();
  });

  it('should disable button when product is out of stock', () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 };
    renderProductCard(outOfStockProduct);
    
    const addButton = screen.getByRole('button');
    expect(addButton.disabled).toBe(true);
  });
});
