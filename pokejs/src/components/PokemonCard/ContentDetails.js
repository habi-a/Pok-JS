import React from "react";
import styled from 'styled-components';


const Sprite = styled.img`
  width: 5em;
  height: 5em;
  display: none;
`;

export default class ContentDetails extends React.Component {
  state = {
    name: '',
    imageUrl: '',
    pokemonIndex: '',
    imageLoading: true,
  };

  render() {
    return (
    <div className="modal">
      <div className="header"> Pikachu </div>
      <div className="id">No.25</div>
      <div className="types">Electrik</div>
      <div className="types">TYPES POKEMON</div>
      <div className="content">
        <br />
        <Sprite className="card-poke-img" 
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" 
                onLoad={() => this.setState({ imageLoading: false })}
                onError={() => this.setState({ toManyRequests: true })} 
                style={
                  this.state.toManyRequests
                    ? { display: 'none' }
                    : this.state.imageLoading
                    ? null
                    : { display: 'block' }
                }
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
        <li>tous les mouvements qu'il peut apprendre;</li>
        <li>tous les mouvements qu'il peut apprendre;</li>
        <li>tous les mouvements qu'il peut apprendre;</li>
        <li>tous les mouvements qu'il peut apprendre;</li>
        <li>tous les mouvements qu'il peut apprendre;</li>
        <li>tous les mouvements qu'il peut apprendre;</li>
      </div>
      <div className="separator"></div>


      <div className="describe">
      <p className="title">Describes : </p>
        <p>	Ce POKéMON dispose de petites poches dans les joues pour stocker de l'électricité. Elles semblent se charger pendant que PIKACHU dort. Il libère parfois un peu d'électricité lorsqu'il n'est pas encore bien réveillé.</p>
      </div>
      <div className="separator"></div>


      <p className="title">Evolutions : </p>
      <div className="evolutions">
        <Sprite  className="column" 
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/172.png" 
                onLoad={() => this.setState({ imageLoading: false })}
                onError={() => this.setState({ toManyRequests: true })} 
                style={
                  this.state.toManyRequests
                    ? { display: 'none' }
                    : this.state.imageLoading
                    ? null
                    : { display: 'block' }
                }
              />
        <Sprite  className="column" 
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" 
                onLoad={() => this.setState({ imageLoading: false })}
                onError={() => this.setState({ toManyRequests: true })} 
                style={
                  this.state.toManyRequests
                    ? { display: 'none' }
                    : this.state.imageLoading
                    ? null
                    : { display: 'block' }
                }
              />
        <Sprite  className="column" 
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/26.png" 
                onLoad={() => this.setState({ imageLoading: false })}
                onError={() => this.setState({ toManyRequests: true })} 
                style={
                  this.state.toManyRequests
                    ? { display: 'none' }
                    : this.state.imageLoading
                    ? null
                    : { display: 'block' }
                }
              />
      </div>
      <div className="separator"></div>


      <div className="items">
      <p className="title">Items : </p>
      <li>les objets qu'il peut transporter pendant la capture;</li>
      <li>les objets qu'il peut transporter pendant la capture;</li>
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
