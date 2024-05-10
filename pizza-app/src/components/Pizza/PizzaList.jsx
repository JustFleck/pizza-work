import { useEffect, useState } from "react";
import PizzaCard from "./PizzaCard"
import Loading from "../Loading";
import Error from "../error";

function PizzaList() {
    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        async function fetchPizzas() {
            try{
                setIsLoading(true);
                const res = await fetch(
                    "https://6637a5d8288fedf69380eaf1.mockapi.io/Pizza"
                );
                const data = await res.json();
                setPizzas(data);
            } catch(errer) {
                setIsError(true);
            } finally{
                setIsLoading(false);
            }
        }

        fetchPizzas()
    }, [] );
    return(
        <section class="pizzas">
            <div class="container">
                <h1 class="title" >Choose your pizza</h1>
                <div class="pizzas-row">
                    { isLoading ? (
                        <Loading />
                    ): (pizzas.map((pizza) => <PizzaCard pizza={pizza} key={pizza.id} />)
                       ) 
                    }
                    {isError && <Error/> }
                </div>
            </div>
        </section>
    )
}

export default PizzaList;