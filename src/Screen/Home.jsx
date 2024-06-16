// In App.js in a new project
import * as React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Image } from 'react-native';
import Colors from '../Colors';

function Home({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.Logo}>
            <Image style={styles.imageLogo} source={require('../Assets/logo.png')} />
        </View>
        <View style={styles.menuList}>
            <TouchableOpacity onPress={() => navigation.navigate('Field', {size: 3})} >
                <View style={[styles.menu, { borderTopLeftRadius: 70 }]}>
                    <Image style={styles.imageMenu} source={require('../Assets/3.png')} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Field', {size: 4})} >
                <View style={styles.menu}>
                    <Image style={styles.imageMenu} source={require('../Assets/4.png')} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Field', {size: 5})} >
                <View style={[styles.menu, { borderBottomRightRadius: 70 }]}>
                    <Image style={styles.imageMenu} source={require('../Assets/5.png')} />
                </View>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: Colors.color5,
        paddingVertical: 10
    },
    menuList: {
        alignItems: 'center',
    },
    menu: {
        width: 250,
        height: 100,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5
    },
    imageMenu: {
        width: 120,
        resizeMode: 'contain'
    },
    Logo: {
        height: 130,
        width: 130,
        backgroundColor: Colors.color5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        marginBottom: 20
    },
    imageLogo: {
        width: 120,
        resizeMode: 'contain'
    }
});

export default Home;