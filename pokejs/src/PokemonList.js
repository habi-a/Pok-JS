import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import MaterialTable from 'material-table';

class PokemonList extends Component {
    componentDidMount() {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=964")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    pokemons: result.results
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
        return (
            <MaterialTable
                title="Pokedex"
                columns={[
                    { title: 'ID', field: 'id', filtering: false },
                    { title: 'Picture', field: 'picture', filtering: false, render: rowData => (
                        <img
                            style={{ height: 36, borderRadius: '50%' }}
                            src={rowData.picture}
                            alt={"A pokemon pics"}
                        />
                    )},
                    { title: 'Name', field: 'name', type: 'string' },
                    { title: 'Type', field: 'type', type: 'string' }
                ]}
                data={query =>
                    new Promise((resolve, reject) => {
                        let url = 'https://pokeapi.co/api/v2/pokemon?'
                        url += 'offset=' + (query.page * query.pageSize)
                        url += '&limit=' + query.pageSize
                        fetch(url)
                        .then(response => response.json())
                        .then(result => {
                            var pokemons = [];
                            for (var i = 0; i < result.results.length; i++) {
                                let tmp = { id: 0, name: result.results[i].name, type: 'unknown', picture: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png' }
                                fetch(result.results[i].url)
                                .then(response => response.json())
                                .then(result_detail => {
                                    tmp.picture = result_detail.sprites.front_default;
                                    pokemons.push(tmp);
                                })
                            }
                            resolve({
                                data: pokemons,
                                page: query.page,
                                totalCount: result.count
                            })
                        })
                    })
                }
                options={{
                    sorting: true,
                    filtering: true
                }}
                actions={[{
                    icon: 'details',
                    tooltip: 'See details of the Pokemon',
                    onClick: (event, rowData) => alert("You saved " + rowData.id)
                }]}
                components={{
                    Action: props => (
                        <Button
                            onClick={(event) => props.action.onClick(event, props.data)}
                            color="primary"
                            variant="contained"
                            style={{textTransform: 'none'}}
                            size="small"
                        >
                            Details
                        </Button>
                    ),
                }}
            />
        );
    }
}

export default PokemonList;
