export async function pokeApi() {
	try {

			const pokemon = []
			for(let i=1; i<51; i++){
			const poke = await (await fetch("https://pokeapi.co/api/v2/pokemon/" + i)).json()
			pokemon.push(poke)
			}
			console.log(pokemon)
			return pokemon
	}
	catch(error){
		console.log(error)
	}
}
