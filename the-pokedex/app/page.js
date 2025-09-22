import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.home}>
      <div className={styles.tituloContainer}>
        <h1 className={styles.titulinho}>Bem-vindo à</h1>
        <Image src="/logo.png" alt="PokedexTxt" width={400} height={150} />
        <h4>
          Explore informações sobre todos os Pokémon, descubra tipos,
          habilidades e muito mais!
        </h4>
      </div>

      <div className={styles.pikachuBg}>
        <Image
          src="/images/pikachu.png"
          alt="Pikachu"
          width={1000}
          height={950}
        />
      </div>

      <div className={styles.pokedexBg}>
        <Image
          src="/images/pokedex-color.svg"
          alt="Pokedex"
          width={1000}
          height={1000}
        />
      </div>

      <div className={styles.pokedexLinkWrapper}>
        <Link href="/pokedex" className={styles.pokedexLinkRight}>
          Ir para Pokédex
        </Link>
      </div>

      {/* <section className={styles.sobre}>
        <h2>Sobre nós</h2>
        <p>
          Este projeto foi desenvolvido pelo nosso grupo com o objetivo de
          aprender e praticar desenvolvimento web. A Pokédex traz informações
          sobre os Pokémon de forma simples e divertida!
        </p>
      </section> */}
    </main>
  );
}
