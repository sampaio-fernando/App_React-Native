import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";

export default function moduleList({ modules, onEdit, onDelete, onOpen }) {
    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <TouchableOpacity style={styles.itemButton} onPress={() => onOpen(item)}>
                <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.editButton} onPress={() => onEdit(item)}>
                    <Text style={styles.actionText}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item.id)}>
                    <Text style={styles.actionText}>Excluir</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <FlatList
            data={modules}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
        />
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: "#FFF",
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#DDD",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    itemButton: { flex: 1 },
    itemText: { fontSize: 16, fontWeight: "bold", color: "#333" },
    actions: { flexDirection: "row" },
    editButton: { marginRight: 15 },
    deleteButton: {},
    actionText: { color: "#6200EE", fontWeight: "bold" },
});
