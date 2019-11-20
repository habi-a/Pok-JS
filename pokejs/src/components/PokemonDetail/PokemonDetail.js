import React, { Component } from 'react';

import './Pokemon.css';


function PokemonMoves(props) {
    var table = []
    var moves = props.moves.split(', ');

    for (let i = 0; i < moves.length; i++) {
        table.push(<li>{moves[i]} , </li>)
    }
    return table
}

function PokemonItems(props) {
    var table = []
    var items = props.items.split(', ');

    for (let i = 0; i < items.length; i++) {
        table.push(<li>{items[i]}</li>)
    }
    return table
}

class PokemonDetail extends Component {
    static arrayFill(arrayToFill, valueToFill) {
        var tmp = ['no_data'];
        if (arrayToFill) {
            if (arrayToFill.length)
                tmp = [];
            for (let i = 0; i < arrayToFill.length; i++) {
                switch (valueToFill) {
                    case 'type':
                        tmp.push(arrayToFill[i].type.name);
                        break;
                    case 'move':
                        tmp.push(arrayToFill[i].move.name);
                        break;
                    case 'item':
                        tmp.push(arrayToFill[i].item.name);
                        break;
                    default:
                        break;
                }
            }
        }
        tmp = tmp.join(", ");
        return tmp;
    }

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            name: '',
            family: '',
            imageUrl: '',
            pokemonIndex: '',
            types: '',
            moves: '',
            items: '',
            isLoaded: false,
        }
    }

    componentDidMount() {
        fetch("https://pokeapi.co/api/v2/pokemon/" + this.props.id)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    pokemonIndex: this.props.id,
                    name: result.name,
                    types: PokemonDetail.arrayFill(result.types, 'type'),
                    moves: PokemonDetail.arrayFill(result.moves, 'move'),
                    items: PokemonDetail.arrayFill(result.items, 'item'),
                    imageUrl: result.sprites.front_default
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

    render() {
        const { error, name, pokemonIndex, types, moves, items, imageUrl} = this.state;
        if (error) {
            return <div>Erreur : {error.message}</div>;
        } else {
            return (
                <div className="modal">
                    <div className="header">{name}</div>
                    <div className="id">No. {pokemonIndex}</div>
                    <div className="types">{types}</div>
                    <div className="content">
                    <br />
                    <img className="card-poke-img"
                        src={imageUrl}
                        alt='no_picture'
                    />

                    <div className="stats-poke left">
                        <div>HP</div>
                        <div>Attack</div>
                        <div>Defensive</div>
                        <div>Speed</div>
                    </div>

                    <div className="stats-poke right">
                        <div
                        className="progress-bar "
                        role="progressbar"
                        style={{
                            width: "800%",
                            backgroundColor: `#0164f9`
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        >
                            <small>100</small>
                        </div>
                        <div
                        className="progress-bar "
                        role="progressbar"
                        style={{
                            width: "800%",
                            backgroundColor: `#0164f9`
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        >
                            <small>50</small>
                        </div>
                        <div
                        className="progress-bar "
                        role="progressbar"
                        style={{
                            width: "800%",
                            backgroundColor: `#0164f9`
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        >
                            <small>80</small>
                        </div>
                        <div
                        className="progress-bar "
                        role="progressbar"
                        style={{
                            width: "800%",
                            backgroundColor: `#0164f9`
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        >
                            <small>20</small>
                        </div>
                    </div>
                </div>
                <div className="separator"></div>
                    <div className="moves">
                        <p className="title">Moves : </p>
                        <p><PokemonMoves moves={moves} /></p>
                    </div>
                    <div className="separator"></div>
                    <div className="describe">
                        <p className="title">Describes : </p>
                        <p>	Ce POKéMON dispose de petites poches dans les joues pour stocker de l'électricité. Elles semblent se charger pendant que PIKACHU dort. Il libère parfois un peu d'électricité lorsqu'il n'est pas encore bien réveillé.</p>
                    </div>
                    <div className="separator"></div>


                    <p className="title">Evolutions : </p>
                    <div className="evolutions">
                        <img className="column"
                            src={imageUrl}
                            alt='no_picture'
                        />
                        <img className="column"
                            src={imageUrl}
                            alt='no_picture'
                        />
                        <img className="column"
                            src={imageUrl}
                            alt='no_picture'
                        />
                    </div>
                    <div className="separator"></div>


                    <div className="items">
                        <p className="title">Items : </p>
                        <PokemonItems items={items}/>
                    </div>
                    <div className="separator"></div>


                    <div className="family">
                        <p className="title">Family : </p>
                        <p>la famille à laquelle il appartient (par exemple, Pikachu est un Mouse Pokémon);</p>
                    </div>

                </div>
            );
        }
    }
}

export default PokemonDetail;
