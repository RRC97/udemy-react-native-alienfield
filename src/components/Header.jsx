import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            level: 2,
            size: 2,
            markedCount: 0,
            finished: false,
            started: false,
        }

        this.changeLevel = this.changeLevel.bind(this);
        this.changeSize = this.changeSize.bind(this);
    }

    changeLevel(newLevel) {
        this.setState({level: newLevel});
    }

    changeSize(newSize) {
        this.setState({size: newSize});
    }

    markedChanged(markedCount) {
        this.setState({markedCount});
    }

    render() {
        return (
            <View style={this.styles.header}>
                <Text style={this.styles.headerTitle}>Settings</Text>
                <View style={this.styles.settings}>
                    <View style={this.styles.level}>
                        <Text style={this.styles.levelTitle}>Level: </Text>
                        <TouchableHighlight style={this.state.level === 1 ? this.styles.buttonRadioChecked : this.styles.buttonRadio} onPress={() => this.changeLevel(1)}>
                            <Text style={this.state.level === 1 ? this.styles.buttonRadioCheckedText : this.styles.buttonRadioText}>Easy</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={this.state.level === 2 ? this.styles.buttonRadioChecked : this.styles.buttonRadio} onPress={() => this.changeLevel(2)}>
                            <Text style={this.state.level === 2 ? this.styles.buttonRadioCheckedText : this.styles.buttonRadioText}>Normal</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={this.state.level === 3 ? this.styles.buttonRadioChecked : this.styles.buttonRadio} onPress={() => this.changeLevel(3)}>
                            <Text style={this.state.level === 3 ? this.styles.buttonRadioCheckedText : this.styles.buttonRadioText}>Hard</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={this.styles.size}>
                        <Text style={this.styles.sizeTitle}>Field Size: </Text>
                        <TouchableHighlight style={this.state.size === 1 ? this.styles.buttonRadioChecked : this.styles.buttonRadio} onPress={() => this.changeSize(1)}>
                            <Text style={this.state.size === 1 ? this.styles.buttonRadioCheckedText : this.styles.buttonRadioText}>Small</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={this.state.size === 2 ? this.styles.buttonRadioChecked : this.styles.buttonRadio} onPress={() => this.changeSize(2)}>
                            <Text style={this.state.size === 2 ? this.styles.buttonRadioCheckedText : this.styles.buttonRadioText}>Normal</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={this.state.size === 3 ? this.styles.buttonRadioChecked : this.styles.buttonRadio} onPress={() => this.changeSize(3)}>
                            <Text style={this.state.size === 3 ? this.styles.buttonRadioCheckedText : this.styles.buttonRadioText}>Large</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={this.styles.info}>
                    <Text style={this.styles.infoText}>&#128126; {this.state.markedCount}/{Math.floor((this.state.size + 1) * 5 * (this.state.size + 1) * 5 * (this.state.level / 10))}</Text>
                    <TouchableHighlight style={this.styles.buttonPlay} onPress={() => {this.state.finished || !this.state.started ? this.props.play(this.state.size, this.state.level) : this.props.finish()}}>
                        <Text style={this.styles.buttonPlayText}>{this.state.finished || !this.state.started ? 'Play' : 'Check'}</Text>
                    </TouchableHighlight>
                </View>
                
            </View>
        );
    }

    styles = StyleSheet.create({
        header: {
            flex: 1,
            padding: 30,
            flexDirection: 'column',
            backgroundColor: 'black',
        },
        headerTitle: {
            color: '#76ff03',
            fontSize: 32,
            fontWeight: 'bold',
            borderBottomColor: '#76ff03',
            borderBottomWidth: 2,
        },
        settings: {
            flex: 3,
            flexDirection: 'row',
        },
        level: {
            marginTop: 10,
            marginRight: 20,
            flex: 1,
        },
        levelTitle: {
            color: '#76ff03',
            fontSize: 24,
        },
        buttonRadio: {
            padding: 10,
            borderColor: '#76ff03',
            borderWidth: 3,
            borderRadius: 10,
            marginTop: 10,
        },
        buttonRadioText: {
            color: '#76ff03',
            fontWeight: 'bold',
            fontSize: 20,
            textAlign: 'center',
        },
        buttonRadioChecked: {
            padding: 13,
            borderColor: '#76ff03',
            backgroundColor: '#76ff03',
            borderRadius: 10,
            marginTop: 10,
        },
        buttonRadioCheckedText: {
            fontWeight: 'bold',
            fontSize: 20,
            textAlign: 'center',
            color: 'black',
        },
        buttonPlay: {
            flex: 1,
            padding: 10,
            borderColor: '#76ff03',
            borderWidth: 3,
            borderRadius: 10,
            marginTop: 10,
        },
        buttonPlayText: {
            color: '#76ff03',
            fontWeight: 'bold',
            fontSize: 32,
            textAlign: 'center',
        },
        size: {
            marginTop: 10,
            flex: 1,
        },
        sizeTitle: {
            color: '#76ff03',
            fontSize: 24,
        },
        info: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        infoText: {
            flex: 1,
            marginTop: 10,
            marginRight: 20,
            borderColor: '#76ff03',
            color: '#76ff03',
            padding: 10,
            borderWidth: 3,
            borderRadius: 10,
            fontSize: 32,
            fontWeight: 'bold',
            textAlign: 'center',
        }
    });
}