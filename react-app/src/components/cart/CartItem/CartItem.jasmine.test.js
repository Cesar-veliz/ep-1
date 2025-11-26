import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CartItem from './CartItem';

describe('CartItem Component', () => {
  const mockItem = {
    id: 1,
    nombre: 'Nike Air Max',
    precio: 89990,
    imagen: '/test-image.jpg',
    cantidad: 2
  };

  const mockOnUpdateQuantity = jasmine.createSpy('onUpdateQuantity');
  const mockOnRemove = jasmine.createSpy('onRemove');

  const renderCartItem = (item = mockItem) => {
    return render(
      <CartItem
        item={item}
        onUpdateQuantity={mockOnUpdateQuantity}
        onRemove={mockOnRemove}
      />
    );
  };

  beforeEach(() => {
    mockOnUpdateQuantity.calls.reset();
    mockOnRemove.calls.reset();
  });

  it('should render cart item with correct information', () => {
    renderCartItem();
    
    expect(screen.getByText('Nike Air Max')).toBeTruthy();
    expect(screen.getByText(/89\.990/)).toBeTruthy();
  });

  it('should display correct quantity', () => {
    renderCartItem();
    
    const quantityInput = screen.getByRole('spinbutton');
    expect(quantityInput.value).toBe('2');
  });

  it('should call onUpdateQuantity when quantity changes', () => {
    renderCartItem();
    
    const quantityInput = screen.getByRole('spinbutton');
    fireEvent.change(quantityInput, { target: { value: '3' } });
    
    expect(mockOnUpdateQuantity).toHaveBeenCalledWith(mockItem.id, 3);
  });

  it('should call onRemove when remove button is clicked', () => {
    renderCartItem();
    
    const removeButton = screen.getByRole('button', { name: /eliminar/i });
    fireEvent.click(removeButton);
    
    expect(mockOnRemove).toHaveBeenCalledWith(mockItem.id);
  });

  it('should calculate subtotal correctly', () => {
    renderCartItem();
    
    const expectedSubtotal = mockItem.precio * mockItem.cantidad;
    expect(screen.getByText(new RegExp(expectedSubtotal.toLocaleString()))).toBeTruthy();
  });

  it('should not allow quantity less than 1', () => {
    renderCartItem();
    
    const quantityInput = screen.getByRole('spinbutton');
    fireEvent.change(quantityInput, { target: { value: '0' } });
    
    expect(mockOnUpdateQuantity).not.toHaveBeenCalled();
  });
});
