"use client";
import styles from "./cart.module.scss";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";

const fetchCart = async () => {
  const { data } = await axios.get("http://localhost:3001/cart");
  return data;
};

export default function Cart() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
  });

  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    if (data) {
      const initialQuantities = data.reduce((acc, el) => {
        acc[el.id] = 1;
        return acc;
      }, {});
      setQuantities(initialQuantities);
    }
  }, [data]);

  const handleIncrement = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
  };

  const handleDecrement = (id) => {
    setQuantities((prev) => {
      const newQuantity = (prev[id] || 1) - 1;
      return { ...prev, [id]: newQuantity < 1 ? 1 : newQuantity };
    });
  };

  if (isLoading) return <div>Carregando carrinho...</div>;
  if (error) return <div>Erro ao carregar o carrinho: {error.message}</div>;

  if (!data || data.length === 0) {
    return <div>Seu carrinho está vazio!</div>;
  }

  const total = data.reduce((acc, el) => {
    const quantity = quantities[el.id] || 1;
    return acc + el.price * quantity;
  }, 0);

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
                <button onClick={() => handleIncrement(el.id)}>+</button>
                <p>{quantities[el.id] || 1}</p>
                <button onClick={() => handleDecrement(el.id)}>-</button>
              </div>
              <h4>apagar</h4>
            </div>
          </div>
        </div>
      ))}
      <div className={styles.total}>
        <h3>Total</h3>
        <h3>{total} ETH</h3>
      </div>
      <div className={styles.btnBuyContent}>
        <button className={styles.btnBuy}>Finalizar compra</button>
      </div>
    </main>
  );
}
