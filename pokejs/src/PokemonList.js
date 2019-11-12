import React from 'react';
import MaterialTable from 'material-table';

export default function PokemonListUI() {
    const [state, setState] = React.useState({
        columns: [
            { title: 'ID', field: 'id', type: 'numeric' },
            { title: 'Name', field: 'name', type: 'string' },
            { title: 'Type', field: 'type', type: 'string' },
            { title: 'Picture', field: 'picture', render: rowData => (
                <img
                    style={{ height: 36, borderRadius: '50%' }}
                    src={rowData.avatar}
                />
                ),
            }
        ],
        data: [
            { id: 1, name: 'Pikachu', type: 'Electrik'}
        ]
    });

    return (
        <MaterialTable
            title="Pokedex"
            columns={state.columns}
            data={state.data}
            options={{
                sorting: true
            }}
        />
    );
}
