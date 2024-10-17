import Image from "next/image";
import styles from "./page.module.scss";

let data = [
  {
    id: 1,
    name: "Backpack",
    description:
      "Uma mochila resistente com compartimentos secretos, ideal para aventureiros que precisam carregar uma variedade de itens essenciais em suas jornadas épicas.",
    image: "https://softstar.s3.amazonaws.com/items/backpack.png",
    price: 182,
    createdAt: "2024-07-18T23:55:43.238Z",
  },
  {
    id: 2,
    name: "Boots of Speed",
    description:
      "Botas feitas de couro fino e tecido élfico, imbuidas com encantamentos mágicos que conferem velocidade sobrenatural a quem as usa, permitindo movimentos ágeis e fugas rápidas.",
    image: "https://softstar.s3.amazonaws.com/items/boots-of-speed.png",
    price: 338,
    createdAt: "2024-07-18T23:55:43.238Z",
  },
  {
    id: 3,
    name: "Boots of Speed",
    description:
      "Botas feitas de couro fino e tecido élfico, imbuidas com encantamentos mágicos que conferem velocidade sobrenatural a quem as usa, permitindo movimentos ágeis e fugas rápidas.",
    image: "https://softstar.s3.amazonaws.com/items/boots-of-speed.png",
    price: 338,
    createdAt: "2024-07-18T23:55:43.238Z",
  },
  {
    id: 4,
    name: "Boots of Speed",
    description:
      "Botas feitas de couro fino e tecido élfico, imbuidas com encantamentos mágicos que conferem velocidade sobrenatural a quem as usa, permitindo movimentos ágeis e fugas rápidas.",
    image: "https://softstar.s3.amazonaws.com/items/boots-of-speed.png",
    price: 338,
    createdAt: "2024-07-18T23:55:43.238Z",
  },
  {
    id: 5,
    name: "Boots of Speed",
    description:
      "Botas feitas de couro fino e tecido élfico, imbuidas com encantamentos mágicos que conferem velocidade sobrenatural a quem as usa, permitindo movimentos ágeis e fugas rápidas.",
    image: "https://softstar.s3.amazonaws.com/items/boots-of-speed.png",
    price: 338,
    createdAt: "2024-07-18T23:55:43.238Z",
  },
  {
    id: 6,
    name: "Boots of Speed",
    description:
      "Botas feitas de couro fino e tecido élfico, imbuidas com encantamentos mágicos que conferem velocidade sobrenatural a quem as usa, permitindo movimentos ágeis e fugas rápidas.",
    image: "https://softstar.s3.amazonaws.com/items/boots-of-speed.png",
    price: 338,
    createdAt: "2024-07-18T23:55:43.238Z",
  },
];

export default function Home() {
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
