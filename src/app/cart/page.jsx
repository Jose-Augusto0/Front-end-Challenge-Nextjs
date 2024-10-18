"use client";
import styles from "./cart.module.scss";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";
import { FaEthereum } from "react-icons/fa";

const fetchCart = async () => {
  const { data } = await axios.get("http://localhost:3001/cart");
  return data;
};

const deleteFromCartApi = async (itemId) => {
  const response = await axios.delete(`http://localhost:3001/cart/${itemId}`);
  return response.data;
};

export default function Cart({onClose}) {
  const queryClient = useQueryClient();
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

  const mutation = useMutation({
    mutationFn: deleteFromCartApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });

  const handleDelete = (itemId) => {
    mutation.mutate(itemId);
  };

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
        <IoArrowBackSharp className={styles.back} size={40} onClick={onClose}/>
        <h3>Mochila de compras</h3>
      </div>
      {data.map((el) => (
        <div key={el.id} className={styles.contentItemsCart}>
          <div className={styles.image}>
            <Image
              className={styles.img}
              src={el.image}
              alt={el.name}
              width={80}
              height={80}
              priority={true}
            />
          </div>
          <div className={styles.items}>
            <div className={styles.descriptionItem}>
              <div className={styles.title}>{el.name}</div>
              <h3 className={styles.price}>
                <div>
                  <FaEthereum className={styles.coin} />
                </div>
                {el.price} ETH
              </h3>
            </div>
            <div className={styles.quantityContent}>
              <div className={styles.quantity}>
                <button onClick={() => handleIncrement(el.id)}>+</button>
                <p>{quantities[el.id] || 1}</p>
                <button onClick={() => handleDecrement(el.id)}>-</button>
              </div>
              <AiFillDelete
                className={styles.delete}
                size={30}
                onClick={() => handleDelete(el.id)}
              />
            </div>
          </div>
        </div>
      ))}
      <div className={styles.total}>
        <h3>Total</h3>
        <div className={styles.coin}>
          <div>
            <FaEthereum className={styles.coin} />
          </div>
          {total} ETH
        </div>
      </div>
      <div className={styles.btnBuyContent}>
        <button className={styles.btnBuy}>Finalizar compra</button>
      </div>
    </main>
  );
}
