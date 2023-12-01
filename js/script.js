//https://pokeapi.co/api/v2/pokemon
const app = document.getElementById('app')
const searchBtn = document.getElementById('searchBtn')
const prevBtn = document.getElementById('prevBtn')
const nextBtn = document.getElementById('nextBtn')
const resetBtn = document.getElementById('resetBtn')
let next;
let prev;

const print = (pokemon, url) => {
        app.innerHTML += `
        <div class="card">
        <img src="${url}" alt="image of ${pokemon}" />
        <p>${pokemon}</p>
        </div>
        `
}

const apiOnePokemon = async (url) => {
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error ('Ha surgido un problema.')
        }
        const data = await res.json()
        return data.sprites.front_default
    } catch (error) {
        console.log('Error al obtener los datos', error);
    }
}

const apiPokemon = async (url) => {
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error ('Ha surgido un problema.')
        }
        const pokemons = await res.json()
        app.innerHTML = ''
        for (let pokemon of pokemons.results) {
            const url = await apiOnePokemon(pokemon.url)
            print(pokemon.name, url )
        }
        console.log(pokemons.next)
        nextBtn.eventListener(a)
        let a = nextBtn.addEventListener('click', () => {
            apiPokemon(pokemons.next)
        })
    } catch (error) {
        console.log('Error al obtener los datos', error);
    }
}

apiPokemon('https://pokeapi.co/api/v2/pokemon?limit=10')