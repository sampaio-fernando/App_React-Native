import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList } from "react-native";

export default function TelaInicial({ navigation }) {
    const [modules, setModules] = useState([]);
    const [newModuleName, setNewModuleName] = useState("");
    const [editingModule, setEditingModule] = useState(null);

    // Criar deck
    const handleCreateModule = () => {
        if (!newModuleName.trim()) {
            Alert.alert("Atenção", "O nome do deck não pode ser vazio.");
            return;
        }
        const newModule = {
            id: Date.now().toString(), // gera um id único
            name: newModuleName.trim(),
        };
        setModules((prev) => [...prev, newModule]);
        setNewModuleName("");
    };

    // Atualizar deck
    const handleUpdateModule = () => {
        if (!editingModule || !newModuleName.trim()) {
            Alert.alert("Atenção", "O nome do deck não pode ser vazio.");
            return;
        }
        setModules((prev) =>
            prev.map((m) => (m.id === editingModule.id ? { ...m, name: newModuleName.trim() } : m))
        );
        setEditingModule(null);
        setNewModuleName("");
    };

    // Excluir deck
    const handleDeleteModule = (id) => {
        setModules((prev) => prev.filter((m) => m.id !== id));
    };

    // Editar deck
    const handleEditModule = (module) => {
        setEditingModule(module);
        setNewModuleName(module.name);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Seus Decks</Text>

            {/* Lista de decks */}
            <FlatList
                data={modules}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.deckItem}>
                        {/* Nome do deck agora é clicável para abrir */}
                        <TouchableOpacity onPress={() => navigation.navigate("Flashcards", { deck: item })}>
                            <Text style={styles.deckText}>{item.name}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleEditModule(item)}>
                            <Text style={styles.actionText}>Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDeleteModule(item.id)}>
                            <Text style={[styles.actionText, { color: "red" }]}>Excluir</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

            {/* Input */}
            <TextInput
                style={styles.input}
                placeholder="Nome do deck"
                value={newModuleName}
                onChangeText={setNewModuleName}
            />

            {/* Botão criar/editar */}
            <TouchableOpacity
                style={styles.button}
                onPress={editingModule ? handleUpdateModule : handleCreateModule}
            >
                <Text style={styles.buttonText}>
                    {editingModule ? "Salvar Alterações" : "Criar Deck"}
                </Text>
            </TouchableOpacity>

            {/* Sair */}
            <TouchableOpacity
                style={[styles.button, styles.logoutButton]}
                onPress={() => navigation.navigate("Login")}
            >
                <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#FFFFFF" },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#222",
        textAlign: "center",
    },
    input: {
        height: 50,
        borderColor: "#DDD",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        backgroundColor: "#FFF",
        marginTop: 15,
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#0077FF",
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 10,
    },
    buttonText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
    logoutButton: { backgroundColor: "#FF3333" },
    deckItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderColor: "#EEE",
    },
    deckText: { fontSize: 18, color: "#222" },
    actionText: { color: "#0077FF", marginLeft: 10 },
});
