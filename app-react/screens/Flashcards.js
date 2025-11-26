import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from "react-native";

export default function TelaFlashcards({ route, navigation }) {
  const { deck } = route.params;
  const [flashcards, setFlashcards] = useState([]);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  const [studyMode, setStudyMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  // Criar flashcard
  const handleCreateFlashcard = () => {
    if (!front.trim() || !back.trim()) {
      Alert.alert("Atenção", "Frente e verso não podem ser vazios.");
      return;
    }

    const newCard = {
      id: Date.now().toString(),
      front: front.trim(),
      back: back.trim(),
    };

    setFlashcards(prev => [...prev, newCard]);
    setFront("");
    setBack("");
  };

  // Checar resposta
  const checkAnswer = () => {
    const correct = userAnswer.trim().toLowerCase() === flashcards[currentIndex].back.trim().toLowerCase();
    setIsCorrect(correct);
    setShowResult(true);
  };

  // Próximo card
  const handleNextCard = () => {
    setShowResult(false);
    setUserAnswer("");

    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      Alert.alert("Fim!", "Você terminou o deck!");
      setStudyMode(false);
      setCurrentIndex(0);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deck: {deck.name}</Text>

      {!studyMode ? (
        <>
          {/* Lista */}
          <FlatList
            data={flashcards}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.front}>{item.front}</Text>
                <Text style={styles.back}>{item.back}</Text>
              </View>
            )}
          />

          {/* Inputs */}
          <TextInput
            style={styles.input}
            placeholder="Frente (ex: pergunta)"
            value={front}
            onChangeText={setFront}
          />

          <TextInput
            style={styles.input}
            placeholder="Verso (ex: resposta correta)"
            value={back}
            onChangeText={setBack}
          />

          <TouchableOpacity style={styles.button} onPress={handleCreateFlashcard}>
            <Text style={styles.buttonText}>Criar Flashcard</Text>
          </TouchableOpacity>

          {flashcards.length > 0 && (
            <TouchableOpacity
              style={[styles.button, styles.studyButton]}
              onPress={() => setStudyMode(true)}
            >
              <Text style={styles.buttonText}>Estudar Deck</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.button, styles.backButton]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          {/* Modo Estudo */}
          <View style={styles.card}>
            <Text style={styles.front}>
              {flashcards[currentIndex].front}
            </Text>
          </View>

          {/* Usuário digita a resposta */}
          {!showResult && (
            <TextInput
              style={styles.input}
              placeholder="Digite sua resposta..."
              value={userAnswer}
              onChangeText={setUserAnswer}
            />
          )}

          {/* Mostrar resultado */}
          {showResult && (
            <View style={styles.card}>
              <Text style={{ fontSize: 18, fontWeight: "bold", color: isCorrect ? "green" : "red" }}>
                {isCorrect ? "✔ Resposta Correta!" : "✘ Resposta Errada"}
              </Text>

              <Text style={{ marginTop: 10 }}>
                Correto: {flashcards[currentIndex].back}
              </Text>
            </View>
          )}

          {/* Botões de ação */}
          {!showResult ? (
            <TouchableOpacity style={styles.button} onPress={checkAnswer}>
              <Text style={styles.buttonText}>Verificar Resposta</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleNextCard}>
              <Text style={styles.buttonText}>Próximo</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.button, styles.backButton]}
            onPress={() => setStudyMode(false)}
          >
            <Text style={styles.buttonText}>Sair do Estudo</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#FFF" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: {
    height: 50,
    borderColor: "#DDD",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#0077FF",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
  backButton: { backgroundColor: "#FF3333" },
  studyButton: { backgroundColor: "#00AA55" },
  card: {
    padding: 20,
    borderWidth: 1,
    borderColor: "#EEE",
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  front: { fontSize: 18, fontWeight: "bold" },
  back: { fontSize: 16, color: "#555" },
});
