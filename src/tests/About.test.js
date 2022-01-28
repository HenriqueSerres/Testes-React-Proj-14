import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import { About } from '../components';

describe('Testa o componente About', () => {
  it('a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const title = screen.getByRole('heading', { level: 2, name: /About Pokédex/i });
    expect(title).toBeInTheDocument();
  });
  it('a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const paragraphText = screen.getAllByText(/pokémons/i);
    expect(paragraphText).toHaveLength(2);
    paragraphText.forEach((text) => {
      expect(text).toBeInTheDocument();
    });
  });
  it('a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const image = screen.getByAltText(/pokédex/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(image).toHaveAttribute('alt', 'Pokédex');
  });
});
