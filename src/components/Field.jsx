import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Tile from './Tile';
// REFAZ TA UMA MERDA, FAZ COM UMA LISTA SIMPLES COM OS ITENS DENTRO
export default class Field extends Component {
    constructor(props) {
        super(props);
        
        this.default = {
            tiles: [],
            loadingMessage: 'Waiting for Settings',
            isLoading: true,
            finished: false,
            markedCount: 0,
        }

        this.state = this.default;

        this.createTiles = this.createTiles.bind(this);
        this.onClickTile = this.onClickTile.bind(this);
        this.onLongClickTile = this.onLongClickTile.bind(this);
        this.finishGame = this.finishGame.bind(this);
        
    }
    componentDidMount() {
    }

    onLongClickTile(index) {
        const tiles = this.state.tiles;
        tiles[index].marked = !tiles[index].marked;

        var markedCount = this.state.markedCount;

        if(tiles[index].marked) {
            markedCount++;
        } else {
            markedCount--;
        }

        this.props.markedChanged(markedCount);
        this.setState({tiles, markedCount});
    }
    onClickTile(index) {

        if(this.state.finished) {
            return;
        }

        var tiles = this.state.tiles;
        var current = {
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

        tiles = this.checkField(tiles);

        this.setState({tiles});
    }

    checkField(field) {
        var tiles = field;
        var finished = this.state.finished;
        var hideCount = 0;
        for(var i = 0; i < tiles.length; i++) {
            if(!tiles[i].showing && !tiles[i].marked) {
                hideCount++;
            }
        }
        if(hideCount > 0) {
            for(var i = 0; i < tiles.length; i++) {
                if(tiles[i].value < 0 && tiles[i].showing) {
                    this.setState({finished: true});
                    finished = true;
                }
            }
            if(finished) {
                for(var i = 0; i < tiles.length; i++) {
                    if(tiles[i].value < 0) {
                        tiles[i].showing = true;
                    }
                }
                this.props.finish();
            }
        } else {
            var tiles = this.state.tiles;
            var markedCount = 0;
            for(var i = 0; i < tiles.length; i++) {
                if(tiles[i].marked && tiles[i].value < 0) {
                    markedCount++;
                }
            }

            if(markedCount === this.bombsAmount) {
                for(var i = 0; i < tiles.length; i++) {
                    if(!tiles[i].marked) {
                        tiles[i].showing = true;
                    }
                }
            } else {
                for(var i = 0; i < tiles.length; i++) {
                    if(tiles[i].value < 0 || tiles[i].marked) {
                        tiles[i].showing = true;
                    }
                }
            }

            this.setState({finished: true});
            this.props.finish();
        }
        

        return tiles;
    }

    verifyGame() {
        var tiles = this.state.tiles;
        var markedCount = 0;
        for(var i = 0; i < tiles.length; i++) {
            if(tiles[i].marked && tiles[i].value < 0) {
                markedCount++;
            }
        }
    }

    finishGame() {
        var tiles = this.state.tiles;
        var markedCount = 0;
        for(var i = 0; i < tiles.length; i++) {
            if(tiles[i].marked && tiles[i].value < 0) {
                markedCount++;
            }
        }

        if(markedCount === this.bombsAmount) {
            for(var i = 0; i < tiles.length; i++) {
                if(!tiles[i].marked) {
                    tiles[i].showing = true;
                }
            }
        } else {
            for(var i = 0; i < tiles.length; i++) {
                if(tiles[i].value < 0 || tiles[i].marked) {
                    tiles[i].showing = true;
                }
            }
        }

        this.setState({tiles, finished: true});
        this.props.finish();
    }

    createTiles(size, level) {
        this.setState({loadingMessage: 'Creating the Field...', ...this.default});

        const window = Dimensions.get('window');
        const width = window.width;
        const height = (window.height / 4) * 3;
        var blockSize = (size + 1) * 5;

        this.tileSize = Math.floor(width / blockSize);

        this.blockSizeWidth = blockSize;
        this.blockSizeHeight = blockSize;

        var tiles = new Array();
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
        this.bombsAmount = Math.floor(this.blockSizeWidth * this.blockSizeHeight * (level / 10));
        for(var i = 0; i < this.bombsAmount; i++) {
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
        this.setState({tiles: []}, function() {
            this.setState({tiles, isLoading: false})
        });
    }

    render() {
        return (
            <View style={this.styles.content}>
                {this.state.isLoading
                ?this.renderLoading()
                :this.renderField()}
            </View>
        );
    }
    renderLoading() {
        return (
            <View style={this.styles.loading}>
                <Text style={this.styles.loadingLabel}>{this.state.loadingMessage}</Text>
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
            flex: 2,
            justifyContent: 'flex-end',
            backgroundColor: 'black',
        },
        field: {
            flexWrap: 'wrap',
            flexDirection: 'row',
            backgroundColor: '#9e9e9e',
        },
        loading: {
            height: Dimensions.get('window').width,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#9e9e9e',
        },
        loadingLabel: {
            fontSize: 32,
            fontWeight: 'bold'
        },
        menuButton: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        menuButtonLabel: {
            fontSize: 32,
            color: 'white',
            textAlign: 'center',
        }
    });
}