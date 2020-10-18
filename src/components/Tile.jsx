import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class Tile extends Component {

    render() {
        if(this.props.tile.showing || false) {
            return (
                <TouchableOpacity style={this.styles.tileActived} onPress={() => this.props.onClick(this.props.index)}>
                    {this.props.tile.value >= 0
                    ?<Text style={this.styles.label}>{this.props.tile.value || ''}</Text>
                    :<Text style={this.styles.label}>&#128163;</Text>}
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity style={this.styles.tile} onPress={() => this.props.onClick(this.props.index)} onLongPress={() => this.props.onLongClick(this.props.index)}>
                    {this.props.tile.marked
                    ?<Text style={this.styles.labelMarked}>&#9873;</Text>
                    :<Text style={this.styles.label}></Text>}
                </TouchableOpacity>
            );
        }
    }

    colors = {
        light: '#80d6ff',
        dark: '#0077c2',
        primary: '#42a5f5',
        secondary: '#e3f2fd',
        values: [
            'blue', 'green', 'goldenrod', 'red', 'darkblue', 'darkgreen', 'darkred', 'black'
        ]
    }

    styles = StyleSheet.create({
        tile: {
            backgroundColor: this.colors.primary,
            width: this.props.size,
            height:this.props.size,
            borderWidth: 3,
            borderTopColor: this.colors.light,
            borderLeftColor: this.colors.light,
            borderBottomColor: this.colors.dark,
            borderRightColor: this.colors.dark,
            justifyContent: 'center',
            alignItems: 'center'
        },
        tileActived: {
            backgroundColor: this.colors.secondary,
            width: this.props.size,
            height:this.props.size,
            borderWidth: 3,
            borderTopColor: this.colors.dark,
            borderLeftColor: this.colors.dark,
            borderBottomColor: this.colors.light,
            borderRightColor: this.colors.light,
            justifyContent: 'center',
            alignItems: 'center'
        },
        label: {
            color: this.colors.values[this.props.tile.value - 1 || 0] || 'gray',
            fontWeight: 'bold',
            fontSize: (this.props.size / 3) * 2
        },
        labelMarked: {
            color: 'red',
            fontWeight: 'bold',
            fontSize: (this.props.size / 3) * 2
        }
    });
}