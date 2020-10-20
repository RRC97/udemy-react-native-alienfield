import React, { Component, Fragment } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Field from '../components/Field';
import Header from '../components/Header';

export default class MainPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            finished: false,
            isLoading: true,

        }

        this.createTiles = this.createTiles.bind(this);
        this.markedChanged = this.markedChanged.bind(this);
        this.finishGame = this.finishGame.bind(this);
        this.resumeGame = this.resumeGame.bind(this);
    }
    createTiles(size, level) {
        this.header.setState({started: true, markedCount: 0});
        this.setState({isLoading: false, finished: false});
        this.field.setState({loadingMessage: 'Creating the Field...'});
        this.field.createTiles(size, level);
    }
    finishGame() {
        this.field.finishGame();
    }

    markedChanged(markedCount) {
        this.header.markedChanged(markedCount);
    }
    resumeGame() {
        this.header.setState({finished: false, started: false});
    }

    render() {
        return (
            <View style={this.styles.container}>
                <Header ref={ref => this.header = ref} play={this.createTiles} finish={this.finishGame}/>
                <Field ref={ref => this.field = ref} markedChanged={this.markedChanged} finish={this.resumeGame}/>
            </View>
        );
    }

    styles = StyleSheet.create({
        container: {
            flex: 1,
        }
    });
}