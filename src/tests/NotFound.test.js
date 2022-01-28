import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('testa a página NotFound', () => {
  it('página contém um heading h2 com o texto Page requested not found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/xablau');
    const title = screen.getByRole('heading', { level: 2, name: /not found/i });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Page requested not found');
  });
  it('página mostra a imagem do Picachu', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/xablau');
    const image = screen.getByAltText(/Pikachu/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(image)
      .toHaveAttribute('alt', 'Pikachu crying because the page requested was not found');
  });
});
