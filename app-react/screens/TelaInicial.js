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

            <View style={{ flex: 1 }}>
            {/* Lista de decks */}
            <FlatList style={{ flex: 1 }}
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
            </View>
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
                onPress={() => navigation.navigate("telaLogin")}
            >
                <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#80bed1ff",
    },

    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#FFFFFF",
        textAlign: "center",
        letterSpacing: 1,
    },

    input: {
        height: 55,
        borderWidth: 1,
        borderColor: "#333",
        borderRadius: 12,
        paddingHorizontal: 15,
        backgroundColor: "#eeededff",
        marginTop: 15,
        marginBottom: 10,
        color: "black",
        fontSize: 18,
    },

    button: {
        backgroundColor: "#006CFF",
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 12,
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },

    buttonText: {
        color: "#FFF",
        fontSize: 17,
        fontWeight: "bold",
    },

    logoutButton: {
        backgroundColor: "#D12E2E",
    },

    deckItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#eee4e4ff",
        paddingVertical: 15,
        paddingHorizontal: 12,
        borderRadius: 12,
        marginBottom: 10,

        // sombra
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 2 },
    },

    deckText: {
        fontSize: 18,
        color: "#000000ff",
        fontWeight: "600",
    },

    actionText: {
        color: "#004aebff",
        marginLeft: 12,
        fontSize: 15,
        fontWeight: "600",
    },
});

