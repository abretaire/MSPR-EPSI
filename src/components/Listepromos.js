import React, { useState } from "react";
import { Text, View, StyleSheet, FlatList,TouchableOpacity, ActivityIndicator, Image, StatusBar, SafeAreaView, Modal, Pressable } from 'react-native';
import { PureComponent } from 'react';

export default class Listepromos extends PureComponent {
  state = {
      data: [],
      loading: true,
      modalVisible: false
  }

  setModalVisible = (visible, libelle, montant, code) => {
    this.setState({ 
      modalVisible: visible, 
      libelle: libelle,
      montant: montant,
      code: code
    });
  }

  async componentDidMount() {
    try {
      const api = await fetch('http://mspr-epsi.tomco.tech/promos');
      const dataJson = await api.json();
      this.setState({data: dataJson, loading: false});

    } catch(err) {
      console.log("Erreur lors de la recherche des informations :", err);
    }
  }
  renderItem(data) {
      return <TouchableOpacity onPress={() => this.setModalVisible(!modalVisible)}>
                  <View style={styles.listItemContainer}>
                      <Text style={styles.itemHeader}>{data.item.LIBELLE}</Text>
                      <Text style={styles.itemLabelle}>Code : {data.item.DATA} d'un montant de {data.item.MONTANT}€</Text>
                  </View>
              </TouchableOpacity>
  }
  render() {
    const { data, loading } = this.state;
    const { modalVisible } = this.state;
    if(!loading) {
        return (
          <SafeAreaView style={styles.container}>
            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { Alert.alert("Modal has been closed."); setModalVisible(!modalVisible); }} >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Enseigne : {this.state.libelle}</Text>
                  <Text style={styles.modalText}>Valeur : {this.state.montant}€</Text>
                  <Text style={styles.modalText}>Code : {this.state.code}</Text>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => this.setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>Fermer</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
            <FlatList 
              data={data} 
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => this.setModalVisible(!modalVisible, item.LIBELLE, item.MONTANT, item.DATA)}>
                    <View style={styles.listItemContainer}>
                        <Text style={styles.itemHeader}>{item.LIBELLE}</Text>
                        <Text style={styles.itemLabelle}>Code : {item.DATA} d'un montant de {item.MONTANT}€</Text>
                    </View>
                </TouchableOpacity>
              )}     
              keyExtractor={(item) => item.ID.toString()}>
            </FlatList>
          </SafeAreaView>
        );
    } else {
        return <ActivityIndicator />
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  // Modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 0,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    width: 300,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  listItemContainer: {
      borderWidth: 1,
      borderColor: "#ff0000",
      borderRadius: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 20,
      margin: 10,
  },
  itemHeader: {  
      color: 'black',
      fontSize: 24,
  },
  itemLabelle:{
    fontSize: 14,
  }
})
