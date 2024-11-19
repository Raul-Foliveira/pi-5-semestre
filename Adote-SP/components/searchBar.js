// components/SearchBar.js
import styles from '../styles/searchBar.module.css';

const SearchBar = () => {
  return (
    <section className={styles.searchBar}>
      <h2>Encontre o animal perfeito para você</h2>
      <form>
        <select name="especie">
          <option value="">Espécie</option>
          <option value="cão">Cão</option>
          <option value="gato">Gato</option>
        </select>
        <select name="idade">
          <option value="">Idade</option>
          <option value="filhote">Filhote</option>
          <option value="adulto">Adulto</option>
        </select>
        <select name="tamanho">
          <option value="">Tamanho</option>
          <option value="pequeno">Pequeno</option>
          <option value="medio">Médio</option>
          <option value="grande">Grande</option>
        </select>
        <input type="text" placeholder="Localização" />
        <button type="submit">Buscar</button>
      </form>
    </section>
  );
};

export default SearchBar;
