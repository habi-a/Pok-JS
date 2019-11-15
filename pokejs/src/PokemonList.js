import React, { Component } from 'react';
import MaterialTable from 'material-table';

class PokemonList extends Component
{
    static type_list = {
        'normal': 'normal',
        'fire': 'fire',
        'fighting': 'fighting',
        'water': 'water',
        'flying': 'flying',
        'grass': 'grass',
        'poison': 'poison',
        'electric': 'electric',
        'ground': 'ground',
        'psychic': 'psychic',
        'rock': 'rock',
        'ice': 'ice',
        'bug': 'bug',
        'dragon': 'dragon',
        'ghost': 'ghost',
        'dark': 'dark',
        'steel': 'steel',
        'fairy': 'fairy',
        'unknwon': 'unknwon',
        'shadow': 'shadow'
    }

    static filters(pokemons, query)
    {
        pokemons = pokemons.filter(poke => poke.name.includes(query.search));
        if (query.filters.length !== 0) {
            for (var i = 0; i < query.filters[0].value.length; i++)
                pokemons = pokemons.filter(poke => poke.type.includes(query.filters[0].value[i]));
        }
        return pokemons;
    }

    render()
    {
        return (
            <MaterialTable
                title="Pokedex"
                columns={[
                    { title: 'ID', field: 'id', searchable: false, filtering: false },
                    { title: 'Picture', field: 'picture', searchable: false, filtering: false, render: rowData => (
                        <img
                            style={{ height: 36, borderRadius: '50%' }}
                            src={rowData.picture}
                            alt={"no_picture"}
                        />
                    )},
                    { title: 'Name', field: 'name', type: 'string', filtering: false },
                    { title: 'Type', field: 'type', searchable: false, lookup: PokemonList.type_list}
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
                                        let tmp = { id: -666, name: result.results[i].name, type: ['unknown'], picture: 'https://wiki.p-insurgence.com/images/0/09/722.png' }
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
                pageSizeOptions={[5, 10, 20, 50]}
                options={{
                    search: true,
                    filtering: true
                }}
                detailPanel={[{
                    tooltip: 'Show Name',
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

export default PokemonList;
