import { pokeApi } from "./data";
import "./components/exports";
import PokeCard, {Attribute} from "./components/card/card";

class AppContainer extends HTMLElement {
    arrayPokemon: PokeCard[] = [];
    
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        }
        
        async connectedCallback() {

            const data = await pokeApi()
            console.log(pokeApi)

            data?.forEach((user:any) => {
                const card = this.ownerDocument.createElement(
                    "poke-card"
                    ) as PokeCard;
                    card.setAttribute(Attribute.name, user.species.name);
                    card.setAttribute(Attribute.uid, String(user.id));
                    card.setAttribute(Attribute.img, user.sprites.front_default);
                    this.arrayPokemon.push(card);
                });

            this.render(this.arrayPokemon);
        }
        
        render(stars:any){
            if (this.shadowRoot) {
                this.shadowRoot.innerHTML = ``;
                
                this.arrayPokemon.forEach((pokemon) => {
                    this.shadowRoot?.appendChild(pokemon);
                });

                
            }
        }
    }
    
customElements.define("app-container", AppContainer);