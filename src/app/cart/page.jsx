import styles from "./cart.module.scss";
import Image from "next/image";

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
];

export default function Cart() {
  return (
    <main className={styles.contentCart}>
      <div className={styles.header}>
        <p>Voltar</p>
        <h3>Mochila de compras</h3>
      </div>
      {data.map((el) => (
        <div key={el.id} className={styles.contentItemsCart}>
          <div className={styles.image}>
            <Image
              className={styles.img}
              src={el.image}
              alt={el.name}
              width={100}
              height={100}
              priority={true}
            />
          </div>
          <div className={styles.items}>
            <div className={styles.descriptionItem}>
              <div className={styles.title}>{el.name}</div>
              <h3 className={styles.price}>{el.price} ETH</h3>
            </div>
            <div className={styles.quantityContent}>
              <div className={styles.quantity}>
                <button>+</button>
                <p>3</p>
                <button>-</button>
              </div>
              <h4>apagar</h4>
            </div>
          </div>
        </div>
      ))}
      <div className={styles.total}>
        <h3>Total</h3>
        <h3>60 ETH</h3>
      </div>
      <div className={styles.btnBuyContent}>
        <button className={styles.btnBuy}>Finalizar compra</button>
      </div>
    </main>
  );
}
