// In App.js in a new project
import * as React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Dimensions, Image } from 'react-native';
import Colors from '../../Colors';

const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;

function Block(props) {
    const [status, setStatus] = React.useState(0);
    
    const RenderBlock = () => {
        const comp = [];
        
        if (props.size === 3) {
            for (let i = 0; i < 3; i++) {
                const row = [];
                
                for (let j = 0; j < 3; j++) {
                    const val = i * 3 + j + 1;

                    row.push(
                        <TouchableOpacity key={i + j} 
                            onPress={() => props.winBlock.length === 0 && props.onPress(val)} 
                            style={[styles.block, (props.winBlock.length > 0 && props.winBlock.indexOf(val) < 0 ? styles.blockDis : styles.blockWin)]} > 

                            {
                                props.x.indexOf(val) > -1 ? 
                                <Image style={{width: '90%', height: '90%'}} source={require('../../Assets/x.png')} />
                                : (
                                    props.o.indexOf(val) > -1 ? 
                                    <Image style={{width: '90%', height: '90%'}} source={require('../../Assets/o.png')} /> 
                                    : 
                                    null
                                )
                            }

                        </TouchableOpacity>
                    );
                    
                }

                comp.push(<View style={styles.row}>{row}</View>);
            }
        }
        if (props.size === 4) {
            for (let i = 0; i < 6; i++) {
                const row = [];
                
                for (let j = 0; j < 6; j++) {
                    const val = i * 6 + j + 1;

                    row.push(
                        <TouchableOpacity key={i + j} 
                            onPress={() => props.winBlock.length === 0 && props.onPress(val)} 
                            style={[styles.block4, (props.winBlock.length > 0 && props.winBlock.indexOf(val) < 0 ? styles.blockDis : styles.blockWin)]} >  
                            {
                                props.x.indexOf(val) > -1 ? 
                                <Image style={{width: '90%', height: '90%'}} source={require('../../Assets/x.png')} />
                                : (
                                    props.o.indexOf(val) > -1 ? 
                                    <Image style={{width: '90%', height: '90%'}} source={require('../../Assets/o.png')} /> 
                                    : 
                                    null
                                )
                            }
                            

                        </TouchableOpacity>
                    );
                    
                }

                comp.push(<View style={styles.row}>{row}</View>);
            }
        }
        if (props.size === 5) {
            for (let i = 0; i < 10; i++) {
                const row = [];
                
                for (let j = 0; j < 10; j++) {
                    const val = i * 10 + j + 1;

                    row.push(
                        <TouchableOpacity key={i + j} 
                            onPress={() => props.winBlock.length === 0 && props.onPress(val)} 
                            style={[styles.block5, (props.winBlock.length > 0 && props.winBlock.indexOf(val) < 0 ? styles.blockDis : styles.blockWin)]} >  
                            {
                                props.x.indexOf(val) > -1 ? 
                                <Image style={{width: '90%', height: '90%'}} source={require('../../Assets/x.png')} />
                                : (
                                    props.o.indexOf(val) > -1 ? 
                                    <Image style={{width: '90%', height: '90%'}} source={require('../../Assets/o.png')} /> 
                                    : 
                                    null
                                )
                            }
                            

                        </TouchableOpacity>
                    );
                    
                }

                comp.push(<View style={styles.row}>{row}</View>);
            }
        }

        return comp;
    }


    return (
        <View style={styles.container}>
            <RenderBlock />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        width: PAGE_WIDTH,
        height: PAGE_WIDTH,
        backgroundColor: Colors.color5,
        flexDirection: 'column',
        
    },
    block: {
        width: PAGE_WIDTH / 3,
        height: PAGE_WIDTH / 3,
        backgroundColor: '#fff',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    block4: {
        width: PAGE_WIDTH / 6,
        height: PAGE_WIDTH / 6,
        backgroundColor: '#fff',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    block5: {
        width: PAGE_WIDTH / 10,
        height: PAGE_WIDTH / 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    blockDis: {
        backgroundColor: Colors.color1
    },
    blockWin: {
        backgroundColor: '#fff'
    },
    row: {
        flexDirection: 'row'
    }
});

export default Block;