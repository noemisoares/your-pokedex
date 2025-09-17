import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.home}>
      <h1 className={styles.titulinho}>Bem-vindo à</h1>
        
        <h1 className={styles.titulo}>POKÉDEX</h1>
      

      <p>
        Explore informações sobre todos os Pokémon, descubra tipos, habilidades
        e muito mais!
      </p>

      <div className={styles.banner}>
        <Image
          src="/images/pikachu.png"
          alt="Pikachu"
          width="200"
          height="200"
        />
      </div>

      <div className={styles.pokedexBg}>
        <Image
          src="/images/pokedex-color.svg"
          alt="Pokedex"
          width={1100}
          height={1100}
        />
      </div>

      <Link href="/pokedex">Ir para Pokédex</Link>

      

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
