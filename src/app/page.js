"use client";
import Image from "next/image";
import styles from "./page.module.scss";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchProducts = async () => {
  const { data } = await axios.get(
    "https://starsoft-challenge-7dfd4a56a575.herokuapp.com/v1/products?page=1&limit=8"
  );
  return data.data;
};

export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["data"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <div>Carregando produtos...</div>;
  if (error) return <div>Erro ao carregar produtos: {error.message}</div>;
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>StarSoft</h1>
        <span className={styles.cart}>
          <i>Cart</i>
          <a>0</a>
        </span>
      </header>

      <div className={styles.contentItems}>
        {data.map((el) => (
          <div key={el.id} className={styles.item}>
            <div className={styles.contentImg}>
              <Image
                className={styles.img}
                src={el.image}
                alt={el.name}
                width={150}
                height={150}
                priority={true}
              />
            </div>

            <div className={styles.box1}>
              <h2 className={styles.name}>{el.name}</h2>
              <p className={styles.description}>{el.description}</p>
            </div>
            <div className={styles.box2}>
              <h2 className={styles.price}>{el.price}</h2>
              <button className={styles.addCart}>Adicionar ao carrinho</button>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.contentLoading}>
        <button className={styles.loadingMore}>Carregar mais</button>
      </div>
      <footer className={styles.footer}>
        <h4>STARSOFT &#169; TODOS OS DIREITOS RESERVADOS</h4>
      </footer>
    </main>
  );
}
