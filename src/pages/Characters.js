import React, {Component} from 'react';
import CharacterCard from '../components/CharacterCard';
import './styles/style.css';
import logo from '../images/logo.png'
import Loader from '../components/Loader'

class Characters extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: false,
            data: {
                results: []
            },
            nextPage: 1
        };
        window.onscroll = this.detectScrollEnd;
    }

    componentDidMount() {
        this.fetchCharacters();
    }

    fetchCharacters = async () => {
        this.setState({loading: true, error: false});

        try {
            const response = await fetch(`https://rickandmortyapi.com/api/character?page=${this.state.nextPage}`);
            const data = await response.json();

            this.setState(() => ({
                loading: false,
                data: {
                    info: data.info,
                    results: [].concat(this.state.data.results, data.results)
                },
                nextPage: this.state.nextPage + 1
            }));
        } catch (e) {
            this.setState(() => ({
                loading: false,
                error: e
            }));
        }


    };

    detectScrollEnd = () => {
      const contentHeight = document.body.offsetHeight;
      const scrollPosition = window.scrollY + window.innerHeight;
      if (scrollPosition >= contentHeight) {
          if (!this.state.loading) {
              this.fetchCharacters();
          }
      }
    };


    render() {
        return (
            <div className="container">
                <div className="App">
                    <img src={logo} alt="Logo" className="Logo"/>
                    <ul className="row">
                        {this.state.data.results.map(character => {
                            return (
                                <li className="col-3" key={character.id}>
                                    <CharacterCard character={character}/>
                                </li>
                            )
                        })}
                    </ul>
                    {this.state.loading &&
                    <div className="loader">
                        <Loader/>
                    </div>}
                </div>
            </div>
        );
    }
}

export default Characters;