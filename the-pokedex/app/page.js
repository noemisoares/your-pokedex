import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.home}>
      <h1>Bem-vindo à Pokédex!</h1>
      <Link href="/pokedex">Ir para Pokédex</Link>
    </main>
  );
}
