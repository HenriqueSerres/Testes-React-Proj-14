import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Testa o componente PokemonDetails', () => {
  it('as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /More details/i });
    userEvent.click(detailsLink);
    const pokemonDetails = screen.getByRole('heading', { level: 2, name: /details/i });
    expect(pokemonDetails).toBeInTheDocument();
    expect(detailsLink).not.toBeInTheDocument();
    const summary = screen.getByRole('heading', { level: 2, name: /summary/i });
    expect(summary).toBeInTheDocument();
    const pokemonSummary = screen.getByText(/This intelligent Pokémon/i);
    expect(pokemonSummary).toBeInTheDocument();
  });
  it('existe na página uma seção com os mapas de localização dos pokemons', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /More details/i });
    userEvent.click(detailsLink);
    const location = screen.getAllByRole('heading', { level: 2, name: /game location/i });
    expect(location[0]).toBeInTheDocument();
    const locationsImage = screen.getAllByAltText(/Pikachu location/i);
    expect(locationsImage).toHaveLength(2);
    expect(locationsImage[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locationsImage[0]).toHaveAttribute('alt', 'Pikachu location');
    expect(locationsImage[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(locationsImage[1]).toHaveAttribute('alt', 'Pikachu location');
    const locationsText = screen.getAllByText(/kanto/i);
    expect(locationsText).toHaveLength(2);
  });
  it('o usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /More details/i });
    userEvent.click(detailsLink);
    const favoriteBox = screen.getByLabelText(/favoritado/i);
    expect(favoriteBox).toBeInTheDocument();
    userEvent.click(favoriteBox);
    const star = screen.getByAltText(/favorite/i);
    expect(star).toBeInTheDocument();
    userEvent.click(favoriteBox);
    expect(star).not.toBeInTheDocument();
  });
});
