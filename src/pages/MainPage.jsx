import React, { Component, Fragment } from 'react';
import { StyleSheet, View } from 'react-native';
import Field from '../components/Field';
import Header from '../components/Header';

export default class MainPage extends Component {
    render() {
        return (
            <View style={this.styles.container}>
                <Header ref={ref => this.header = ref} field={this.field}/>

                <Field ref={ref => this.field = ref} header={this.header}
                blockSize={20} 
                bombsAmount={0.1}/>
            </View>
        );
    }

    styles = StyleSheet.create({
        container: {
            flex: 1,
        }
    });
}