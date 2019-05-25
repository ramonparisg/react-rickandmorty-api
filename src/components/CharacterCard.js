import React, {Component} from 'react';

class CharacterCard extends Component {

    render() {
        const { character } = this.props;

        return (
            <div className="CharacterCard" style={{backgroundImage : `url(${character.image})`}} >
                <div className="CharacterCard__name-container text-truncate">
                    <h5 className="">{character.name}</h5>
                </div>
            </div>

        );
    }
}

export default CharacterCard;