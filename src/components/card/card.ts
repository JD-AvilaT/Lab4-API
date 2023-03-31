import styles from "./card.css";

export enum Attribute {
    "name" = "name",
    "img" = "img",
    "uid" = "uid"
}

class PokeCard extends HTMLElement {
    name?: string;
    img?: string;
    uid?: number;

    static get observedAttributes() {
        const attrs: Record<Attribute, null> = {
            name: null,
            img: null,
            uid: null,
        };
        return Object.keys(attrs);
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(
        propName: Attribute,
        _: string | undefined,
        newValue: string | undefined
        ) {
            switch (propName) {
                case Attribute.uid:
                this.uid = newValue ? Number(newValue) : undefined;
                break;

                default:
                this[propName] = newValue;
                break;
            }

            this.render();
        }

        render() {
            if (this.shadowRoot) {
                this.shadowRoot.innerHTML = ``

                const css = this.ownerDocument.createElement("style");
                css.innerHTML = styles;
                this.shadowRoot?.appendChild(css);

                this.shadowRoot.innerHTML += `
                <section>
                    <img src="${this.img}">
                    <div class="info">
                        <h1>${this.name}</h1>
                        <p> #${this.uid} </p>
                    </div>
                </section>
                `;
            }
        }
    }

customElements.define("poke-card", PokeCard);
export default PokeCard;