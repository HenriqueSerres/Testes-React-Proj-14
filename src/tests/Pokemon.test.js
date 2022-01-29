import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Testa o componente Pokemon', () => {
  it('é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getByText(/pikachu/i);
    expect(pokemon).toBeInTheDocument();
    const type = screen.getAllByTestId(/pokemon-type/i);
    expect(type[0]).toHaveTextContent(/electric/i);
    const avWeight = screen.getAllByTestId(/pokemon-weight/i);
    expect(avWeight[0]).toBeInTheDocument();
    const image = screen.getByAltText(/Pikachu sprite/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(image).toHaveAttribute('alt', 'Pikachu sprite');
  });
  it('o Pokémon indicado contém um link de navegação para exibir detalhes', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /More details/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/pokemons/25');
  });
  it('clicar no link de navegação do Pokémon, é feito o redirecionamento', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /More details/i });
    userEvent.click(link);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });
  it('existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /More details/i });
    userEvent.click(link);
    const checkbox = screen.getByLabelText(/Pokémon favoritado/i);
    userEvent.click(checkbox);
    const star = screen.getByAltText(/favorite/i);
    expect(star).toBeInTheDocument();
    expect(star).toHaveAttribute('src', '/star-icon.svg');
    expect(star).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
