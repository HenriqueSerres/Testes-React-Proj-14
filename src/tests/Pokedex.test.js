import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Testa o componente Pokedex', () => {
  it('página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', { level: 2, name: /Encountered/i });
    expect(title).toBeInTheDocument();
  });
  it('exibido o próximo Pokémon quando o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);
    const btn = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(btn).toBeInTheDocument();
    const pokemonsCard = screen.getByText(/pikachu/i);
    userEvent.click(btn);
    expect(pokemonsCard).toHaveTextContent(/charmander/i);
    userEvent.click(btn);
    expect(pokemonsCard).toHaveTextContent(/Caterpie/i);
    userEvent.click(btn);
    expect(pokemonsCard).toHaveTextContent(/Ekans/i);
    userEvent.click(btn);
    expect(pokemonsCard).toHaveTextContent(/Alakazam/i);
    userEvent.click(btn);
    expect(pokemonsCard).toHaveTextContent(/Mew/i);
    userEvent.click(btn);
    expect(pokemonsCard).toHaveTextContent(/Rapidash/i);
    userEvent.click(btn);
    expect(pokemonsCard).toHaveTextContent(/Snorlax/i);
    userEvent.click(btn);
    expect(pokemonsCard).toHaveTextContent(/Dragonair/i);
    userEvent.click(btn);
    expect(pokemonsCard).toHaveTextContent(/Pikachu/i);
  });
  it('a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const filterBtns = screen.getAllByTestId(/pokemon-type-button/i);
    expect(filterBtns[0]).toHaveTextContent(/Electric/i);
    expect(filterBtns[1]).toHaveTextContent(/Fire/i);
    expect(filterBtns[2]).toHaveTextContent(/Bug/i);
    expect(filterBtns[3]).toHaveTextContent(/Poison/i);
    expect(filterBtns[4]).toHaveTextContent(/Psychic/i);
    expect(filterBtns[5]).toHaveTextContent(/Normal/i);
    expect(filterBtns[6]).toHaveTextContent(/Dragon/i);
  });
  it('a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByRole('button', { name: /All/i });
    expect(btnAll).toBeInTheDocument();
    const pikachu = screen.getByText(/pikachu/i);
    userEvent.click(btnAll);
    expect(pikachu).toBeInTheDocument();
  });
});
