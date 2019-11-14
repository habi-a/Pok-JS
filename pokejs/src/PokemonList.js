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
                            var i = 0;
                            var pokemons = [];
                            var fetchNow = function(i) {
                                fetch(result.results[i].url)
                                .then(response => response.json())
                                .then(result_detail => {
                                    if (i < result.results.length) {
                                        let tmp = { id: -666, name: result.results[i].name, type: ['unknown'], picture: 'https://wiki.p-insurgence.com/File:722.png' }
                                        tmp.id = result_detail.id;
                                        tmp.picture = result_detail.sprites.front_default;
                                        if (result_detail.types.length)
                                            tmp.type = [];
                                        for (var j = 0; j < result_detail.types.length; j++)
                                            tmp.type.push(result_detail.types[j].type.name);
                                        tmp.type = tmp.type.join(", ");
                                        pokemons.push(tmp);
                                        i++;
                                    }
                                    if (i === result.results.length) {
                                        resolve({
                                            data: pokemons,
                                            page: query.page,
                                            totalCount: result.count
                                        })
                                    }
                                    else
                                        fetchNow(i);
                                })
                            }
                            fetchNow(i);
                        })
                    })
                }
                options={{
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
