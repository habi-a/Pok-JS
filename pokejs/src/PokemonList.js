import React, { Component } from 'react';
import MaterialTable from 'material-table';

class PokemonList extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            move_list: {},
            type_list: {}
        }
    }

    componentDidMount() {
        fetch("https://pokeapi.co/api/v2/move?offset=0&limit=9999")
        .then(res => res.json())
        .then(
            (result) => {
                var tmp_moves={};
                for (let i = 0; i < result.count; i++)
                    tmp_moves[result.results[i].name] = result.results[i].name;
                this.setState({
                    move_list: tmp_moves
                });
            },
            (error) => {
                this.setState({
                    error
                });
            }
        )
        fetch("https://pokeapi.co/api/v2/type")
        .then(res => res.json())
        .then(
            (result) => {
                var tmp_types={};
                for (let i = 0; i < result.count; i++)
                    tmp_types[result.results[i].name] = result.results[i].name;
                this.setState({
                    type_list: tmp_types
                });
            },
            (error) => {
                this.setState({
                    error
                });
            }
        )
    }

    static filters(pokemons, query)
    {
        pokemons = pokemons.filter(poke => poke.name.includes(query.search));
        for (let i = 0; i < query.filters.length; i++) {
            if (query.filters[i].column.field === "type")
                for (let j = 0; j < query.filters[i].value.length; j++)
                    pokemons = pokemons.filter(poke => poke.type.includes(query.filters[i].value[j]));
            else
                for (let j = 0; j < query.filters[i].value.length; j++)
                    pokemons = pokemons.filter(poke => poke.move.includes(query.filters[i].value[j]));
        }
        return pokemons;
    }

    static displayPicsPokemon(rowData) {
        return <img
            style={{ height: 50, borderRadius: '50%' }}
            src={rowData.picture}
            alt={"no_picture"}
        />
    }

    static displayTypes(rowData) {
        var table = []
        var types = rowData.type.split(', ');

        for (let i = 0; i < types.length; i++) {
            table.push(<tr>{types[i]}</tr>)
        }
        return table
    }

    static displayMoves(rowData) {}

    render()
    {
        const { error, move_list, type_list} = this.state;
        if (error) {
            return <div>Erreur : {error.message}</div>;
        } else {
            return (
                <MaterialTable
                    title="Pokedex"
                    columns={[
                        { title: 'ID', field: 'id', searchable: false, filtering: false },
                        { title: 'Picture', field: 'picture', searchable: false, filtering: false, render: (rowData) => PokemonList.displayPicsPokemon(rowData)},
                        { title: 'Name', field: 'name', type: 'string', filtering: false },
                        { title: 'Types', field: 'type', searchable: false, lookup: type_list, render: (rowData) => PokemonList.displayTypes(rowData)},
                        { title: 'Moves', field: 'move', searchable: false, lookup: move_list, render: (rowData) => PokemonList.displayMoves(rowData)}

                    ]}
                    data={query =>
                        new Promise((resolve, reject) => {
                            let url = 'https://pokeapi.co/api/v2/pokemon?'
                            url += 'offset=' + (query.page * query.pageSize)
                            url += '&limit=' + query.pageSize
                            fetch(url)
                            .then(response => response.json())
                            .then(result => {
                                let i = 0;
                                var pokemons = [];
                                var fetchNow = function(i) {
                                    fetch(result.results[i].url)
                                    .then(response => response.json())
                                    .then(result_detail => {
                                        if (i < result.results.length) {
                                            let tmp = { id: -666, name: result.results[i].name, type: ['unknown'], picture: 'https://wiki.p-insurgence.com/images/0/09/722.png', move: ['no_moves'] }
                                            tmp.id = result_detail.id;
                                            tmp.picture = result_detail.sprites.front_default;
                                            if (result_detail.types.length)
                                                tmp.type = [];
                                            if (result_detail.moves.length)
                                                tmp.move = [];
                                            for (let j = 0; j < result_detail.types.length; j++)
                                                tmp.type.push(result_detail.types[j].type.name);
                                            for (let j = 0; j < result_detail.moves.length; j++)
                                                tmp.move.push(result_detail.moves[j].move.name);
                                            tmp.type = tmp.type.join(", ");
                                            tmp.move = tmp.move.join(", ");
                                            pokemons.push(tmp);
                                            i++;
                                        }
                                        if (i === result.results.length) {
                                            pokemons = PokemonList.filters(pokemons, query);
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
                        search: true,
                        filtering: true,
                        pageSizeOptions: [5, 10, 20, 50],
                        headerStyle: {
                          backgroundColor: '#01579b',
                          color: '#FFF'
                        },
                        rowStyle: rowData => ({
                            backgroundColor: (rowData.tableData.id % 2 === 0) ? '#DDD' : '#FFF'
                        })
                    }}
                    detailPanel={[{
                        tooltip: 'Show Details',
                        render: rowData => {
                            return (
                                <div
                                style={{
                                    fontSize: 100,
                                    textAlign: 'center',
                                    color: 'white',
                                    backgroundColor: '#43A047',
                                }}
                                >
                                {rowData.id}
                                </div>
                            )
                        },
                    }]}
                    onRowClick={(event, rowData, togglePanel) => togglePanel()}
                />
            );
        }
    }
}

export default PokemonList;
