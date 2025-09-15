import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.home}> style={{ backgroundColor: "red" }}
      <h1>Bem-vindo à Pokédex</h1>

      <p>
        Explore informações sobre todos os Pokémon, descubra tipos, habilidades
        e muito mais!
      </p>

      <div className={styles.banner}>
        <img
        src="https://pm1.aminoapps.com/6434/a5f7322cdf21c4de36c7e2c48c926e4c433fe5e4_hq.jpg"
        alt="Pikachu"
        width="200"
        height="200"
        />
    </div>

      <Link href="/pokedex">Ir para Pokédex</Link>

      <hr className={styles.divisor} />

      {/* Sobre nós */}
      <section className={styles.sobre}>
        <h2>Sobre nós</h2>
        <p>
          Este projeto foi desenvolvido pelo nosso grupo com o objetivo de
          aprender e praticar desenvolvimento web. A Pokédex traz informações
          sobre os Pokémon de forma simples e divertida!
        </p>
      </section>

    </main>
  );
}
