// In App.js in a new project
import * as React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Dimensions, Image } from 'react-native';
import Block from './Partial/Block';
import Colors from '../Colors';
const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;

function Field(props) {
    const [giliran, setGiliran] = React.useState('o');
    const [x, setX] = React.useState([])
    const [o, setO] = React.useState([])
    const size = props.route.params.size;
    const [xWin, setXWin] = React.useState(0)
    const [oWin, setOWin] = React.useState(0)
    const [winBlock, setWinBlock] = React.useState([])
    
    const calculateWinner = (selectedIndices, size, winCondition) => {
        const lines = [];
        const board = Array(size).fill().map(() => Array(size).fill(null));
      
        selectedIndices.forEach((index) => {
          const row = Math.floor((index - 1) / size);
          const col = (index - 1) % size;
          board[row][col] = index;
        });
      
        for (let i = 0; i < size; i++) {
          for (let j = 0; j < size - winCondition + 1; j++) {
            // Horizontal lines
            lines.push(Array.from({ length: winCondition }, (_, k) => board[i][j + k]));
            // Vertical lines
            lines.push(Array.from({ length: winCondition }, (_, k) => board[j + k][i]));
          }
        }
      
        // Diagonal lines
        for (let i = 0; i < size - winCondition + 1; i++) {
          for (let j = 0; j < size - winCondition + 1; j++) {
            lines.push(Array.from({ length: winCondition }, (_, k) => board[i + k][j + k]));
            lines.push(Array.from({ length: winCondition }, (_, k) => board[i + k][j + winCondition - 1 - k]));
          }
        }
      
        for (let line of lines) {
          const [a, ...rest] = line;
          if (a !== null && rest.every(index => index !== null && selectedIndices.includes(index))) {
            return {
                result: true,
                data: line.filter(index => index !== null)
            };
          }
        }
        return {
            result: false,
            data: []
        };
    };

    React.useEffect(() => {
        if (size === 3) {
            if (x.length >= size) {
                const res = calculateWinner(x, 3, size);
                if (res.result) {
                    setXWin(xWin + 1)
                    setWinBlock(res.data)
                }
            }
    
            if (o.length >= size) {
                const res = calculateWinner(o, 3, size);
                if (res.result) { 
                    setOWin(oWin + 1)
                    setWinBlock(res.data)
                }
            }
        }
        else if (size === 4) {
            if (x.length >= size) {
                const res = calculateWinner(x, 6, size);
                if (res.result) {
                    setXWin(xWin + 1)
                    setWinBlock(res.data)
                }
            }
    
            if (o.length >= size) {
                const res = calculateWinner(o, 6, size);
                if (res.result) {
                    setXWin(oWin + 1)
                    setWinBlock(res.data)
                }
            }
        }
        else if (size === 5) {
            if (x.length >= size) {
                const res = calculateWinner(x, 10, size);
                if (res.result) {
                    setXWin(xWin + 1)
                    setWinBlock(res.data)
                }
            }
    
            if (o.length >= size) {
                const res = calculateWinner(o, 10, size);
                if (res.result) {
                    setXWin(oWin + 1)
                    setWinBlock(res.data)
                }
            }
        }

    }, [x, o, giliran])

    const handlePress = (val) => {

        if (giliran == 'x') {
            setX([...x, val])
        }
        if (giliran == 'o') {
            setO([...o, val])
        }

        

        setGiliran(giliran == 'x' ? 'o' : 'x')
    }

    const Counter = ({player, mirror}) => {
        return (
            <View style={mirror ? styles.counterMirror : styles.counter}>
                <View style={styles.score}>
                    {
                        player == 'x' ?
                        <Image source={require('../Assets/x.png')} style={{width: 30, height: 30}} />
                        :
                        <Image source={require('../Assets/o.png')} style={{width: 30, height: 30}} />
                    }
                    <View style={{width: 2, height: 40, backgroundColor: Colors.color1}} />
                    <Text style={styles.textScore}>{player == 'x' ? xWin : oWin}</Text>
                </View>
            </View>
        )
    }

    const Reset = () => {
        setX([])
        setO([])
        setWinBlock([])
        setGiliran('o')
    }

    const Refresh = () => {
        setX([])
        setO([])
        setXWin(0)
        setOWin(0)
        setGiliran('o')
        setWinBlock([])
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.action}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <View style={styles.backButton}>
                        <Image source={require('../Assets/back.png')} style={{width: 35, height: 35}} />
                    </View>
                </TouchableOpacity>
            </View>
            <Counter player={'x'} mirror={true} />
            <Block 
                size={size} 
                giliran={giliran} 
                x={x} 
                o={o}
                winBlock={winBlock}
                onPress={handlePress} />
            <Counter player={'o'} />
            <View style={styles.action}>
                <TouchableOpacity onPress={Refresh}>
                    <View style={styles.refreshButton}>
                        <Image source={require('../Assets/refresh.png')} style={{width: 35, height: 35}} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={Reset}>
                    <View style={styles.resetButton}>
                        <Image source={require('../Assets/reset.png')} style={{width: 35, height: 35}} />
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: Colors.color5,
        paddingVertical: 10
    },
    counter: {
        height: 70,
        width: PAGE_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
    },
    counterMirror: {
        height: 70,
        width: PAGE_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ rotate: '180deg'}]
    },
    action: {
        height: 50,
        width: PAGE_WIDTH,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    textScore: {
        fontSize: 35,
        color: '#fff',
        fontFamily: 'Arial'
    },
    score: {
        flexDirection: 'row',
        width: 110,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 5,
    },
    backButton: {
        paddingHorizontal: 25,
        paddingVertical: 5,
        backgroundColor: Colors.color4,
        width: PAGE_WIDTH / 2,
        borderRadius: 20,
        alignItems: 'center'
    },
    refreshButton: {
        paddingHorizontal: 25,
        paddingVertical: 5,
        backgroundColor: Colors.color2,
        width: PAGE_WIDTH / 4,
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        marginHorizontal: 2
    },
    resetButton: {
        paddingHorizontal: 25,
        paddingVertical: 5,
        backgroundColor: Colors.color3,
        width: PAGE_WIDTH / 4,
        alignItems: 'center',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        marginHorizontal: 2
    }
});

export default Field;