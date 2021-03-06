import React, { Component } from 'react';
import { Image, TouchableOpacity, AsyncStorage, View } from 'react-native';

class GameTile extends Component {
    state = { isTurned: false, isFlipped: null, dim: null }
     async componentWillMount() {
         const height = parseInt(JSON.parse(await AsyncStorage.getItem('Height')));
         const width = parseInt(JSON.parse(await AsyncStorage.getItem('Width')));
         const newHeight = parseFloat((height - 80) / 2);
         const newWidth = parseFloat((width - 20) / 4);
         if (newWidth <= newHeight) {
             this.setState({ dim: newWidth });
         }
         if (newHeight < newWidth) {
             this.setState({ dim: newHeight });
         }
    }

    //async getData() {
       // return JSON.stringify(await AsyncStorage.getItem('Cards'));
    //}
    /*
    async componentDidMount() {
        console.log('im in component will mount!');
        const cards = JSON.parse(await AsyncStorage.getItem('Cards'));
        //console.log(cards);
        if (cards.length !== 0) {
            const finder = cards.find((card) => card === this.props.trueKey);
        if (finder !== undefined && finder !== -1) {
            this.setState({ isFlipped: true });
        } else {
            this.setState({ isFlipped: false });
        }
    }
        if (cards.length === 0) {
            this.setState({ isFlipped: false });
        }
    }*/

    render() {
        if (this.state.dim !== null) {
            let isFlipped = null;
    if (this.props.cards !== null) {
        if (this.props.cards.length !== 0) {
            const finder = this.props.cards.find((card) => card === this.props.trueKey);
        if (finder !== undefined && finder !== -1) {
            isFlipped = true;
        } else {
            isFlipped = false;
        }
    }
        if (this.props.cards.length === 0) {
            isFlipped = false;
        }
    }
    if (this.props.cards === null) {
        isFlipped = false;
    }
    if (isFlipped === false) {
        if (this.props.card1 === null) { //No cards are selected.
        return (
            <TouchableOpacity 
            onPress={() => {
                this.setState({ isTurned: true });
                this.props.onPress(true);
                }}
            >
                <Image source={require('./picturecard.png')} style={{ height: this.state.dim, width: this.state.dim }} />
            </TouchableOpacity>
        );
    }
    if (this.props.card1 !== null) { //There could be one card selected, or two for comparison
        if (this.props.card2 === null) { //There is only one card selected. But which one?
            if (this.props.card1.id === this.props.trueKey) {
                return (
                    <Image source={{ uri: this.props.uri }} style={{ height: this.state.dim, width: this.state.dim }} />
                );
            }
            if (this.props.card1.id !== this.props.trueKey) {
                return (
                 <TouchableOpacity 
                onPress={() => {
                this.setState({ isTurned: true });
                this.props.onPress(true);
                }}
            >
                <Image source={require('./picturecard.png')} style={{ height: this.state.dim, width: this.state.dim }} />
            </TouchableOpacity>
        );
            }
        }
        if (this.props.card2 !== null) { //There are two cards selected
            if (this.props.card2.id === this.props.trueKey || this.props.card1.id === this.props.trueKey) { //First, am I among the two cards selected?
                this.props.onFlip();
                return (
                    <Image source={{ uri: this.props.uri }} style={{ height: this.state.dim, width: this.state.dim }} />
                );
            } else {
                return (
                 <TouchableOpacity 
                onPress={() => {
                this.setState({ isTurned: true });
                this.props.onPress(true);
                }}
            >
                <Image source={require('./picturecard.png')} style={{ height: this.state.dim, width: this.state.dim }} />
            </TouchableOpacity>
        );
            }
            }
        }
    }
        if (isFlipped === null) {
            return (
                <Image source={require('./picturecard.png')} style={{ height: this.state.dim, width: this.state.dim }} />
            );
        }
        if (isFlipped === true) {
            return (
                <Image source={{ uri: this.props.uri }} style={{ height: this.state.dim, width: this.state.dim }} />
            );
        }
    }
        if (this.state.dim === null) {
            return (
                <View />
            );
        }
    }
}

export { GameTile };
