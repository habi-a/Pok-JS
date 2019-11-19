import React from 'react';
import Popup from "reactjs-popup";
import ContentDetails from "./ContentDetails.js"
import './Pokemon.css';

export default class PokemonDetails extends React.Component {
  state = {
    open: false
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };
 
  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    return (
      <div>
        <Popup modal styles="width:70%;height:50%" trigger={<button>Click Me</button>}>
        {close => <ContentDetails close={close} />}
        </Popup>
      </div>
    );
  }
}
