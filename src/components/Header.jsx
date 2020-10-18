import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={this.styles.header}>
                <Text>hello world!</Text>
            </View>
        );
    }

    styles = StyleSheet.create({
        header: {
            flex: 1,
        }
    });
}