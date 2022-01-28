import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

test('Teste o componente App', () => {
  renderWithRouter(<App />);
  const title = screen.getByRole('heading', {
    level: 1,
    name: /pokédex/i });
  expect(title).toBeInTheDocument();
});
describe('o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  it('o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /home/i });
    const linkAbout = screen.getByRole('link', { name: /about/i });
    const linkFavorite = screen.getByRole('link', { name: /favorite/i });
    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavorite).toBeInTheDocument();
  });

  it('a aplicação é redirecionada para a página inicial ao clicar no link Home', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /home/i });
    userEvent.click(linkHome);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });
  it('a aplicação é redirecionada para a página About ao clicar no link About', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(linkAbout);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });
  it('a aplicação vai para a página Favorite ao clicar no link Favorite', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorite = screen.getByRole('link', { name: /favorite/i });
    userEvent.click(linkFavorite);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });
  it('aplicação vai para a página Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/xablau');
    const title = screen.getByRole('heading', { level: 2, name: /not/i });
    expect(title).toBeInTheDocument();
  });
});
