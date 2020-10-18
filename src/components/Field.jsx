import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Tile from './Tile';
// REFAZ TA UMA MERDA, FAZ COM UMA LISTA SIMPLES COM OS ITENS DENTRO
export default class Field extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            tiles: [],
        }

        this.isLoading = true;
        this.finished = false;

        this.createTiles = this.createTiles.bind(this);
        this.onClickTile = this.onClickTile.bind(this);
        this.onLongClickTile = this.onLongClickTile.bind(this);
        
    }
    componentDidMount() {
        this.createTiles();
    }

    onLongClickTile(index) {
        const tiles = this.state.tiles;
        tiles[index].marked = !tiles[index].marked;
        
        this.setState({tiles});
    }
    onClickTile(index) {
        const tiles = this.state.tiles;
        const current = {
            index: index,
            content: tiles[index],
        };

        var path = [current];

        if(current.content.showing) {
            var sides = [];
            var markCount = 0;
            if(current.content.value > 0) {
                if(current.content.x > 0) {
                    const tile = {
                        index: current.index - 1,
                        content: tiles[current.index - 1],
                    }
                    markCount += tile.content.marked ? 1 : 0;
                    sides.push(tile);
                    if(current.content.y > 0) {
                        const tile = {
                            index: current.index - this.blockSizeWidth - 1,
                            content: tiles[current.index - this.blockSizeWidth - 1],
                        }
                        markCount += tile.content.marked ? 1 : 0;
                        sides.push(tile);
                    }
                    if(current.content.y < this.blockSizeHeight - 1) {
                        const tile = {
                            index: current.index + this.blockSizeWidth - 1,
                            content: tiles[current.index + this.blockSizeWidth - 1],
                        }
                        markCount += tile.content.marked ? 1 : 0;
                        sides.push(tile);
                    }
                }
                if(current.content.x < this.blockSizeWidth - 1) {
                    const tile = {
                        index: current.index + 1,
                        content: tiles[current.index + 1],
                    }
                    markCount += tile.content.marked ? 1 : 0;
                    sides.push(tile);

                    if(current.content.y > 0) {
                        const tile = {
                            index: current.index - this.blockSizeWidth + 1,
                            content: tiles[current.index - this.blockSizeWidth + 1],
                        }
                        markCount += tile.content.marked ? 1 : 0;
                        sides.push(tile);
                    }
                    if(current.content.y < this.blockSizeHeight - 1) {
                        const tile = {
                            index: current.index + this.blockSizeWidth + 1,
                            content: tiles[current.index + this.blockSizeWidth + 1],
                        }
                        markCount += tile.content.marked ? 1 : 0;
                        sides.push(tile);
                    }
                }
                if(current.content.y > 0) {
                    const tile = {
                        index: current.index - this.blockSizeWidth,
                        content: tiles[current.index - this.blockSizeWidth],
                    }
                    markCount += tile.content.marked ? 1 : 0;
                    sides.push(tile);
                }
                if(current.content.y < this.blockSizeHeight - 1) {
                    const tile = {
                        index: current.index + this.blockSizeWidth,
                        content: tiles[current.index + this.blockSizeWidth],
                    }
                    markCount += tile.content.marked ? 1 : 0;
                    sides.push(tile);
                }
            }

            if(markCount === current.content.value) {
                for(var i = 0; i < sides.length; i++) {
                    if(!sides[i].content.marked) {
                        sides[i].content.showing = true;
                        tiles[sides[i].index] = sides[i].content;
                        path.push(sides[i]);
                    }
                }
            }
        }
        for(var i = 0; i < path.length; i++) {
            const showTile = path[i];
            if(showTile.content.value == 0) {
                if(showTile.content.x > 0) {
                    if(!tiles[showTile.index - 1].showing) {
                        tiles[showTile.index - 1].showing = true;
                        const tile = {
                            index: showTile.index - 1,
                            content: tiles[showTile.index - 1],
                        }
                        path.push(tile);
                    }
                    
                }
                if(showTile.content.x < this.blockSizeWidth - 1) {
                    if(!tiles[showTile.index + 1].showing) {
                        tiles[showTile.index + 1].showing = true;
                        const tile = {
                            index: showTile.index + 1,
                            content: tiles[showTile.index + 1],
                        }
                        path.push(tile);
                    }
                }
                if(showTile.content.y > 0) {
                    if(!tiles[showTile.index - this.blockSizeWidth].showing) {
                        tiles[showTile.index - this.blockSizeWidth].showing = true;
                        const tile = {
                            index: showTile.index - this.blockSizeWidth,
                            content: tiles[showTile.index - this.blockSizeWidth],
                        }
                        path.push(tile);
                    }
                }
                if(showTile.content.y < this.blockSizeHeight - 1) {
                    if(!tiles[showTile.index + this.blockSizeWidth].showing) {
                        tiles[showTile.index + this.blockSizeWidth].showing = true;
                        const tile = {
                            index: showTile.index + this.blockSizeWidth,
                            content: tiles[showTile.index + this.blockSizeWidth],
                        }
                        path.push(tile);
                    }
                }
            }
        }
        
        tiles[index].showing = true;

        this.setState({tiles});
    }

    createTiles() {
        const window = Dimensions.get('window');
        const width = window.width;
        const height = (window.height / 4) * 3;
        this.tileSize = Math.floor(width / this.props.blockSize);

        this.blockSizeWidth = this.props.blockSize;
        this.blockSizeHeight = Math.floor(height / this.tileSize);

        var tiles = [];
        for(var y = 0; y < this.blockSizeHeight; y++) {
            for(var x = 0; x < this.blockSizeWidth; x++) {
                var index = (y * this.blockSizeWidth) + x;
                tiles[index] = {
                    x: x,
                    y: y,
                    value: 0,
                    showing: false,
                    marked: false,
                };
            }
        }
        const bombsAmount = this.blockSizeWidth * this.blockSizeHeight * this.props.bombsAmount;
        for(var i = 0; i < bombsAmount; i++) {
            var bombIndex = Math.floor(Math.random() * tiles.length);
            while (tiles[bombIndex].value !== 0) {
                bombIndex = Math.floor(Math.random() * tiles.length);
            }
            tiles[bombIndex].value = -1;
        }
        for(var i = 0; i < tiles.length; i++) {
            if(tiles[i].value < 0) {
                var bomb = tiles[i];
                if(bomb.x > 0) {
                    if(tiles[i - 1].value >= 0) {
                        tiles[i - 1].value++;
                    }
                    if(bomb.y > 0) {
                        if(tiles[i - this.blockSizeWidth - 1].value >= 0) {
                            tiles[i - this.blockSizeWidth - 1].value++;
                        }
                    }
                    if(bomb.y < this.blockSizeHeight - 1) {
                        if(tiles[i + this.blockSizeWidth - 1].value >= 0) {
                            tiles[i + this.blockSizeWidth - 1].value++;
                        }
                    }
                }
                if(bomb.x < this.blockSizeWidth - 1) {
                    if(tiles[i + 1].value >= 0) {
                        tiles[i + 1].value++;
                    }
                    if(bomb.y > 0) {
                        if(tiles[i - this.blockSizeWidth + 1].value >= 0) {
                            tiles[i - this.blockSizeWidth + 1].value++;
                        }
                    }
                    if(bomb.y < this.blockSizeHeight - 1) {
                        if(tiles[i + this.blockSizeWidth + 1].value >= 0) {
                            tiles[i + this.blockSizeWidth + 1].value++;
                        }
                    }
                }
                if(bomb.y > 0) {
                    if(tiles[i - this.blockSizeWidth].value >= 0) {
                        tiles[i - this.blockSizeWidth].value++;
                    }
                }
                if(bomb.y < this.blockSizeHeight - 1) {
                    if(tiles[i + this.blockSizeWidth].value >= 0) {
                        tiles[i + this.blockSizeWidth].value++;
                    }
                }
            }
        }

        this.isLoading = false;

        this.setState({tiles});
    }

    render() {
        return (
            <View style={this.styles.content}>
                {this.isLoading
                ?this.renderLoading()
                :this.renderField()}
            </View>
        );
    }
    renderLoading() {
        return (
            <View style={this.styles.loading}>
                <Text style={this.styles.loadingLabel}>Creating the Field...</Text>
            </View>
        );
    }
    renderField() {
        return (
            <View style={this.styles.field}>
                {this.state.tiles.map((tile, index) => {
                    return (
                        <Tile key={index} tile={tile} index={index} size={this.tileSize} onClick={this.onClickTile} onLongClick={this.onLongClickTile}></Tile>
                    );
                })}
            </View>
        );
    }

    styles = StyleSheet.create({
        content: {
            flex: 3,
            justifyContent: 'flex-end',
        },
        field: {
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'center'
        },
        loading: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#0077c2'
        },
        loadingLabel: {
            fontSize: 32,
            fontWeight: 'bold',
            color: 'white'
        }
    });
}