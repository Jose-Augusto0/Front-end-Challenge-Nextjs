"use client";
import Image from "next/image";
import styles from "./page.module.scss";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { addToCart } from "./store/cartSlice";
import { RiShoppingBagFill } from "react-icons/ri";
import { FaEthereum } from "react-icons/fa";

const fetchNfts = async () => {
  const { data } = await axios.get(
    "https://starsoft-challenge-7dfd4a56a575.herokuapp.com/v1/products?page=1&limit=8"
  );
  return data.data;
};

const fetchCart = async () => {
  const { data } = await axios.get("http://localhost:3001/cart");
  return data;
};

const addToCartApi = async (nft) => {
  const response = await axios.post("http://localhost:3001/cart", nft);
  return response.data;
};

export default function Home() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const {
    data: data,
    error: dataError,
    isLoading: dataLoading,
  } = useQuery({
    queryKey: ["data"],
    queryFn: fetchNfts,
  });

  const {
    data: cartItems,
    error: cartError,
    isLoading: cartLoading,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
  });

  const mutation = useMutation({
    mutationFn: addToCartApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });

  const handleAddToCart = (nft) => {
    mutation.mutate(nft);
    dispatch(addToCart(nft));
  };

  if (dataLoading) return <div>Carregando nft's...</div>;
  if (dataError) return <div>Erro ao carregar nft's: {dataError.message}</div>;

  if (cartLoading) return <div>Carregando carrinho...</div>;
  if (cartError)
    return <div>Erro ao carregar o carrinho: {cartError.message}</div>;

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Starsoft</h1>
        <span className={styles.cart}>
          <RiShoppingBagFill color="#ff8310" size={30} />
          <p>{cartItems.length}</p>
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
              <div className={styles.price}>
                <div className={styles.coin}>
                  <FaEthereum />
                </div>
                <h2>{el.price} ETH</h2> 
              </div>
              <button
                className={styles.addCart}
                onClick={() => handleAddToCart(el)}
              >
                Adicionar ao carrinho
              </button>
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
